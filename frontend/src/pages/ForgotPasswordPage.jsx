import { useState } from "react";
import { Mail } from "lucide-react";
import AuthLayout from "../layouts/AuthLayout";
import toast from "react-hot-toast";
import api from "../api/axios.js";
import { Link } from "react-router-dom";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] =
    useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const response = await api.post(
        "/auth/forgot-password",
        { email }
      );

      toast.success(
        response.data.message
      );

    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Forgot Password"
      subtitle="Enter your email to receive a reset link."
    >
      <form
        onSubmit={handleSubmit}
        className="space-y-5"
      >

        {/* EMAIL */}

        <div className="relative">
          <Mail
            size={18}
            className="
            absolute
            right-4
            top-1/2
            -translate-y-1/2
            text-gray-400
            "
          />

          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            className="
            w-full
            bg-transparent
            border-b
            border-gray-300
            py-4
            pr-10
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
            ? "Sending..."
            : "Send Reset Link"}
        </button>

        {/* DIVIDER */}

        <div
          className="
          flex
          items-center
          gap-4
          text-gray-400
          text-sm
          "
        >
          <div className="flex-1 h-px bg-gray-200" />
          OR
          <div className="flex-1 h-px bg-gray-200" />
        </div>

        {/* LOGIN LINK */}

        <p
          className="
          text-center
          text-sm
          text-gray-500
          "
        >
          Remember your password?{" "}
          <Link
            to="/login"
            className="
            text-[#C8102E]
            font-semibold
            "
          >
            Login
          </Link>
        </p>

      </form>
    </AuthLayout>
  );
}