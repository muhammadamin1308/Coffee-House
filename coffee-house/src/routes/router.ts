import { renderHome } from "../pages/home";
import { renderMenu, loadMenuData } from "../pages/menu";

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

  switch (route) {
    case "#menu":
      await loadCSS("menu.css");
      content.innerHTML = renderMenu();
      await loadMenuData();
      break;

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
