// src/pages/ForgotPasswordPage.jsx

import { useState } from "react";
import axios from "axios";
import AuthLayout from "../layouts/AuthLayout";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const response = await axios.post(
        "http://localhost:4000/api/auth/forgot-password",
        { email }
      );

      alert(response.data.message);
    } catch (error) {
      alert(
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
      <form onSubmit={handleSubmit} className="space-y-8">
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

        <button
          type="submit"
          disabled={loading}
          className="
            w-full
            bg-[#C8102E]
            text-white
            py-4
            font-semibold
          "
        >
          {loading
            ? "Sending..."
            : "Send Reset Link"}
        </button>
      </form>
    </AuthLayout>
  );
}