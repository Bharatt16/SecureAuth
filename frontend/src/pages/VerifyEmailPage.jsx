import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { MailCheck } from "lucide-react";
import AuthLayout from "../layouts/AuthLayout";
import api from "../api/axios";
import toast from "react-hot-toast";

export default function VerifyEmailPage() {
  const { token } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const verify = async () => {
      try {
        const res = await api.get(
          `/auth/verify-email/${token}`
        );

        toast.success(res.data.message);

        setTimeout(() => {
          navigate("/login");
        }, 2000);

      } catch (error) {
        toast.error(
          error.response?.data?.message ||
            "Verification failed"
        );
      }
    };

    verify();
  }, [token, navigate]);

  return (
    <AuthLayout
      title="Verify Email"
      subtitle="Please wait while we verify your account."
    >
      <div
        className="
        flex
        flex-col
        items-center
        justify-center
        py-10
        "
      >

        {/* ICON */}

        <div
          className="
          w-20
          h-20
          rounded-full
          bg-red-50
          flex
          items-center
          justify-center
          mb-8
          "
        >
          <MailCheck
            size={38}
            className="text-[#C8102E]"
          />
        </div>

        {/* SPINNER */}

        <div
          className="
          w-10
          h-10
          border-4
          border-red-100
          border-t-[#C8102E]
          rounded-full
          animate-spin
          "
        />

        <p
          className="
          text-gray-500
          text-center
          mt-8
          "
        >
          Verifying your email address...
        </p>

      </div>
    </AuthLayout>
  );
}