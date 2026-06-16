import { useState } from "react";
import {
  Lock,
  Eye,
  EyeOff,
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import AuthLayout from "../layouts/AuthLayout";
import toast from "react-hot-toast";
import api from "../api/axios.js";

export default function ResetPasswordPage() {
  const { token } = useParams();

  const navigate = useNavigate();

  const [password, setPassword] =
    useState("");

  const [showPassword, setShowPassword] =
    useState(false);

  const [loading, setLoading] =
    useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const response = await api.put(
        `/auth/reset-password/${token}`,
        {
          password,
        }
      );

      toast.success(
        response.data.message
      );

      navigate("/login");

    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Password reset failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Reset Password"
      subtitle="Create a new password for your account."
    >
      <form
        onSubmit={handleSubmit}
        className="space-y-5"
      >

        {/* PASSWORD */}

        <div className="relative">

          <Lock
            size={18}
            className="
            absolute
            right-12
            top-1/2
            -translate-y-1/2
            text-gray-400
            "
          />

          <button
            type="button"
            onClick={() =>
              setShowPassword(
                !showPassword
              )
            }
            className="
            absolute
            right-4
            top-1/2
            -translate-y-1/2
            text-gray-400
            "
          >
            {showPassword ? (
              <EyeOff size={18} />
            ) : (
              <Eye size={18} />
            )}
          </button>

          <input
            type={
              showPassword
                ? "text"
                : "password"
            }
            placeholder="Enter new password"
            value={password}
            onChange={(e) =>
              setPassword(
                e.target.value
              )
            }
            className="
            w-full
            bg-transparent
            border-b
            border-gray-300
            py-4
            pr-20
            outline-none
            transition
            focus:border-[#C8102E]
            "
          />
        </div>

        {/* BUTTON */}

        <button
          type="submit"
          disabled={loading}
          className="
          w-full
          bg-[#C8102E]
          text-white
          py-4
          font-semibold
          hover:opacity-90
          transition
          disabled:opacity-50
          "
        >
          {loading
            ? "Resetting..."
            : "Reset Password"}
        </button>

      </form>
    </AuthLayout>
  );
}