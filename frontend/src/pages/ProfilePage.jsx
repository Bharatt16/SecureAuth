import { useEffect, useState } from "react";
import {
  Mail,
  Shield,
  LogOut,
  User,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios.js";

export default function ProfilePage() {
    // console.log("NEW PROFILE PAGE LOADED");
  const [user, setUser] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token =
          localStorage.getItem(
            "accessToken"
          );

        const response =
          await api.get("/auth/me", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

        setUser(response.data.data);

      } catch (error) {
        console.error(error);
      }
    };

    fetchProfile();
  }, []);

  const handleLogout = async () => {
    try {
      const token =
        localStorage.getItem(
          "accessToken"
        );

      await api.post(
        "/auth/logout",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );

      localStorage.removeItem(
        "accessToken"
      );

      navigate("/login");

    } catch (error) {
      console.error(error);
    }
  };

  if (!user) {
    return (
      <div
        className="
        min-h-screen
        bg-[#F7F3EE]
        flex
        items-center
        justify-center
        "
      >
        <div
          className="
          w-12
          h-12
          border-4
          border-red-100
          border-t-[#C8102E]
          rounded-full
          animate-spin
          "
        />
      </div>
    );
  }

  return (
    
    <div className="min-h-screen bg-[#F7F3EE]">

      {/* NAVBAR */}

      <div
        className="
        border-b
        border-gray-200
        bg-white/50
        backdrop-blur
        "
      >
        <div
          className="
          max-w-6xl
          mx-auto
          px-6
          py-5
          flex
          justify-between
          items-center
          "
        >
          <h1
            className="
            text-2xl
            font-black
            "
          >
            <span className="text-[#111827]">
              SECURE
            </span>{" "}
            <span className="text-[#C8102E]">
              AUTH
            </span>
          </h1>

          <button
            onClick={handleLogout}
            className="
            flex
            items-center
            gap-2
            text-[#C8102E]
            font-medium
            "
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </div>

      {/* CONTENT */}

      <div
        className="
        max-w-6xl
        mx-auto
        px-6
        py-12
        "
      >

        {/* PROFILE CARD */}

        <div
          className="
          bg-white
          rounded-3xl
          p-10
          shadow-sm
          border
          border-gray-100
          "
        >
          <div
            className="
            flex
            flex-col
            md:flex-row
            md:items-center
            gap-8
            "
          >

            {/* AVATAR */}

            <div
              className="
              w-28
              h-28
              rounded-full
              bg-[#C8102E]
              flex
              items-center
              justify-center
              text-white
              text-5xl
              font-black
              "
            >
              {user.name
                ?.charAt(0)
                ?.toUpperCase()}
            </div>

            {/* INFO */}

            <div>
              <h2
                className="
                text-4xl
                font-black
                text-[#111827]
                "
              >
                {user.name}
              </h2>

              <p
                className="
                text-gray-500
                mt-2
                "
              >
                Welcome back.
              </p>
            </div>

          </div>
        </div>

        {/* STATS */}

        <div
          className="
          grid
          md:grid-cols-2
          gap-6
          mt-8
          "
        >

          {/* EMAIL */}

          <div
            className="
            bg-white
            rounded-3xl
            p-8
            shadow-sm
            border
            border-gray-100
            "
          >
            <div
              className="
              flex
              items-center
              gap-3
              mb-4
              "
            >
              <Mail
                size={20}
                className="text-[#C8102E]"
              />

              <span
                className="
                text-gray-500
                text-sm
                "
              >
                EMAIL
              </span>
            </div>

            <p
              className="
              text-lg
              font-semibold
              break-all
              "
            >
              {user.email}
            </p>
          </div>

          {/* ROLE */}

          <div
            className="
            bg-white
            rounded-3xl
            p-8
            shadow-sm
            border
            border-gray-100
            "
          >
            <div
              className="
              flex
              items-center
              gap-3
              mb-4
              "
            >
              <Shield
                size={20}
                className="text-[#C8102E]"
              />

              <span
                className="
                text-gray-500
                text-sm
                "
              >
                ROLE
              </span>
            </div>

            <p
              className="
              text-lg
              font-semibold
              capitalize
              "
            >
              {user.role}
            </p>
          </div>

        </div>

        {/* ACCOUNT STATUS */}

        <div
          className="
          bg-white
          rounded-3xl
          p-8
          shadow-sm
          border
          border-gray-100
          mt-8
          "
        >
          <div
            className="
            flex
            items-center
            gap-3
            mb-4
            "
          >
            <User
              size={20}
              className="text-[#C8102E]"
            />

            <span
              className="
              text-gray-500
              text-sm
              "
            >
              ACCOUNT STATUS
            </span>
          </div>

          <div
            className="
            inline-flex
            px-4
            py-2
            rounded-full
            bg-green-100
            text-green-700
            font-medium
            "
          >
            Active
          </div>
        </div>

      </div>
    </div>
  );
}