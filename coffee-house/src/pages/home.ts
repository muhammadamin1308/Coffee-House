export function renderHome(): string {
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
          <a href="coffee.html" class="hero-menu-btn">
            <span class="text-action">Menu</span>
            <img src="assets/main/coffee-cup.svg" alt="" />
          </a>
        </div>
      </section>
      <section class="favorite-coffee" id="favorite-coffee">
        <div class="slider-container">
          <h2 class="heading-2 favorite-h2">
            Choose your <span class="heading-2 accent">favorite</span> coffee
          </h2>
          <div class="slider-wrapper">
            <button class="slider-btn prev-btn" id="prevBtn">
              <img src="assets/prev-btn.svg" alt="" />
            </button>

            <div class="slider">
              <div class="slide active">
                <div class="coffee-card">
                  <img
                    src="assets/main/coffee-slider-1.png"
                    alt="S'mores Frappuccino"
                    class="coffee-image"
                  />
                  <h3 class="heading-3 coffee-name">S'mores Frappuccino</h3>
                  <p class="body-medium coffee-description">
                    This new drink takes an espresso and mixes it with brown
                    sugar and cinnamon before being topped with oat milk.
                  </p>
                  <p class="coffee-price">$5.50</p>
                </div>
              </div>

              <div class="slide">
                <div class="coffee-card">
                  <img
                    src="assets/main/coffee-slider-2.png"
                    alt="Caramel Macchiato"
                    class="coffee-image"
                  />
                  <h3 class="heading-3 coffee-name">Caramel Macchiato</h3>
                  <p class="body-medium coffee-description">
                    Espresso shots are combined with vanilla syrup, steamed milk
                    and caramel drizzle.
                  </p>
                  <span class="coffee-price">$5.00</span>
                </div>
              </div>

              <div class="slide">
                <div class="coffee-card">
                  <img
                    src="assets/main/coffee-slider-3.png"
                    alt="Ice Coffee"
                    class="coffee-image"
                  />
                  <h3 class="heading-3 coffee-name">Ice Coffee</h3>
                  <p class="body-medium coffee-description">
                    A refreshing blend of our signature espresso roast served
                    over ice.
                  </p>
                  <span class="coffee-price">$4.50</span>
                </div>
              </div>
            </div>

            <button class="slider-btn next-btn" id="nextBtn">
              <img src="assets/next-btn.svg" alt="" />
            </button>
          </div>

          <div class="slider-dots">
            <span class="dot active" data-slide="0"></span>
            <span class="dot" data-slide="1"></span>
            <span class="dot" data-slide="2"></span>
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
                  src="assets/main/about-1.jpg"
                  alt="Coffee house interior"
                  class="gallery-img"
                />
              </div>
              <div class="gallery-item two">
                <img
                  src="assets/main/about-2.jpg"
                  alt="Happy customers"
                  class="gallery-img"
                />
              </div>
              <div class="gallery-item three">
                <img
                  src="assets/main/about-3.jpg"
                  alt="Coffee preparation"
                  class="gallery-img"
                />
              </div>
              <div class="gallery-item four">
                <img
                  src="assets/main/about-4.jpg"
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
                src="assets/main/mobile-screens.png"
                alt="Mobile app screens"
                class="mobile-screens"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  `;
}
