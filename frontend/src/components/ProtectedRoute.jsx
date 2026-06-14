import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import useAuth from "../hooks/useAuth";

export default function ProfilePage() {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("accessToken");

        const response = await api.get("/auth/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUser(response.data.data);
      } catch (error) {
        console.error(error);

        localStorage.removeItem("accessToken");
        navigate("/login");
      }
    };

    if (!user) {
      fetchProfile();
    }
  }, [user, setUser, navigate]);

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("accessToken");

      await api.post(
        "/auth/logout",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      localStorage.removeItem("accessToken");
      setUser(null);

      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen p-10">
      <h1 className="text-4xl font-bold mb-6">
        Welcome {user.name}
      </h1>

      <p>Email: {user.email}</p>
      <p>Role: {user.role}</p>

      <button
        onClick={handleLogout}
        className="mt-6 bg-red-600 text-white px-6 py-3 rounded"
      >
        Logout
      </button>
    </div>
  );
}