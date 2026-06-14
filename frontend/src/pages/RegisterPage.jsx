import AuthLayout from "../layouts/AuthLayout";

export default function RegisterPage() {
  return (
    <AuthLayout
      title="Register"
      subtitle="Create a new account."
    >
      <form className="space-y-8">

        <input
          type="text"
          placeholder="Name"
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