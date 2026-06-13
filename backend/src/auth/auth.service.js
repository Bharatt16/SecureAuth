import { sendVerificationEmail } from "../common/config/email";
import ApiError from "../common/utils/api-error";
import { generateResetToken, verifyAccessToken, verifyRefreshToken } from "../common/utils/jwt.utils";
import User from "./auth.model.js"
import {
  sendVerificationEmail,
  sendResetPasswordEmail,
} from "../common/config/email.js";

import { hashToken } from "../common/utils/token.utils.js";

const register = async ({ name, email, password, role }) => {
  const existing = await User.findOne({ email });

  if (existing) throw ApiError.conflict("Email already registered");

  const { rawToken, hashedToken } = generateResetToken();

  const user = await User.create({
    name,
    email,
    password,
    role,
    verificationToken: hashedToken,
  });

  try {
    await sendVerificationEmail(email, rawToken);
  } catch (error) {
    console.error("Failed to send verification email : ", error.message);
  }

  const userObj = user.toObject();
  delete userObj.password;
  delete userObj.verificationToken;

  return userObj;
};

const login = async ({ email, password }) => {
  const user = await User.findOne({ email }).select("+password");
  if (!user) throw ApiError.unauthorized("Invalid email or password");

  const isMatch = await user.comparePassword(password);
if (!isMatch) {
  throw ApiError.unauthorized("Invalid email or password");
}

  if (!user.isVerified) {
    throw ApiError.forbidden("Please verify your email before logging in");
  }
  const accessToken = generateAccessToken({ id: user._id, role: user.role });
  const refreshToken = generateRefreshToken({ id: user._id });

  user.refreshToken = hashToken(refreshToken);
  await user.save({ validateBeforeSave: false });

  //  validateBeforeSave is a Mongoose option that skips schema validation when saving a document
  //  WHY USED HERE
  //  Because we are only updating refreshToken And want to avoid unnecessary validation

  const userObj = user.toObject();
  delete userObj.password;
  delete userObj.refreshToken;

  return {
    user: userObj,
    accessToken,
    refreshToken,
  };
};

// Issues a new access token using a valid refresh token
const refresh = async(token)=>{
    if(!token) throw ApiError.unauthorized("Refresh token missing")
    
    const decoded = verifyRefreshToken(token)
    const user = await User.findById(decoded.id).select("+refreshToken")

    if(!user) throw ApiError.unauthorized("USer no longer exist")

      if (user.refreshToken !== hashToken(token)) {
        throw ApiError.unauthorized("Invalid refresh token — please log in again");
      }
    
      const accessToken = generateAccessToken({ id: user._id, role: user.role });
    
      return { accessToken };

}

const logout = async (userId) => {
  // Clear stored refresh token so it can't be reused
  await User.findByIdAndUpdate(userId, { refreshToken: null });
};

const verifyEmail = async (token) =>{
    const trimmed = String(token).trim();
    if(!trimmed){
        throw ApiError.badRequest("Invalid or expired verification token");

    }
    
  // DB stores SHA256(raw). Links / email use the raw token — we hash for lookup.
  // If you paste the hash from MongoDB into Postman, hashing again would not match;
  // so we also try a direct match on the stored value.
    
    const hashedInput = hashToken(trimmed);
    let user = await User.findOne({ verificationToken: hashedInput }).select(
      "+verificationToken",
    );
    if (!user) {
      user = await User.findOne({ verificationToken: trimmed }).select(
        "+verificationToken",
      );
    }
    if (!user) throw ApiError.badRequest("Invalid or expired verification token");
  
    await User.findByIdAndUpdate(user._id, {
      $set: { isVerified: true },// sets the value
      $unset: { verificationToken: 1 }, //"Remove this field from document"
    });
  
    return user;
}


const forgotPassword = async (email) => {
  const user = await User.findOne({ email });
  if (!user) throw ApiError.notFound("No account with that email");

  const { rawToken, hashedToken } = generateResetToken();

  user.resetPasswordToken = hashedToken;
  user.resetPasswordExpires = Date.now() + 15 * 60 * 1000;
  await user.save();

  try {
    await sendResetPasswordEmail(email, rawToken);
  } catch (err) {
    console.error("Failed to send reset email:", err.message);
  }
};

const resetPassword = async (token, newPassword) => {
  const hashedToken = hashToken(token);

  const user = await User.findOne({
    resetPasswordToken: hashedToken,
    resetPasswordExpires: { $gt: Date.now() },
  }).select("+resetPasswordToken +resetPasswordExpires");

  if (!user) throw ApiError.badRequest("Invalid or expired reset token");

  user.password = newPassword;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpires = undefined;
  await user.save();
};

const getMe = async (userId) => {
  const user = await User.findById(userId);
  if (!user) throw ApiError.notFound("User not found");
  return user;
};

export {
  register,
  login,
  refresh,
  logout,
  verifyEmail,
  forgotPassword,
  resetPassword,
  getMe,
};

