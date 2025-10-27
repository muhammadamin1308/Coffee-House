import type { FormData } from "../../types/index";
import { API_ENDPOINTS } from "../../config/api";

interface RegistrationResponse {
  data: {
    access_token: string;
    user: {
      login: string;
      city: string;
      street: string;
      houseNumber: number;
      paymentMethod: string;
      id: number;
      createdAt: string;
    };
  };
  message: string;
}

export class RegistrationService {
  static async register(formData: FormData): Promise<RegistrationResponse> {
    const response = await fetch(API_ENDPOINTS.REGISTER, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData)
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Registration failed. Please try again.");
    }

    const data: RegistrationResponse = await response.json();
    
    // Save access token to localStorage
    if (data.data.access_token) {
      localStorage.setItem("authToken", data.data.access_token);
      localStorage.setItem("user", JSON.stringify(data.data.user));
    }

    return data;
  }
}