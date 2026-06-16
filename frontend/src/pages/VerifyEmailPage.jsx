import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
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
    <div className="min-h-screen flex items-center justify-center">
      <h1 className="text-2xl font-semibold">
        Verifying Email...
      </h1>
    </div>
  );
}