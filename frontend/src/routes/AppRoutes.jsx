import { Routes, Route, Navigate } from "react-router-dom";

import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import ForgotPasswordPage from "../pages/ForgotPasswordPage";
import ResetPasswordPage from "../pages/ResetPasswordPage";
import VerifyEmailPage from "../pages/VerifyEmailPage";
import ProfilePage from "../pages/ProfilePage";

export default function AppRoutes() {
  return (
    <Routes>

      <Route
        path="/"
        element={<Navigate to="/login" />}
      />

      <Route
        path="/login"
        element={<LoginPage />}
      />

      <Route
        path="/register"
        element={<RegisterPage />}
      />

      <Route
        path="/forgot-password"
        element={<ForgotPasswordPage />}
      />

      <Route
        path="/reset-password/:token"
        element={<ResetPasswordPage />}
      />

      <Route
        path="/verify-email/:token"
        element={<VerifyEmailPage />}
      />

      <Route
        path="/profile"
        element={<ProfilePage />}
      />

    </Routes>
  );
}