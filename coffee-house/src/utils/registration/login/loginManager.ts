import type { ValidationResult } from "../../../types/index";
import { AuthValidator } from "../AuthValidation";
import { FormHelpers } from "../formHelpers";
import { LoginService } from "./loginService";
import type { LoginData } from "../../../types/index";

export class LoginManager {
  private validator: AuthValidator;
  private form: HTMLFormElement | null = null;
  private submitButton: HTMLButtonElement | null = null;
  private formState: Record<string, boolean> = {};

  constructor() {
    this.validator = new AuthValidator();
  }

  init(): void {
    this.form = document.getElementById("login-form") as HTMLFormElement;
    this.submitButton = this.form?.querySelector('button[type="submit"]') as HTMLButtonElement;

    if (!this.form) return;

    this.setupEventListeners();
  }

  private setupEventListeners(): void {
    if (!this.form) return;

    const loginInput = this.form.querySelector('#login') as HTMLInputElement;
    loginInput?.addEventListener("blur", () => this.validateField("login"));
    loginInput?.addEventListener("focus", () => this.clearFieldError("login"));
    loginInput?.addEventListener("input", () => this.checkFormValidity());

    const passwordInput = this.form.querySelector('#password') as HTMLInputElement;
    passwordInput?.addEventListener("blur", () => this.validateField("password"));
    passwordInput?.addEventListener("focus", () => this.clearFieldError("password"));
    passwordInput?.addEventListener("input", () => this.checkFormValidity());

    this.form.addEventListener("submit", (e) => this.handleSubmit(e));
  }

  private validateField(fieldName: string): void {
    let input: HTMLInputElement | null = null;
    let result: ValidationResult;

    if (fieldName === "login") {
      input = this.form?.querySelector('#login') as HTMLInputElement;
      result = this.validator.validateLogin(input?.value || "");
    } else if (fieldName === "password") {
      input = this.form?.querySelector('#password') as HTMLInputElement;
      result = this.validator.validatePassword(input?.value || "");
    } else {
      return;
    }

    if (!input) return;

    this.formState[fieldName] = result.isValid;

    if (!result.isValid) {
      this.showFieldError(fieldName, result.message);
    } else {
      this.clearFieldError(fieldName);
    }

    this.checkFormValidity();
  }

  private showFieldError(fieldName: string, message: string): void {
    let input: HTMLElement | null = null;

    if (fieldName === "login") {
      input = this.form?.querySelector('#login') as HTMLElement;
    } else if (fieldName === "password") {
      input = this.form?.querySelector('#password') as HTMLElement;
    }

    if (input) {
      FormHelpers.showFieldError(input, message);
    }
  }

  private clearFieldError(fieldName: string): void {
    let input: HTMLElement | null = null;

    if (fieldName === "login") {
      input = this.form?.querySelector('#login') as HTMLElement;
    } else if (fieldName === "password") {
      input = this.form?.querySelector('#password') as HTMLElement;
    }

    if (input) {
      FormHelpers.clearFieldError(input);
    }

    FormHelpers.clearFormError();
  }

  private checkFormValidity(): void {
    const allFieldsValid = 
      this.formState["login"] &&
      this.formState["password"];

    if (this.submitButton) {
      this.submitButton.disabled = !allFieldsValid;
    }
  }

  private async handleSubmit(e: Event): Promise<void> {
    e.preventDefault();

    if (!this.form) return;

    const loginData: LoginData = {
      login: (this.form.querySelector("#login") as HTMLInputElement).value,
      password: (this.form.querySelector("#password") as HTMLInputElement).value
    };

    try {
      const response = await LoginService.login(loginData);
      alert(`Login successful! Welcome back, ${response.data.user.login}!`);
      window.location.hash = "#menu";
    } catch (error) {
      console.error("Login error:", error);
      const message = error instanceof Error ? error.message : "Incorrect login or password";
      FormHelpers.showFormError(message);
    }
  }
}