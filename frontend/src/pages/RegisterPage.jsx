import { useState } from "react";
// import axios from "axios";
import AuthLayout from "../layouts/AuthLayout";
import toast from "react-hot-toast"; 
import api from "../api/axios.js";   

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

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

      console.log(response.data);
      toast.success("Registration successful!");
    } catch (error) {
      console.error(error);
      toast.error(
  error.response?.data?.message || "Registration failed"
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
        className="space-y-8"
      >
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
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
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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
          onChange={(e) => setPassword(e.target.value)}
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
          className="
          w-full
          bg-[#C8102E]
          text-white
          py-4
          font-semibold
          hover:opacity-90
          transition
          "
        >
          Register
        </button>
      </form>
    </AuthLayout>
  );
}