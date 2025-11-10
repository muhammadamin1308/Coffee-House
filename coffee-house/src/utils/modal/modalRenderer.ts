import type { Coffee, Size } from "../../types";
import { PriceCalculator } from "./priceCalc";

export class ModalRenderer {
  private priceCalculator: PriceCalculator;

  constructor() {
    this.priceCalculator = new PriceCalculator();
  }

  renderProductInfo(product: Coffee): void {
    const image = document.getElementById(
      "modal-product-image"
    ) as HTMLImageElement;
    if (image) {
      image.src = `assets/coffee/${product.id}.jpg`;
      image.alt = product.name;
    }

    const name = document.getElementById("modal-product-name");
    if (name) name.textContent = product.name;

    const description = document.getElementById("modal-product-description");
    if (description) description.textContent = product.description;
  }

  renderSizeOptions(
    product: Coffee,
    defaultSize: Size,
    isUserLoggedIn: boolean
  ): string {
    const sizeKeys = Object.keys(product.sizes || {}) as Size[];

    return sizeKeys
      .map((sizeKey) => {
        const sizeOption = product.sizes?.[sizeKey];
        if (!sizeOption) return "";
        const price = sizeOption.price;
        const discountPrice = sizeOption.discountPrice;

        return `
          <label class="modal-option tooltip">
            <input
              type="radio"
              name="size"
              value="${sizeKey}"
              data-price="${price}"
              data-discount-price="${discountPrice || ""}"
              ${sizeKey === defaultSize ? "checked" : ""}
            />
            <span class="option-button">
              <span class="option-icon">${sizeKey.toUpperCase()}</span>
              <span class="option-text">${sizeOption.size}</span>
            </span>
            <span class="tooltip-text">
              ${this.priceCalculator.renderPriceTooltip(
                price,
                discountPrice || undefined,
                isUserLoggedIn
              )}
            </span>
          </label>
        `;
      })
      .join("");
  }

  renderAdditiveOptions(product: Coffee, isUserLoggedIn: boolean): string {
    if (!product.additives || product.additives.length === 0) {
      return '<p class="no-options">No additives available</p>';
    }

    return product.additives
      .map((additive, index) => {
        const price = additive.price;
        const discountPrice = additive.discountPrice;

        return `
          <label class="modal-option tooltip">
            <input
              type="checkbox"
              name="additive"
              value="${index}"
              data-price="${price}"
              data-discount-price="${discountPrice || ""}"
            />
            <span class="option-button">
              <span class="option-icon">${index + 1}</span>
              <span class="option-text">${additive.name}</span>
            </span>
            <span class="tooltip-text">
              ${this.priceCalculator.renderPriceTooltip(
                price,
                discountPrice || undefined,
                isUserLoggedIn
              )}
            </span>
          </label>
        `;
      })
      .join("");
  }

  updateTotalDisplay(total: number): void {
    const totalElement = document.getElementById("modal-total-price");
    if (totalElement) {
      totalElement.textContent = `$${total.toFixed(2)}`;
    }
  }

  showErrorNotification(): void {
    const notification = document.createElement("div");
    notification.className = "error-notification";
    notification.textContent = "Something went wrong. Please, try again";

    document.body.appendChild(notification);

    setTimeout(() => {
      notification.classList.add("fade-out");
      setTimeout(() => notification.remove(), 300);
    }, 5000);
  }

  showSuccessNotification(message: string): void {
    const notification = document.createElement("div");
    notification.className = "success-notification";
    notification.textContent = message;

    document.body.appendChild(notification);

    setTimeout(() => {
      notification.classList.add("fade-out");
      setTimeout(() => notification.remove(), 300);
    }, 3000);
  }
}
