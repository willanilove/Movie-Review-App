import axios from "axios";

const BASE_URL = "http://127.0.0.1:5001";

export async function registerUser(userData) {
  try {
    const response = await axios.post(`${BASE_URL}/users`, userData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: "Signup failed" };
  }
}

export async function loginUser(loginData) {
  try {
    const response = await axios.post(`${BASE_URL}/login`, loginData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: "Login failed" };
  }
}
