import { useEffect, useState } from "react";
import api from "../api/axios";

export default function AdminPage() {
  const [users, setUsers] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token =
          localStorage.getItem(
            "accessToken"
          );

        const response =
          await api.get(
            "/auth/admin/users",
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

        setUsers(
          response.data.data
        );
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F7F3EE] p-8">

      <div className="max-w-7xl mx-auto">

        <h1
          className="
          text-5xl
          font-black
          text-[#111827]
          mb-8
          "
        >
          Admin Dashboard
        </h1>

        <div
          className="
          bg-white
          rounded-3xl
          shadow-sm
          border
          border-gray-100
          overflow-hidden
          "
        >
          <table className="w-full">

            <thead>
              <tr
                className="
                border-b
                border-gray-100
                text-left
                "
              >
                <th className="p-5">
                  User
                </th>

                <th className="p-5">
                  Email
                </th>

                <th className="p-5">
                  Role
                </th>

                <th className="p-5">
                  Verified
                </th>
              </tr>
            </thead>

            <tbody>

              {users.map(
                (user) => (
                  <tr
                    key={user._id}
                    className="
                    border-b
                    border-gray-100
                    "
                  >
                    <td className="p-5">
                      <div className="flex items-center gap-3">

                        {user.profileImage ? (
                          <img
                            src={
                              user.profileImage
                            }
                            alt={
                              user.name
                            }
                            className="
                            w-10
                            h-10
                            rounded-full
                            object-cover
                            "
                          />
                        ) : (
                          <div
                            className="
                            w-10
                            h-10
                            rounded-full
                            bg-[#C8102E]
                            text-white
                            flex
                            items-center
                            justify-center
                            font-bold
                            "
                          >
                            {user.name
                              ?.charAt(
                                0
                              )
                              .toUpperCase()}
                          </div>
                        )}

                        {user.name}
                      </div>
                    </td>

                    <td className="p-5">
                      {user.email}
                    </td>

                    <td className="p-5 capitalize">
                      {user.role}
                    </td>

                    <td className="p-5">
                      {user.isVerified
                        ? "✅"
                        : "❌"}
                    </td>
                  </tr>
                )
              )}

            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}