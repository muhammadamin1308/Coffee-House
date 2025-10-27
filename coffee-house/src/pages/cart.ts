import { cartService } from "../services/cartService";
import { OrderService } from "../services/orderService";
import type { CartItem } from "../types";

let isOrderProcessing = false;

export function renderCart(): string {
  return `
    <main id="cart">
      <div class="container cart-container">
        <h2 class="heading-2">Shopping Cart</h2>
        <div id="cart-notification" class="cart-notification"></div>
        <div id="cart-content" class="cart-content">
          ${renderCartContent()}
        </div>
      </div>
    </main>
  `;
}

function renderCartContent(): string {
  const cart = cartService.getCart();
  const isLoggedIn = !!localStorage.getItem("authToken");
  const userDataString = localStorage.getItem("user");
  
  let userData = null;
  if (userDataString) {
    try {
      // Parse the user data - it might be double-stringified
      userData = JSON.parse(userDataString);
      if (typeof userData === "string") {
        userData = JSON.parse(userData);
      }
    } catch (e) {
      console.error("Failed to parse user data:", e);
    }
  }

  if (cart.length === 0) {
    return `
      <div class="empty-cart">
        <img src="assets/main/coffee-cup.svg" alt="Empty cart" class="empty-cart-icon" />
        <h3>Your cart is empty</h3>
        <p>Add some delicious items to get started!</p>
        <a href="#menu" class="btn-primary">Browse Menu</a>
      </div>
    `;
  }

  const { total, discountTotal } = cartService.getTotal();

  return `
    <div class="cart-items-list">
      ${cart.map((item: CartItem, index: number) => renderCartItem(item, index, isLoggedIn)).join("")}
    </div>
    
    <div class="cart-summary">
      <div class="cart-total">
        <span class="total-label">Total:</span>
        <div class="total-prices">
          ${
            discountTotal !== null && discountTotal < total
              ? `
            <span class="original-total">$${total.toFixed(2)}</span>
            <span class="discount-total">$${discountTotal.toFixed(2)}</span>
          `
              : `<span class="final-total">$${total.toFixed(2)}</span>`
          }
        </div>
      </div>
      
      ${
        isLoggedIn
          ? `
        <div class="delivery-info">
          <h3>Delivery Address</h3>
          <p class="address-text">
            ${userData?.city || "City"}, ${userData?.street || "Street"}, ${userData?.houseNumber || "N/A"}
          </p>
        </div>
        <button class="btn-primary btn-confirm" id="confirm-order-btn" ${isOrderProcessing ? "disabled" : ""}>
          ${isOrderProcessing ? '<span class="btn-loader"></span>' : "Confirm Order"}
        </button>
      `
          : `
        <div class="auth-prompt">
          <p>Please sign in to complete your order</p>
          <div class="auth-buttons">
            <a href="#login" class="btn-secondary">Sign In</a>
            <a href="#registration" class="btn-primary">Register</a>
          </div>
        </div>
      `
      }
    </div>
  `;
}

function renderCartItem(item: CartItem, index: number, isLoggedIn: boolean): string {
  const itemPrice = item.discountPrice !== null ? item.discountPrice : item.price;
  const itemTotal = itemPrice * item.quantity;
  const hasDiscount = item.discountPrice !== null && item.discountPrice < item.price;

  return `
    <div class="cart-item" data-index="${index}">
      <div class="cart-item-image">
        <img src="${item.image}" alt="${item.name}" onerror="this.src='assets/coffee/coffee/1.jpg'" />
      </div>
      
      <div class="cart-item-details">
        <h3 class="cart-item-name">${item.name}</h3>
        <div class="cart-item-specs">
          <span class="item-size">Size: ${item.size.toUpperCase()}</span>
          ${
            item.additives.length > 0
              ? `<span class="item-additives">Extras: ${item.additives.join(", ")}</span>`
              : ""
          }
        </div>
      </div>
      
      <div class="cart-item-quantity">
        <button class="qty-btn qty-decrease" data-index="${index}">−</button>
        <span class="qty-value">${item.quantity}</span>
        <button class="qty-btn qty-increase" data-index="${index}">+</button>
      </div>
      
      <div class="cart-item-price">
        ${
          hasDiscount && isLoggedIn
            ? `
          <span class="price-original">$${(item.price * item.quantity).toFixed(2)}</span>
          <span class="price-discount">$${itemTotal.toFixed(2)}</span>
        `
            : `<span class="price-final">$${itemTotal.toFixed(2)}</span>`
        }
      </div>
      
      <button class="cart-item-remove" data-index="${index}" title="Remove item">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M16 4L4 16M4 4L16 16" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        </svg>
      </button>
    </div>
  `;
}

