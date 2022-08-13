import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:5000/api",
  timeout: 1000,
});

const login = async (data) => {
  try {
    return await apiClient.post("/auth/login", data);
  } catch (execption) {
    return { error: true, execption };
  }
};

const register = async (data) => {
  try {
    return await apiClient.post("/auth/register", data);
  } catch (execption) {
    return { error: true, execption };
  }
};

export { login, register };
