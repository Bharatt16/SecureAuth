// src/pages/ResetPasswordPage.jsx

import { useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import AuthLayout from "../layouts/AuthLayout";

export default function ResetPasswordPage() {
  const { token } = useParams();

  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const response = await axios.put(
        `http://localhost:4000/api/auth/reset-password/${token}`,
        {
          password,
        }
      );

      alert(response.data.message);

      navigate("/login");
    } catch (error) {
      alert(
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
      subtitle="Enter a new password."
    >
      <form onSubmit={handleSubmit} className="space-y-8">
        <input
          type="password"
          placeholder="New Password"
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
            ? "Resetting..."
            : "Reset Password"}
        </button>
      </form>
    </AuthLayout>
  );
}