export function initializeCart(): void {
  setupCartEventListeners();
  
  // Listen for cart updates to re-render
  window.addEventListener("cartUpdated", () => {
    updateCartContent();
  });
}

function setupCartEventListeners(): void {
  const cartContent = document.getElementById("cart-content");
  
  if (!cartContent) return;

  // Event delegation for cart item actions
  cartContent.addEventListener("click", (e) => {
    const target = e.target as HTMLElement;
    
    // Remove item
    const removeBtn = target.closest(".cart-item-remove");
    if (removeBtn) {
      const index = parseInt(removeBtn.getAttribute("data-index") || "0");
      cartService.removeItem(index);
      return;
    }
    
    // Decrease quantity
    const decreaseBtn = target.closest(".qty-decrease");
    if (decreaseBtn) {
      const index = parseInt(decreaseBtn.getAttribute("data-index") || "0");
      const cart = cartService.getCart();
      if (cart[index]) {
        cartService.updateQuantity(index, cart[index].quantity - 1);
      }
      return;
    }
    
    // Increase quantity
    const increaseBtn = target.closest(".qty-increase");
    if (increaseBtn) {
      const index = parseInt(increaseBtn.getAttribute("data-index") || "0");
      const cart = cartService.getCart();
      if (cart[index]) {
        cartService.updateQuantity(index, cart[index].quantity + 1);
      }
      return;
    }
  });

  // Confirm order button
  const confirmBtn = document.getElementById("confirm-order-btn");
  if (confirmBtn) {
    confirmBtn.addEventListener("click", handleConfirmOrder);
  }
}

async function handleConfirmOrder(): Promise<void> {
  if (isOrderProcessing) return;

  const cart = cartService.getCart();
  if (cart.length === 0) {
    showNotification("Your cart is empty", "error");
    return;
  }

  const { discountTotal, total } = cartService.getTotal();
  const finalTotal = discountTotal !== null ? discountTotal : total;

  isOrderProcessing = true;
  updateCartContent();

  try {
    await OrderService.confirmOrder(cart, finalTotal);
    
    // Clear cart
    cartService.clearCart();
    
    // Show success message
    showNotification(
      "Thank you for your order! Our manager will contact you shortly.",
      "success"
    );
    
    // Update content after clearing cart
    setTimeout(() => {
      updateCartContent();
    }, 3000);
    
  } catch (error) {
    console.error("Order failed:", error);
    showNotification("Something went wrong. Please, try again", "error");
  } finally {
    isOrderProcessing = false;
    updateCartContent();
  }
}

function updateCartContent(): void {
  const cartContent = document.getElementById("cart-content");
  if (cartContent) {
    cartContent.innerHTML = renderCartContent();
    setupCartEventListeners();
  }
}

function showNotification(message: string, type: "success" | "error"): void {
  const notification = document.getElementById("cart-notification");
  if (!notification) return;

  notification.className = `cart-notification ${type} show`;
  notification.textContent = message;

  setTimeout(() => {
    notification.classList.remove("show");
  }, type === "success" ? 5000 : 3000);
}

