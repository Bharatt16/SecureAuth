import { Link } from "react-router-dom";
import AuthLayout from "../layouts/AuthLayout";

export default function ForgotPasswordPage() {
  return (
    <AuthLayout
      title="Forgot Password"
      subtitle="We'll send a reset link."
    >
      <form className="space-y-8">

        <input
          type="email"
          placeholder="Email"
          className="w-full bg-transparent border-b border-gray-300 py-4 outline-none"
        />

        <button
          className="w-full bg-[#C8102E] text-white py-4 font-semibold"
        >
          Send Reset Link
        </button>

        <Link
          to="/login"
          className="block text-center text-[#C8102E]"
        >
          Back to Login
        </Link>

      </form>
    </AuthLayout>
  );
}