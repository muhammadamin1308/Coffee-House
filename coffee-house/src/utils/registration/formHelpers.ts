import { CITIES_STREETS } from "../../types";

export class FormHelpers {
  static setupCities(citySelect: HTMLSelectElement): void {
    Object.keys(CITIES_STREETS).forEach(city => {
      const option = document.createElement("option");
      option.value = city;
      option.textContent = city;
      citySelect.appendChild(option);
    });
  }

  static updateStreets(citySelect: HTMLSelectElement, streetSelect: HTMLSelectElement): void {
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

    streetSelect.value = "";
  }

  static showFieldError(input: HTMLElement, message: string): void {
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

  static clearFieldError(input: HTMLElement): void {
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

  static showFormError(message: string): void {
    const formError = document.getElementById("form-error");
    if (formError) {
      formError.textContent = message;
      formError.style.display = "block";
    }
  }
}