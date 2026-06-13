import ApiResponse from '../common/utils/api-response'
import * as authService from './auth.service.js'

const register = async (req , res) =>{
    const user = await authService.register(req.body)
    ApiResponse.created(res , "Registeration successful , Please verify email" , user)
}

const login = async (req,res) =>{
    const { user , accessToken , refreshToken } = await authService.login(req.body)

    res.cookie('RefreshToken' ,refreshToken , {
        httpOnly : true , 
        secure : process.env.NODE_ENV === "production",
        sameSite : "strict", 
        maxAge :  7 * 24 * 60 * 60 * 1000,
    })

    ApiResponse.ok(res , "User logged in successfully" , {user , accessToken})
}

const refreshToken = async (req, res) => {
  const token = req.cookies?.refreshToken;
  const { accessToken } = await authService.refresh(token);
  ApiResponse.ok(res, "Token refreshed", { accessToken });
};

const logout = async (req , res)=>{
    
    await authService.logout(req.user.id);
    res.clearCookie("refreshToken");
    ApiResponse.ok(res, "logged out successfully");
}

const verifyEmail = async (req, res) => {
  await authService.verifyEmail(req.params.token);
  ApiResponse.ok(res, "Email verified successfully");
};

const forgotPassword = async (req, res) => {
  await authService.forgotPassword(req.body.email);
  ApiResponse.ok(res, "Password reset email sent");
};

const resetPassword = async (req, res) => {
  await authService.resetPassword(req.params.token, req.body.password);
  ApiResponse.ok(res, "Password reset successful");
};

const getMe = async (req, res) => {
  const user = await authService.getMe(req.user.id);
  ApiResponse.ok(res, "User profile", user);
};



export {
  register,
  login,
  refreshToken,
  logout,
  verifyEmail,
  forgotPassword,
  resetPassword,
  getMe,
//   uploadAvatar
};
