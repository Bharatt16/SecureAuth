import api from "../api/axios.js";

export const register = (data) =>
  api.post("/register", data);

export const login = (data) =>
  api.post("/login", data);

export const logout = () =>
  api.post("/logout");

export const getMe = (token) =>
  api.get("/me", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });