import { productService } from "../services/productService";
import type { Category, FavCoffee } from "../types";
import { loadModal } from "../components/modal";
import { modalManager } from "../utils/modal/modalManager";

export function renderMenu(): string {
  return `
    <div id="menu">
      <div class="container menu-container">
        <h2 class="menu-title heading-2">
          Behind each of our cups hides an <em>amazing surprise</em>
        </h2>
        <div class="tabs">
          <button class="tab-button active" data-category="coffee">Coffee</button>
          <button class="tab-button" data-category="tea">Tea</button>
          <button class="tab-button" data-category="dessert">Dessert</button>
        </div>
        <div class="menu-grid">
          <div class="loader">Loading products...</div>
        </div>
        <div class="load-more-container">
          <!-- Load more button will be added here -->
        </div>
      </div>
    </div>
    ${loadModal()}
  `;
}

let allProducts: FavCoffee[] = [];

function renderProductCard(p: FavCoffee): string {
  return `
      <article class="menu-card" data-product-id="${p.id}" style="cursor: pointer;">
      <div class="menu-card-image">
        <img src="assets/coffee/${p.id}.jpg" alt="${p.name}" />
      </div>
      <div class="menu-card-content">
        <h3>${p.name}</h3>
        <p>${p.description}</p>
        <p class="price">$${p.price}</p>
      </div>
    </article>
  `;
}

function displayProducts(products: FavCoffee[]): void {
  const container = document.querySelector(".menu-grid");

  if (!container) return;
  container.innerHTML = products.map(renderProductCard).join("");

  // Setup click handlers for product cards
  setupProductCardListeners();
}

function setupProductCardListeners(): void {
  const productCards = document.querySelectorAll(".menu-card");

  productCards.forEach((card) => {
    card.addEventListener("click", () => {
      const productId = card.getAttribute("data-product-id");
      if (productId) {
        modalManager.openModal(parseInt(productId));
      }
    });
  });
}

function filterByCategory(category: Category): void {
  const filtered = productService.getProductsByCategory(category);
  displayProducts(filtered);
}

function setupCategoryTabs(): void {
  const tabs = document.querySelectorAll(".tab-button");

  tabs.forEach((tab) => {
    tab.addEventListener("click", (e) => {
      const target = e.currentTarget as HTMLButtonElement;
      const category = target.dataset.category as Category;

      tabs.forEach((t) => t.classList.remove("active"));
      target.classList.add("active");

      filterByCategory(category);
    });
  });
}

export async function loadMenuData(): Promise<void> {
  const container = document.querySelector(".menu-grid");
  if (!container) return;

  try {
    container.innerHTML = '<div class="loader">Loading products...</div>';

    allProducts = await productService.loadProducts();

    if (allProducts.length === 0) {
      container.innerHTML =
        '<p class="error-message">Something went wrong. Please, refresh the page</p>';
      return;
    }

    filterByCategory("coffee");

    setupCategoryTabs();
  } catch (error) {
    console.error("Failed to load menu data:", error);
    container.innerHTML =
      '<p class="error-message">Something went wrong. Please, refresh the page</p>';
  }
}
