import type { FormData, ValidationResult } from "../../types/index";
import { CITIES_STREETS } from "../../types";
import { API_ENDPOINTS } from "../../config/api";

class RegistrationValidator {
  validateLogin(login: string): ValidationResult {
    if (!login || login.trim().length < 3) {
      return { isValid: false, message: "Login must be at least 3 characters long" };
    }
    
    if (!/^[a-zA-Z]/.test(login)) {
      return { isValid: false, message: "Login must start with a letter" };
    }
    
    if (!/^[a-zA-Z]+$/.test(login)) {
      return { isValid: false, message: "Login must contain only English letters" };
    }
    
    return { isValid: true, message: "" };
  }

  validatePassword(password: string): ValidationResult {
    if (!password || password.length < 6) {
      return { isValid: false, message: "Password must be at least 6 characters long" };
    }
    
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      return { isValid: false, message: "Password must contain at least 1 special character" };
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
    
    if (num < 2) {
      return { isValid: false, message: "House number must be greater than 1" };
    }
    
    return { isValid: true, message: "" };
  }
}

export class RegistrationManager {
  private validator: RegistrationValidator;
  private form: HTMLFormElement | null = null;
  private submitButton: HTMLButtonElement | null = null;
  private formState: Record<string, boolean> = {};

  constructor() {
    this.validator = new RegistrationValidator();
  }

  init(): void {
    this.form = document.getElementById("register-form") as HTMLFormElement;
    this.submitButton = this.form?.querySelector(".register-btn") as HTMLButtonElement;

    if (!this.form) return;

    this.setupCities();
    this.setupEventListeners();
  }

  private setupCities(): void {
    const citySelect = document.getElementById("city") as HTMLSelectElement;
    if (!citySelect) return;

    Object.keys(CITIES_STREETS).forEach(city => {
      const option = document.createElement("option");
      option.value = city;
      option.textContent = city;
      citySelect.appendChild(option);
    });
  }

  private setupEventListeners(): void {
    if (!this.form) return;

    // Login validation
    const loginInput = this.form.querySelector("#login") as HTMLInputElement;
    loginInput?.addEventListener("blur", () => this.validateField("login"));
    loginInput?.addEventListener("focus", () => this.clearFieldError("login"));
    loginInput?.addEventListener("input", () => this.checkFormValidity());

    // Password validation
    const passwordInput = this.form.querySelector("#password") as HTMLInputElement;
    passwordInput?.addEventListener("blur", () => this.validateField("password"));
    passwordInput?.addEventListener("focus", () => this.clearFieldError("password"));
    passwordInput?.addEventListener("input", () => this.checkFormValidity());

    // Confirm password validation
    const confirmPasswordInput = this.form.querySelector("#confirmPassword") as HTMLInputElement;
    confirmPasswordInput?.addEventListener("blur", () => this.validateField("confirmPassword"));
    confirmPasswordInput?.addEventListener("focus", () => this.clearFieldError("confirmPassword"));
    confirmPasswordInput?.addEventListener("input", () => this.checkFormValidity());

    // City change - update streets
    const citySelect = this.form.querySelector("#city") as HTMLSelectElement;
    citySelect?.addEventListener("change", () => {
      this.updateStreets();
      this.validateField("city");
      this.checkFormValidity();
    });
    citySelect?.addEventListener("focus", () => this.clearFieldError("city"));

    // Street validation
    const streetSelect = this.form.querySelector("#street") as HTMLSelectElement;
    streetSelect?.addEventListener("change", () => {
      this.validateField("street");
      this.checkFormValidity();
    });
    streetSelect?.addEventListener("focus", () => this.clearFieldError("street"));

    // House number validation
    const houseNumberInput = this.form.querySelector("#houseNumber") as HTMLInputElement;
    houseNumberInput?.addEventListener("blur", () => this.validateField("houseNumber"));
    houseNumberInput?.addEventListener("focus", () => this.clearFieldError("houseNumber"));
    houseNumberInput?.addEventListener("input", () => this.checkFormValidity());

    // Form submission
    this.form.addEventListener("submit", (e) => this.handleSubmit(e));
  }

