import { useEffect, useState } from "react";
import { Mail, Shield, LogOut, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios.js";
import toast from "react-hot-toast";
export default function ProfilePage() {
  // console.log("NEW PROFILE PAGE LOADED");
  const [user, setUser] = useState(null);
  const [uploading, setUploading] = useState(false);
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
      }
    };

    fetchProfile();
  }, []);

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
          withCredentials: true,
        },
      );

      localStorage.removeItem("accessToken");

      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  const handleAvatarUpload = async (e) => {
    try {
      const file = e.target.files[0];

      if (!file) return;

      setUploading(true);

      const token = localStorage.getItem("accessToken");

      const formData = new FormData();

      formData.append("avatar", file);

      const response = await api.post("/auth/avatar", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUser((prev) => ({
        ...prev,
        profileImage: response.data.data.avatarUrl,
    }));
    toast.success("Avatar updated successfully");
    } catch (error) {
      console.error(error);
       toast.error(
    error.response?.data?.message ||
    "Failed to upload avatar"
  );
  e.target.value = "";
    } finally {
      setUploading(false);
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
            <span className="text-[#111827]">SECURE</span>{" "}
            <span className="text-[#C8102E]">AUTH</span>
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
{/* AVATAR + BUTTON */}

<div className="flex flex-col items-center">
  <div
    className="
    w-28
    h-28
    rounded-full
    overflow-hidden
    bg-[#C8102E]
    flex
    items-center
    justify-center
    "
  >
    {user.profileImage ? (
     <img
  src={user.profileImage}
  alt={user.name}
  onError={(e) => {
    e.target.style.display = "none";
  }}
  className="
  w-full
  h-full
  object-cover
  "
/>
    ) : (
      <span
        className="
        text-white
        text-5xl
        font-black
        "
      >
        {user.name
          ?.charAt(0)
          ?.toUpperCase()}
      </span>
    )}
  </div>

  <label
    className="
    mt-4
    cursor-pointer
    px-4
    py-2
    bg-[#C8102E]
    text-white
    rounded-xl
    text-sm
    hover:opacity-90
    transition
    "
  >
    {uploading
      ? "Uploading..."
      : "Change Avatar"}

    <input
      type="file"
      accept="image/*"
      onChange={handleAvatarUpload}
      className="hidden"
    />
  </label>
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
              <Mail size={20} className="text-[#C8102E]" />

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
              <Shield size={20} className="text-[#C8102E]" />

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
            <User size={20} className="text-[#C8102E]" />

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
