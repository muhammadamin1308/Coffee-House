import { cartService } from "../services/cartService";
import { OrderService } from "../services/orderService";
import type { CartItem } from "../types";

let isOrderProcessing = false;

export function renderCart(): string {
  return `
    <main id="cart">
      <div class="cart-page-container">
        <h2 class="cart-heading">Cart</h2>
        <div id="cart-notification" class="cart-notification"></div>
        <div id="cart-content" class="cart-content-wrapper">
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
    // Empty cart state
    const { total } = cartService.getTotal();
    
    return `
      <div class="empty-cart-layout">
        ${isLoggedIn ? `
          <div class="cart-summary-info">
            <div class="info-row">
              <span class="info-label">Total:</span>
              <span class="info-value">$${total.toFixed(2)}</span>
            </div>
            <div class="info-row">
              <span class="info-label">Address:</span>
              <span class="info-value">${userData?.city || "City"}, ${userData?.street || "Street"}, ${userData?.houseNumber || ""}</span>
            </div>
            <div class="info-row">
              <span class="info-label">Pay by:</span>
              <span class="info-value">${userData?.paymentMethod || "Card"}</span>
            </div>
          </div>
        ` : `
          <div class="cart-total-simple">
            <span class="total-label">Total:</span>
            <span class="total-value">$${total.toFixed(2)}</span>
          </div>
          <div class="auth-buttons-container">
            <a href="#login" class="btn-auth btn-signin">Sign In</a>
            <a href="#registration" class="btn-auth btn-registration">Registration</a>
          </div>
        `}
      </div>
    `;
  }

  const { total, discountTotal } = cartService.getTotal();
  const displayTotal = discountTotal !== null ? discountTotal : total;

  return `
    <div class="cart-items-container">
      ${cart.map((item: CartItem, index: number) => renderCartItem(item, index, isLoggedIn)).join("")}
      
      <div class="cart-summary-section">
        ${isLoggedIn ? `
          <div class="cart-summary-info">
            <div class="info-row">
              <span class="info-label">Total:</span>
              <div class="info-value">
                ${discountTotal !== null && discountTotal < total ? `
                  <span class="price-original-total">$${total.toFixed(2)}</span>
                  <span class="price-discount-total">$${discountTotal.toFixed(2)}</span>
                ` : `
                  <span class="price-final-total">$${total.toFixed(2)}</span>
                `}
              </div>
            </div>
            <div class="info-row">
              <span class="info-label">Address:</span>
              <span class="info-value">${userData?.city || "City"}, ${userData?.street || "Street"}, ${userData?.houseNumber || ""}</span>
            </div>
            <div class="info-row">
              <span class="info-label">Pay by:</span>
              <span class="info-value">${userData?.paymentMethod || "Card"}</span>
            </div>
          </div>
          <button class="btn-confirm-order" id="confirm-order-btn" ${isOrderProcessing ? "disabled" : ""}>
            ${isOrderProcessing ? '<span class="btn-loader"></span>' : "Confirm"}
          </button>
        ` : `
          <div class="cart-total-simple">
            <span class="total-label">Total:</span>
            <span class="total-value">$${displayTotal.toFixed(2)}</span>
          </div>
          <div class="auth-buttons-container">
            <a href="#login" class="btn-auth btn-signin">Sign In</a>
            <a href="#registration" class="btn-auth btn-registration">Registration</a>
          </div>
        `}
      </div>
    </div>
  `;
}

function renderCartItem(item: CartItem, index: number, isLoggedIn: boolean): string {
  const itemPrice = item.discountPrice !== null && isLoggedIn ? item.discountPrice : item.price;
  const itemTotal = itemPrice * item.quantity;
  const hasDiscount = isLoggedIn && item.discountPrice !== null && item.discountPrice < item.price;
  const originalTotal = item.price * item.quantity;

  return `
    <div class="cart-item-row">
      <button class="item-checkbox" data-index="${index}">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <rect x="0.5" y="0.5" width="15" height="15" rx="3" stroke="currentColor"/>
        </svg>
      </button>
      
      <div class="item-image-wrapper">
        <img src="${item.image}" alt="${item.name}" onerror="this.src='assets/coffee/coffee/1.jpg'" />
      </div>
      
      <div class="item-info">
        <h3 class="item-name">${item.name}</h3>
        <p class="item-details">${item.size}, ${item.additives.join(", ") || "No extras"}</p>
      </div>
      
      <div class="item-price">
        ${hasDiscount ? `
          <span class="price-crossed">$${originalTotal.toFixed(2)}</span>
          <span class="price-discounted">$${itemTotal.toFixed(2)}</span>
        ` : `
          <span class="price-regular">$${itemTotal.toFixed(2)}</span>
        `}
      </div>
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

