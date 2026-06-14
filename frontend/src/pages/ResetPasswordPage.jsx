import AuthLayout from "../layouts/AuthLayout";

export default function ResetPasswordPage() {
  return (
    <AuthLayout
      title="Reset Password"
      subtitle="Choose a new password."
    >
      <form className="space-y-8">

        <input
          type="password"
          placeholder="New Password"
          className="w-full bg-transparent border-b border-gray-300 py-4 outline-none"
        />

        <input
          type="password"
          placeholder="Confirm Password"
          className="w-full bg-transparent border-b border-gray-300 py-4 outline-none"
        />

        <button
          className="w-full bg-[#C8102E] text-white py-4 font-semibold"
        >
          Reset Password
        </button>

      </form>
    </AuthLayout>
  );
}