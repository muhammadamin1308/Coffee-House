import type { LoginData } from "../../../types";
import { API_ENDPOINTS } from "../../../config/api";

interface LoginResponse {
  data: {
    access_token: string;
    user: {
      id: number;
      login: string;
      city: string;
      street: string;
      houseNumber: number;
      paymentMethod: string;
      createdAt: string;
    };
  };
  message: string;
}

export class LoginService {
  static async login(loginData: LoginData): Promise<LoginResponse> {
    const response = await fetch(API_ENDPOINTS.LOGIN, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(loginData)
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Incorrect login or password");
    }

    const data: LoginResponse = await response.json();
    
    // Store authentication token and user data
    if (data.data.access_token) {
      localStorage.setItem("authToken", data.data.access_token);
      localStorage.setItem("user", JSON.stringify(data.data.user.login));
    }

    return data;
  }
}