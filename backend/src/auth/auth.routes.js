import { Router } from "express";
import * as controller from "./auth.controller.js";
import { authenticate , authorize} from "./auth.middleware.js";
import validate from "../common/middleware/validate.middleware.js";
import RegisterDto from "./dto/register.dto.js";
import LoginDto from "./dto/login.dto.js";
import ForgotPasswordDto from "./dto/forgot-password.dto.js";
import ResetPasswordDto from "./dto/reset-password.dto.js";
// import { upload } from "../../common/middleware/multer.middleware.js"
// import { uploadAvatar } from "./auth.controller.js";

const router = Router();

router.post("/register", validate(RegisterDto), controller.register);
router.post("/login", validate(LoginDto), controller.login);
router.post("/refresh-token", controller.refreshToken);
router.post("/logout", authenticate, controller.logout);
router.get("/verify-email/:token", controller.verifyEmail);
router.post(
  "/forgot-password",
  validate(ForgotPasswordDto),
  controller.forgotPassword,
);
router.put(
  "/reset-password/:token",
  validate(ResetPasswordDto),
  controller.resetPassword,
);
router.get("/me", authenticate, controller.getMe);

// router.post("/avatar", authenticate , upload.single("avatar") , controller.uploadAvatar)


router.get(
  "/admin-test",
  authenticate,
  authorize("admin"),
  (req, res) => {
    res.json({
      success: true,
      message: "Admin access granted"
    });
  }
);

router.get("/test-brevo", async (req, res) => {
  try {
    const response = await axios.get(
      "https://api.brevo.com/v3/account",
      {
        headers: {
          "api-key": process.env.BREVO_API_KEY,
        },
      }
    );

    res.json(response.data);
  } catch (err) {
    console.log(err.response?.data);
    res.json(err.response?.data);
  }
});



export default router;
