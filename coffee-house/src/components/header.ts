import { cartService } from "../services/cartService";

export function Header() {
  return `
    <header>
      <nav>
        <a href="#home">
          <img class="logo-img" src="/assets/logo.svg" alt="logo" />
        </a>
        <ul class="nav-menu">
          <li class="nav-item">
            <a href="#menu" class="nav-link text-action">Favorite coffee</a>
          </li>
          <li class="nav-item">
            <a href="#about" class="nav-link text-action">About</a>
          </li>
          <li class="nav-item">
            <a href="#mobile-app" class="nav-link text-action">Mobile app</a>
          </li>
          <li class="nav-item">
            <a href="#contact-us" class="nav-link text-action">Contact us</a>
          </li>
        </ul>
        <div class="header-actions">
          <a href="#cart" class="cart-link" id="cart-link">
            <div class="cart-icon-wrapper">
              <img src="/assets/main/shopping-bag.svg" alt="Cart" />
            </div>
            <span class="cart-count-text" id="cart-count-text">2</span>
          </a>
          <a href="#menu" class="menu-link">
            <span class="text-action">Menu</span>
            <img src="/assets/main/coffee-cup.svg" alt="Menu" />
          </a>
        </div>
        <div class="burger" id="burger">
          <img class="burger-default" src="/assets/burger-default.svg" alt="" style="display: block;" />
          <img class="burger-active close-burger" src="/assets/burger-active.svg" alt="" style="display: none;"/>
        </div>
      </nav>
      <div class="menu" id="menu">
        <a class="burger-link" href="#menu">Favorite coffee</a>
        <a class="burger-link" href="#about">About</a>
        <a class="burger-link" href="#mobile-app">Mobile app</a>
        <a class="burger-link" href="#contact-us">Contact us</a>
        <a href="#cart" class="burger-link" id="mobile-cart-link">
          <div class="cart-icon-wrapper">
            <img class="burger-coffee" src="/assets/main/shopping-bag.svg" alt="Cart" />
          </div>
          <span class="cart-count-text" id="mobile-cart-count-text">2</span>
        </a>
        <a href="#menu" class="burger-link">
          <span class="">Menu</span>
          <img class="burger-coffee" src="/assets/main/coffee-cup.svg" alt="" />
        </a>
      </div>
    </header>
  `;
}

export function initializeHeader(): void {
  updateCartDisplay();
  window.addEventListener("cartUpdated", updateCartDisplay);
}

function updateCartDisplay(): void {
  const isLoggedIn = !!localStorage.getItem("authToken");
  const itemCount = cartService.getItemCount();

  const cartLink = document.getElementById("cart-link");
  const mobileCartLink = document.getElementById("mobile-cart-link");
  const cartCountText = document.getElementById("cart-count-text");
  const mobileCartCountText = document.getElementById("mobile-cart-count-text");

  // Update visibility
  if (cartLink) {
    cartLink.style.display = isLoggedIn || itemCount > 0 ? "flex" : "none";
  }
  if (mobileCartLink) {
    mobileCartLink.style.display =
      isLoggedIn || itemCount > 0 ? "flex" : "none";
  }

  if (cartCountText) {
    cartCountText.textContent = itemCount.toString();
  }
  if (mobileCartCountText) {
    mobileCartCountText.textContent = itemCount.toString();
  }
}
