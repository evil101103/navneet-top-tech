import api from "./api";
import { AuthData, ApiResponse } from "../types/Login";

export const loginUser = async (loginData: AuthData): Promise<ApiResponse> => {
  try {
    const response = await api.post<ApiResponse>("/login", loginData);
    return response.data;
  } catch (error) {
    console.error("Error during login:", error);
    throw new Error(
      "Login failed. Please check your credentials and try again."
    );
  }
};