  private updateStreets(): void {
    const citySelect = document.getElementById("city") as HTMLSelectElement;
    const streetSelect = document.getElementById("street") as HTMLSelectElement;

    if (!citySelect || !streetSelect) return;

    const selectedCity = citySelect.value;
    streetSelect.innerHTML = '<option value="">Select street</option>';

    if (selectedCity && CITIES_STREETS[selectedCity]) {
      streetSelect.disabled = false;
      CITIES_STREETS[selectedCity].forEach(street => {
        const option = document.createElement("option");
        option.value = street;
        option.textContent = street;
        streetSelect.appendChild(option);
      });
    } else {
      streetSelect.disabled = true;
    }

    // Reset street selection
    streetSelect.value = "";
    this.formState["street"] = false;
  }

  private validateField(fieldName: string): void {
    const input = this.form?.querySelector(`[name="${fieldName}"]`) as HTMLInputElement | HTMLSelectElement;
    if (!input) return;

    let result: ValidationResult;

    switch (fieldName) {
      case "login":
        result = this.validator.validateLogin(input.value);
        break;
      case "password":
        result = this.validator.validatePassword(input.value);
        break;
      case "confirmPassword":
        const passwordInput = this.form?.querySelector("#password") as HTMLInputElement;
        result = this.validator.validateConfirmPassword(passwordInput.value, input.value);
        break;
      case "city":
        result = this.validator.validateCity(input.value);
        break;
      case "street":
        result = this.validator.validateStreet(input.value);
        break;
      case "houseNumber":
        result = this.validator.validateHouseNumber(input.value);
        break;
      default:
        return;
    }

    this.formState[fieldName] = result.isValid;

    if (!result.isValid) {
      this.showFieldError(fieldName, result.message);
    } else {
      this.clearFieldError(fieldName);
    }

    this.checkFormValidity();
  }

  private showFieldError(fieldName: string, message: string): void {
    const input = this.form?.querySelector(`[name="${fieldName}"]`) as HTMLElement;
    const wrapper = input?.closest(".input-wrapper");
    const errorMessage = input?.closest(".form-group")?.querySelector(".error-message") as HTMLElement;
    const errorIcon = wrapper?.querySelector(".error-icon") as HTMLElement;

    if (input) {
      input.style.borderColor = "#e53e3e";
    }
    if (errorIcon) {
      errorIcon.style.display = "block";
    }
    if (errorMessage) {
      errorMessage.textContent = message;
      errorMessage.style.display = "block";
    }
  }

  private clearFieldError(fieldName: string): void {
    const input = this.form?.querySelector(`[name="${fieldName}"]`) as HTMLElement;
    const wrapper = input?.closest(".input-wrapper");
    const errorMessage = input?.closest(".form-group")?.querySelector(".error-message") as HTMLElement;
    const errorIcon = wrapper?.querySelector(".error-icon") as HTMLElement;

    if (input) {
      input.style.borderColor = "";
    }
    if (errorIcon) {
      errorIcon.style.display = "none";
    }
    if (errorMessage) {
      errorMessage.textContent = "";
      errorMessage.style.display = "none";
    }
  }

  private checkFormValidity(): void {
    const allFieldsValid = 
      this.formState["login"] &&
      this.formState["password"] &&
      this.formState["confirmPassword"] &&
      this.formState["city"] &&
      this.formState["street"] &&
      this.formState["houseNumber"];

    if (this.submitButton) {
      this.submitButton.disabled = !allFieldsValid;
    }
  }

  private async handleSubmit(e: Event): Promise<void> {
    e.preventDefault();

    if (!this.form) return;

    const formData: FormData = {
      login: (this.form.querySelector("#login") as HTMLInputElement).value,
      password: (this.form.querySelector("#password") as HTMLInputElement).value,
      confirmPassword: (this.form.querySelector("#confirmPassword") as HTMLInputElement).value,
      city: (this.form.querySelector("#city") as HTMLSelectElement).value,
      street: (this.form.querySelector("#street") as HTMLSelectElement).value,
      houseNumber: parseInt((this.form.querySelector("#houseNumber") as HTMLInputElement).value),
      paymentMethod: (this.form.querySelector('input[name="paymentMethod"]:checked') as HTMLInputElement).value
    };

    try {
      const response = await fetch(API_ENDPOINTS.REGISTER, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        const error = await response.json();
        this.showFormError(error.message || "Registration failed. Please try again.");
        return;
      }

      // Success - redirect to login or home
      alert("Registration successful!");
      window.location.hash = "#login";
    } catch (error) {
      console.error("Registration error:", error);
      this.showFormError("Network error. Please check your connection and try again.");
    }
  }

  private showFormError(message: string): void {
    const formError = document.getElementById("form-error");
    if (formError) {
      formError.textContent = message;
      formError.style.display = "block";
    }
  }
}