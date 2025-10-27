import { Header } from "./components/header";
import { Footer } from "./components/footer";
import { setupRouter } from "./routes/router";
import "./style/global.css";
import "./style/login.css";
import "./style/register.css";

const app = document.getElementById("app");

if (!app) {
  throw new Error("Could not find #app element");
}

app.innerHTML = `
  ${Header()}
  <main id="content"></main>
  ${Footer()}
`;

setupRouter();
