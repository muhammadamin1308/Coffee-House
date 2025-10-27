import type { FormData } from "../../types/index";
import { API_ENDPOINTS } from "../../config/api";

export class RegistrationService {
  static async register(formData: FormData): Promise<void> {
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
  }
}