import type { Size } from "../../types";
import { ModalState } from "./mdoalState";

export class ModalEventHandlers {
  private state: ModalState;
  private onUpdateTotal: () => void;
  private onClose: () => void;

  constructor(
    state: ModalState,
    _priceCalculator: unknown,
    _renderer: unknown,
    onUpdateTotal: () => void,
    onClose: () => void
  ) {
    this.state = state;
    this.onUpdateTotal = onUpdateTotal;
    this.onClose = onClose;
  }

  setupGlobalListeners(overlay: HTMLElement): void {
    // Close button
    const closeBtn = document.getElementById("modal-close");
    closeBtn?.addEventListener("click", () => this.onClose());

    // Overlay click
    overlay.addEventListener("click", (e) => {
      if (e.target === overlay) {
        this.onClose();
      }
    });

    // ESC key
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && overlay.classList.contains("active")) {
        this.onClose();
      }
    });

  }

  setupSizeListeners(): void {
    const container = document.getElementById("size-options");
    if (!container) return;

    container.querySelectorAll('input[name="size"]').forEach((input) => {
      input.addEventListener("change", (e) => {
        const target = e.target as HTMLInputElement;
        this.state.setSelectedSize(target.value as Size);
        this.onUpdateTotal();
      });
    });
  }

  setupAdditiveListeners(): void {
    const container = document.getElementById("additive-options");
    if (!container) return;

    container.querySelectorAll('input[name="additive"]').forEach((input) => {
      input.addEventListener("change", (e) => {
        const target = e.target as HTMLInputElement;
        const index = parseInt(target.value);

        if (target.checked) {
          this.state.addAdditive(index);
        } else {
          this.state.removeAdditive(index);
        }

        this.onUpdateTotal();
      });
    });
  }

  setupAddToCartListener(callback: () => void): void {
    const addToCartBtn = document.getElementById("add-to-cart-btn");
    if (addToCartBtn) {
      // Remove any existing listeners by cloning
      const newBtn = addToCartBtn.cloneNode(true) as HTMLElement;
      addToCartBtn.parentNode?.replaceChild(newBtn, addToCartBtn);
      
      newBtn.addEventListener("click", () => {
        callback();
        this.onClose();
      });
    }
  }
}