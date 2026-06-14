import { useState } from "react";
// import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import AuthLayout from "../layouts/AuthLayout";
import toast from "react-hot-toast";
import api from "../api/axios.js";

export default function LoginPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

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

      console.log(response.data);

      const accessToken = response.data.data.accessToken;

      localStorage.setItem("accessToken", accessToken);

      toast.success("Login successful");

      navigate("/profile");
    } catch (error) {
      console.error(error);

  console.log("FULL ERROR:", error.response?.data);
  console.log("STATUS:", error.response?.status);


      toast.error(
  error.response?.data?.message || "Login failed"
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
        className="space-y-8"
      >
        <input
          type="email"
          placeholder="Email"
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
          outline-none
          "
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
          className="
          w-full
          bg-transparent
          border-b
          border-gray-300
          py-4
          outline-none
          "
        />

        <div className="text-right">
          <Link
            to="/forgot-password"
            className="text-sm text-[#C8102E]"
          >
            Forgot Password?
          </Link>
        </div>

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
          {loading ? "Logging in..." : "Login"}
        </button>

        <p className="text-center text-sm">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-[#C8102E] font-semibold"
          >
            Register
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
}