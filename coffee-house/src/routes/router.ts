import { renderHome } from "../pages/home";
import { renderMenu, loadMenuData } from "../pages/menu";
import { renderCart } from "../pages/cart";
import { renderLogin } from "../pages/auth/login";
import { renderSignup } from "../pages/auth/signup";

async function loadCSS(fileName: string): Promise<void> {
  // Remove previously loaded page-specific styles
  document.querySelectorAll('link[data-page-style]').forEach(el => el.remove());

  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = `./src/style/${fileName}`;
  link.setAttribute("data-page-style", "true");
  document.head.appendChild(link);
}

export async function renderRoute(route: string): Promise<void> {
  const content = document.getElementById("content");
  if (!content) return;

  // Normalize route: remove # prefix and handle empty string
  const normalizedRoute = route.startsWith("#") ? route.slice(1) : route;
  const page = normalizedRoute || "home";

  switch (page) {
    case "menu":
      await loadCSS("menu.css");
      content.innerHTML = renderMenu();
      await loadMenuData();
      break;

    case "cart":
      await loadCSS("cart.css");
      content.innerHTML = renderCart();
      break;

    case "login":
      await loadCSS("auth.css");
      content.innerHTML = renderLogin();
      break;

    case "signup":
      await loadCSS("auth.css");
      content.innerHTML = renderSignup();
      break;

    case "home":
    default:
      await loadCSS("home.css");
      content.innerHTML = renderHome();
      break;
  }
}

export function setupRouter(): void {
  window.addEventListener("hashchange", () => renderRoute(location.hash));
  renderRoute(location.hash);
}
