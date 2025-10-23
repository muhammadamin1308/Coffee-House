import { productService } from '../services/productService'

export function renderMenu(): string {
  return `
    <main id="menu">
      <div class="container menu-container">
        <h2 class="menu-title heading-2">
          Behind each of our cups hides an <em>amazing surprise</em>
        </h2>
        <div class="tabs">
          <button class="tab-button active" data-category="coffee">☕ Coffee</button>
          <button class="tab-button" data-category="tea">🍃 Tea</button>
          <button class="tab-button" data-category="dessert">🧁 Dessert</button>
        </div>
                <div class="menu-grid">

        </div>
        <div class="load-more-container">
          <!-- Load more button will be added here -->
        </div>
      </div>
    </main>

    </main>
  `;
}

export async function loadMenuData(): Promise<void> {
  try {
    const products = await productService.loadProducts();
    const container = document.getElementById('menu-grid');
    
    if (!container) return;
    
    if (products.length === 0) {
      container.innerHTML = '<p>No products available at the moment.</p>';
      return;
    }
    
    container.innerHTML = products
      .map(p => `
        <div class="product-card" data-id="${p.id}">
          <div class="product-image">
            <img src="assets/main/coffee-slider-1.png" alt="${p.name}" />
          </div>
          <h3 class="heading-3 product-name">${p.name}</h3>
          <p class="body-medium product-description">${p.description}</p>
          <p class="product-price">$${p.price}</p>
          <button class="add-to-cart-btn" data-id="${p.id}">Add to Cart</button>
        </div>
      `)
      .join('');
  } catch (error) {
    console.error('Failed to load menu data:', error);
  }
}
