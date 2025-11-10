import { productService } from "../services/productService";
import type { FavCoffee } from "../types";

export function renderHome(): string {
    const dots = Array.from(
    { length: 3},
    (_, i) =>
      `<span class="dot ${i === 0 ? "active" : ""}" data-slide="${i}"></span>`
  ).join("");
  return `
    <div id="home">
      <section class="hero">
        <div class="hero-content">
          <h1 class="heading-1">
            <span class="heading-1 accent">Enjoy</span> premium coffee at our
            charming cafe
          </h1>
          <p class="body-medium hero-desc">
            With its inviting atmosphere and delicious coffee options, the
            Coffee House Resource is a popular destination for coffee lovers and
            those seeking a warm and inviting space to enjoy their favorite
            beverage.
          </p>
          <a href="#menu" class="hero-menu-btn">
            <span class="text-action">Menu</span>
          </a>
        </div>
      </section>
      <section class="favorite-coffee" id="favorite-coffee">
        <div class="slider-container">
          <h2 class="heading-2 favorite-h2">
            Choose your <span class="heading-2 accent">favorite</span> coffee
          </h2>
          <div class="slider-wrapper" id="slider-wrapper">
            <div class="loader"></div>
          </div>
              <div class="slider-dots">
                ${dots}
              </div>
        </div>
      </section>
      <section class="about" id="about">
        <div class="container">
          <div class="about-content">
            <h2 class="heading-2 about-h2">
              Resource is
              <span class="heading-2 accent">the perfect and cozy place</span>
              where you can enjoy a variety of hot beverages, relax, catch up
              with friends, or get some work done.
            </h2>
            <div class="about-gallery">
              <div class="gallery-item one">
                <img
                  src="/assets/main/about-1.jpg"
                  alt="Coffee house interior"
                  class="gallery-img"
                />
              </div>
              <div class="gallery-item two">
                <img
                  src="/assets/main/about-2.jpg"
                  alt="Happy customers"
                  class="gallery-img"
                />
              </div>
              <div class="gallery-item three">
                <img
                  src="/assets/main/about-3.jpg"
                  alt="Coffee preparation"
                  class="gallery-img"
                />
              </div>
              <div class="gallery-item four">
                <img
                  src="/assets/main/about-4.jpg"
                  alt="Couple enjoying coffee"
                  class="gallery-img"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section class="mobile-app" id="mobile-app">
        <div class="container">
          <div class="mobile-app-content">
            <div class="mobile-app-text">
              <h2 class="mobile-app-title">
                <span class="heading-2 accent">Download</span> our apps to start
                ordering
              </h2>
              <p class="mobile-app-desc body-medium">
                Download the Resource app today and experience the comfort of
                ordering your favorite coffee from wherever you are
              </p>
              <div class="app-links">
                <a href="#" class="app-link app-btn app-store-btn">
                  <img
                    src="../assets/main/apple.png"
                    alt="Available on the App Store"
                  />
                  <div class="app-btn-text">
                    <span class="app-btn-label">Available on the</span>
                    <span class="app-btn-store">App Store</span>
                  </div>
                </a>
                <a href="#" class="app-link app-btn app-store-btn">
                  <img
                    src="/assets/main/play-market.png"
                    alt="Available on Google Play"
                  />
                  <div class="app-btn-text">
                    <span class="app-btn-label">Available on</span>
                    <span class="app-btn-store">Google Play</span>
                  </div>
                </a>
              </div>
            </div>
            <div class="mobile-app-images">
              <img
                src="/assets/main/mobile-screens.png"
                alt="mobile app screens"
                class="mobile-img"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  `;
}

function renderSliderControls() {
  return `
    <button class="slider-btn prev-btn" id="prevBtn">
      <img src="/assets/prev-btn.svg" alt="Previous" />
    </button>
    <div class="slider" id="slider"></div>
    <button class="slider-btn next-btn" id="nextBtn">
      <img src="/assets/next-btn.svg" alt="Next" />
    </button>
  `;
}

function renderSlides(products: FavCoffee[]) {
  const slider = document.getElementById("slider");
  if (!slider) return;

  slider.innerHTML = products
    .map(
      (p, index) => `
    <div class="slide ${index === 0 ? "active" : ""}" data-index="${index}">
      <div class="coffee-card">
        <img
          src="/assets/coffee/${p.id}.jpg"
          alt="${p.name}"
          class="coffee-image"
        />
        <h3 class="heading-3 coffee-name">${p.name}</h3>
        <p class="body-medium coffee-description">${p.description}</p>
        <p class="coffee-price">$${p.price}</p>
      </div>
    </div>
  `
    )
    .join("");
}

class CoffeeSlider {
  private currentSlide: number = 0;
  private slides: NodeListOf<HTMLElement>;
  private dots: NodeListOf<HTMLElement>;
  private prevBtn: HTMLElement | null;
  private nextBtn: HTMLElement | null;
  private totalSlides: number;
  private autoPlayInterval: number | null = null;

  constructor() {
    this.slides = document.querySelectorAll(
      ".slide"
    ) as NodeListOf<HTMLElement>;
    this.dots = document.querySelectorAll(".dot") as NodeListOf<HTMLElement>;
    this.prevBtn = document.getElementById("prevBtn");
    this.nextBtn = document.getElementById("nextBtn");
    this.totalSlides = this.slides.length;

    this.init();
  }

  private init(): void {
    this.prevBtn?.addEventListener("click", () => this.prevSlide());
    this.nextBtn?.addEventListener("click", () => this.nextSlide());

    this.dots.forEach((dot, index) => {
      dot.addEventListener("click", () => this.goToSlide(index));
    });

    this.autoPlay();

    this.updateSlider();
  }

  private nextSlide(): void {
    this.currentSlide = (this.currentSlide + 1) % this.totalSlides;
    this.updateSlider();
  }

  private prevSlide(): void {
    this.currentSlide =
      this.currentSlide === 0 ? this.totalSlides - 1 : this.currentSlide - 1;
    this.updateSlider();
  }

  private goToSlide(slideIndex: number): void {
    this.currentSlide = slideIndex;
    this.updateSlider();
  }

  private updateSlider(): void {
    this.slides.forEach((slide, index) => {
      slide.classList.remove("active", "prev");

      if (index === this.currentSlide) {
        slide.classList.add("active");
      } else if (index < this.currentSlide) {
        slide.classList.add("prev");
      }
    });

    this.dots.forEach((dot, index) => {
      dot.classList.toggle("active", index === this.currentSlide);
    });
  }

  private autoPlay(): void {
    this.autoPlayInterval = window.setInterval(() => {
      this.nextSlide();
    }, 5000);
  }

  public destroy(): void {
    if (this.autoPlayInterval) {
      clearInterval(this.autoPlayInterval);
    }
  }
}

export async function initializeSlider() {
  const sliderWrapper = document.getElementById("slider-wrapper");
  if (!sliderWrapper) return;

  try {
    const favoriteProducts = await productService.loadFavoriteProducts();
    sliderWrapper.innerHTML = renderSliderControls();
    renderSlides(favoriteProducts);

    new CoffeeSlider();
  } catch (error) {
    sliderWrapper.innerHTML = `<p class="error-message">Something went wrong. Please, refresh the page</p>`;
  }
}
