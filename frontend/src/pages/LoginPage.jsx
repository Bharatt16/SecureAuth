import { Link } from "react-router-dom";
import AuthLayout from "../layouts/AuthLayout";

export default function LoginPage() {
  return (
    <AuthLayout
      title="Login"
      subtitle="Welcome back."
    >
      <form className="space-y-8">

        <input
          type="email"
          placeholder="Email"
          className="w-full bg-transparent border-b border-gray-300 py-4 outline-none"
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full bg-transparent border-b border-gray-300 py-4 outline-none"
        />

        <div className="flex justify-end">
          <Link
            to="/forgot-password"
            className="text-sm text-[#C8102E]"
          >
            Forgot Password?
          </Link>
        </div>

        <button
          className="w-full bg-[#C8102E] text-white py-4 font-semibold"
        >
          Login
        </button>

        <p className="text-center text-gray-500">
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