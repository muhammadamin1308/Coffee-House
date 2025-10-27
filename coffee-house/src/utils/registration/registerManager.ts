import type { FormData, ValidationResult } from "../../types/index";
import { AuthValidator } from "./AuthValidation";
import { FormHelpers } from "./formHelpers";
import { RegistrationService } from "./registrationService";

export class RegistrationManager {
  private validator: AuthValidator;
  private form: HTMLFormElement | null = null;
  private submitButton: HTMLButtonElement | null = null;
  private formState: Record<string, boolean> = {};

  constructor() {
    this.validator = new AuthValidator();
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

    FormHelpers.setupCities(citySelect);
  }

  private setupEventListeners(): void {
    if (!this.form) return;

    const loginInput = this.form.querySelector("#login") as HTMLInputElement;
    loginInput?.addEventListener("blur", () => this.validateField("login"));
    loginInput?.addEventListener("focus", () => this.clearFieldError("login"));
    loginInput?.addEventListener("input", () => this.checkFormValidity());

    const passwordInput = this.form.querySelector("#password") as HTMLInputElement;
    passwordInput?.addEventListener("blur", () => this.validateField("password"));
    passwordInput?.addEventListener("focus", () => this.clearFieldError("password"));
    passwordInput?.addEventListener("input", () => this.checkFormValidity());

    const confirmPasswordInput = this.form.querySelector("#confirmPassword") as HTMLInputElement;
    confirmPasswordInput?.addEventListener("blur", () => this.validateField("confirmPassword"));
    confirmPasswordInput?.addEventListener("focus", () => this.clearFieldError("confirmPassword"));
    confirmPasswordInput?.addEventListener("input", () => this.checkFormValidity());

    const citySelect = this.form.querySelector("#city") as HTMLSelectElement;
    citySelect?.addEventListener("change", () => {
      this.updateStreets();
      this.validateField("city");
      this.checkFormValidity();
    });
    citySelect?.addEventListener("focus", () => this.clearFieldError("city"));

    const streetSelect = this.form.querySelector("#street") as HTMLSelectElement;
    streetSelect?.addEventListener("change", () => {
      this.validateField("street");
      this.checkFormValidity();
    });
    streetSelect?.addEventListener("focus", () => this.clearFieldError("street"));

    const houseNumberInput = this.form.querySelector("#houseNumber") as HTMLInputElement;
    houseNumberInput?.addEventListener("blur", () => this.validateField("houseNumber"));
    houseNumberInput?.addEventListener("focus", () => this.clearFieldError("houseNumber"));
    houseNumberInput?.addEventListener("input", () => this.checkFormValidity());

    this.form.addEventListener("submit", (e) => this.handleSubmit(e));
  }

  private updateStreets(): void {
    const citySelect = document.getElementById("city") as HTMLSelectElement;
    const streetSelect = document.getElementById("street") as HTMLSelectElement;

    if (!citySelect || !streetSelect) return;

    FormHelpers.updateStreets(citySelect, streetSelect);
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
    if (input) {
      FormHelpers.showFieldError(input, message);
    }
  }

  private clearFieldError(fieldName: string): void {
    const input = this.form?.querySelector(`[name="${fieldName}"]`) as HTMLElement;
    if (input) {
      FormHelpers.clearFieldError(input);
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

    const formData = {
      login: (this.form.querySelector("#login") as HTMLInputElement).value,
      password: (this.form.querySelector("#password") as HTMLInputElement).value,
      confirmPassword: (this.form.querySelector("#confirmPassword") as HTMLInputElement).value,
      city: (this.form.querySelector("#city") as HTMLSelectElement).value,
      street: (this.form.querySelector("#street") as HTMLSelectElement).value,
      houseNumber: parseInt((this.form.querySelector("#houseNumber") as HTMLInputElement).value),
      paymentMethod: (this.form.querySelector('input[name="paymentMethod"]:checked') as HTMLInputElement).value
    };

    try {
      const response = await RegistrationService.register(formData);
      alert(`Registration successful! Welcome, ${response.data.user.login}!`);
      window.location.hash = "#menu";
    } catch (error) {
      console.error("Registration error:", error);
      const message = error instanceof Error ? error.message : "Network error. Please check your connection and try again.";
      FormHelpers.showFormError(message);
    }
  }
}