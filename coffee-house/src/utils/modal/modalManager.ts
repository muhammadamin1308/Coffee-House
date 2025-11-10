import { productService } from "../../services/productService";
import { cartService } from "../../services/cartService";
import { ModalState } from "./mdoalState";
import { PriceCalculator } from "./priceCalc";
import { ModalRenderer } from "./modalRenderer";
import { ModalEventHandlers } from "./modalEventHandlers";

export class ModalManager {
  private overlay: HTMLElement | null = null;
  private modal: HTMLElement | null = null;
  private loader: HTMLElement | null = null;

  private state: ModalState;
  private priceCalculator: PriceCalculator;
  private renderer: ModalRenderer;
  private eventHandlers: ModalEventHandlers;

  constructor() {
    this.state = new ModalState();
    this.priceCalculator = new PriceCalculator();
    this.renderer = new ModalRenderer();
    this.eventHandlers = new ModalEventHandlers(
      this.state,
      this.priceCalculator,
      this.renderer,
      () => this.updateTotal(),
      () => this.closeModal()
    );

    this.init();
  }

  private init(): void {
    this.overlay = document.getElementById("modal-overlay");
    this.modal = document.getElementById("modal");
    this.loader = document.getElementById("modal-loader");

    if (this.overlay) {
      this.eventHandlers.setupGlobalListeners(this.overlay);
    }
  }

  private ensureElementsInitialized(): void {
    if (!this.overlay || !this.modal || !this.loader) {
      this.overlay = document.getElementById("modal-overlay");
      this.modal = document.getElementById("modal");
      this.loader = document.getElementById("modal-loader");

      if (this.overlay) {
        this.eventHandlers.setupGlobalListeners(this.overlay);
      }
    }
  }

  async openModal(productId: number): Promise<void> {
    try {
      this.ensureElementsInitialized();
      this.showLoader();

      const product = await productService.getProductById(productId);

      if (!product) {
        throw new Error("Product not found");
      }

      this.state.setCurrentProduct(product);
      this.hideLoader();
      this.renderModalContent();
      this.showModal();
    } catch (error) {
      console.error("Failed to load product:", error);
      this.hideLoader();
      this.renderer.showErrorNotification();
    }
  }

  private showLoader(): void {
    this.overlay?.classList.add("active");
    if (this.loader) this.loader.style.display = "flex";
    if (this.modal) this.modal.style.display = "none";
    document.body.classList.add("modal-open");
  }

  private hideLoader(): void {
    if (this.loader) this.loader.style.display = "none";
  }

  private showModal(): void {
    if (this.modal) this.modal.style.display = "block";
  }

  private closeModal(): void {
    this.overlay?.classList.remove("active");
    document.body.classList.remove("modal-open");
    this.state.clearSelections();
  }

  private renderModalContent(): void {
    const product = this.state.getCurrentProduct();
    if (!product) return;

    this.renderer.renderProductInfo(product);

    const sizeKeys = Object.keys(product.sizes || {});
    this.state.initializeDefaultSize(sizeKeys);

    const sizeContainer = document.getElementById("size-options");
    if (sizeContainer) {
      sizeContainer.innerHTML = this.renderer.renderSizeOptions(
        product,
        this.state.getSelectedSize(),
        this.state.isLoggedIn()
      );
      this.eventHandlers.setupSizeListeners();
    }

    const additiveContainer = document.getElementById("additive-options");
    if (additiveContainer) {
      additiveContainer.innerHTML = this.renderer.renderAdditiveOptions(
        product,
        this.state.isLoggedIn()
      );
      this.eventHandlers.setupAdditiveListeners();
    }

    this.eventHandlers.setupAddToCartListener(() => this.addToCart());

    this.updateTotal();
  }

  private updateTotal(): void {
    const product = this.state.getCurrentProduct();
    if (!product) return;

    const total = this.priceCalculator.calculateTotal(
      product,
      this.state.getSelectedSize(),
      this.state.getSelectedAdditives(),
      this.state.isLoggedIn()
    );

    this.renderer.updateTotalDisplay(total);
  }

  private addToCart(): void {
    const product = this.state.getCurrentProduct();
    if (!product) return;

    const size = this.state.getSelectedSize();
    const selectedAdditiveIndices = Array.from(this.state.getSelectedAdditives());

    const additives = selectedAdditiveIndices
      .map(index => product.additives?.[index]?.name)
      .filter((name): name is string => name !== undefined);

    cartService.addItem(product, size, additives);
    
    this.renderer.showSuccessNotification("Product added to cart!");
    
    setTimeout(() => {
      this.closeModal();
    }, 1000);
  }
}

export const modalManager = new ModalManager();