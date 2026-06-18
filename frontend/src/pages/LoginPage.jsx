import { useState } from "react";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
} from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import AuthLayout from "../layouts/AuthLayout";
import toast from "react-hot-toast";
import api from "../api/axios.js";

export default function LoginPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
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

      const response = await api.post(
        "/auth/login",
        {
          email,
          password,
        },
        {
          withCredentials: true,
        }
      );

      const accessToken =
        response.data.data.accessToken;

      localStorage.setItem(
        "accessToken",
        accessToken
      );

      localStorage.setItem(
  "role",
  response.data.data.user.role
);

      toast.success(
        "Login successful"
      );

      navigate("/profile");

    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.message ||
          "Login failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Login"
      subtitle="Welcome back."
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
            placeholder="Enter your password"
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

        {/* FORGOT PASSWORD */}

        <div className="text-right">
          <Link
            to="/forgot-password"
            className="
            text-sm
            text-[#C8102E]
            hover:underline
            "
          >
            Forgot Password?
          </Link>
        </div>

        {/* LOGIN BUTTON */}

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
            ? "Logging in..."
            : "Login"}
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

        {/* REGISTER LINK */}

        <p
          className="
          text-center
          text-sm
          text-gray-500
          "
        >
          Don't have an account?{" "}
          <Link
            to="/register"
            className="
            text-[#C8102E]
            font-semibold
            "
          >
            Register
          </Link>
        </p>

      </form>
    </AuthLayout>
  );
}