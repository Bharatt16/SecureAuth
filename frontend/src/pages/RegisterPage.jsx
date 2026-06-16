import { useState } from "react";
import { User, Mail, Lock, Eye, EyeOff } from "lucide-react";
import AuthLayout from "../layouts/AuthLayout";
import toast from "react-hot-toast";
import api from "../api/axios.js";
import { useNavigate, Link } from "react-router-dom";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] =
    useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const toastId = toast.loading(
      "Creating account..."
    );

    try {
      const response = await api.post(
        "/auth/register",
        {
          name,
          email,
          password,
          role: "user",
        }
      );

      toast.success(
        response.data.message,
        {
          id: toastId,
        }
      );

      setTimeout(() => {
        navigate("/login");
      }, 1500);

    } catch (error) {
      console.log(error.response?.data);

      toast.error(
        error.response?.data?.message ||
          "Registration failed",
        {
          id: toastId,
        }
      );
    }
  };

  return (
    <AuthLayout
      title="Register"
      subtitle="Create a new account."
    >
      <form
        onSubmit={handleSubmit}
        className="space-y-5"
      >

        {/* NAME */}

        <div className="relative">
          <User
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
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
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

        <button
          type="submit"
          className="
          w-full
          bg-[#C8102E]
          text-white
          py-4
          font-semibold
          mt-6
          hover:opacity-90
          transition
          "
        >
          Register
        </button>

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

        <p
          className="
          text-center
          text-sm
          text-gray-500
          "
        >
          Already have an account?{" "}
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