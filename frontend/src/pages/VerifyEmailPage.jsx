import AuthLayout from "../layouts/AuthLayout";

export default function VerifyEmailPage() {
  return (
    <AuthLayout
      title="Verifying Email"
      subtitle="Please wait..."
    >
      <div className="text-center">

        <div className="text-6xl mb-6">
          ✓
        </div>

        <p className="text-gray-500">
          Verifying your account...
        </p>

      </div>
    </AuthLayout>
  );
}