import type { ValidationResult } from "../../types/index";

export class RegistrationValidator {
  validateLogin(login: string): ValidationResult {
    if (!login || login.trim().length < 3) {
      return { isValid: false, message: "Login must be at least 3 characters long" };
    }
    
    if (!/^[a-zA-Z0-9.-_]+$/.test(login)) {
      return { isValid: false, message: "Login can contain only English letters, numbers, dots, underscores, and hyphens" };
    }
    
    return { isValid: true, message: "" };
  }

  validatePassword(password: string): ValidationResult {
    if (!password || password.length < 6) {
      return { isValid: false, message: "Password must be at least 6 characters long" };
    }
    
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      return { isValid: false, message: "Password must contain at least 1 special character. eg: '#'" };
    }
    
    return { isValid: true, message: "" };
  }

  validateConfirmPassword(password: string, confirmPassword: string): ValidationResult {
    if (!confirmPassword) {
      return { isValid: false, message: "Please confirm your password" };
    }
    
    if (password !== confirmPassword) {
      return { isValid: false, message: "Passwords do not match" };
    }
    
    return { isValid: true, message: "" };
  }

  validateCity(city: string): ValidationResult {
    if (!city) {
      return { isValid: false, message: "Please select a city" };
    }
    return { isValid: true, message: "" };
  }

  validateStreet(street: string): ValidationResult {
    if (!street) {
      return { isValid: false, message: "Please select a street" };
    }
    return { isValid: true, message: "" };
  }

  validateHouseNumber(houseNumber: string): ValidationResult {
    const num = parseInt(houseNumber);
    if (!houseNumber || isNaN(num)) {
      return { isValid: false, message: "Please enter a house number" };
    }
    
    if (num < 1) {
      return { isValid: false, message: "House number must be greater than 1" };
    }
    
    return { isValid: true, message: "" };
  }
}