import { renderHome, initializeSlider } from "../pages/home";
import { renderMenu, loadMenuData } from "../pages/menu";
import { renderCart } from "../pages/cart";
import { renderLogin } from "../pages/auth/login";
import { renderRegister } from "../pages/auth/registration";
import { RegistrationManager } from "../utils/registration/registerManager";

import homeCSS from "../style/home.css?url";
import menuCSS from "../style/menu.css?url";
import registerCSS from "../style/register.css?url";

const cssMap: Record<string, string> = {
  "home.css": homeCSS,
  "menu.css": menuCSS,
  "register.css": registerCSS,
  "cart.css": menuCSS,
  "auth.css": registerCSS,
};

async function loadCSS(fileName: string): Promise<void> {
  document.querySelectorAll('link[data-page-style]').forEach(el => el.remove());

  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = cssMap[fileName] || homeCSS;
  link.setAttribute("data-page-style", "true");
  document.head.appendChild(link);
}

export async function renderRoute(route: string): Promise<void> {
  const content = document.getElementById("content");
  if (!content) return;

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
    case "register":
      await loadCSS("register.css");
      content.innerHTML = renderRegister();
      const registrationManager = new RegistrationManager();
      registrationManager.init();
      break;

    case "home":
    default:
      await loadCSS("home.css");
      content.innerHTML = renderHome();
      await initializeSlider();
      break;
  }
}

export function setupRouter(): void {
  window.addEventListener("hashchange", () => renderRoute(location.hash));
  renderRoute(location.hash);
}
