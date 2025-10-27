export function Header() {
  return `
    <header>
      <nav>
        <a href="#home">
          <img class="logo-img" src="assets/logo.svg" alt="logo" />
        </a>
        <ul class="nav-menu">
          <li class="nav-item">
            <a href="#menu" class="nav-link text-action">Menu</a>
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
          <li class="nav-item">
            <a href="#register" class="nav-link text-action">Register</a>
          </li>
        </ul>
        <a href="#cart" class="menu-link">
          <span class="text-action">Cart</span>
          <img src="assets/main/coffee-cup.svg" alt="" />
        </a>
        <div class="burger" id="burger">
          <img class="burger-default" src="assets/burger-default.svg" alt="" style="display: block;" />
          <img class="burger-active close-burger" src="assets/burger-active.svg" alt="" style="display: none;"/>
        </div>
      </nav>
      <div class="menu" id="menu">
        <a class="burger-link" href="#menu">Menu</a>
        <a class="burger-link" href="#about">About</a>
        <a class="burger-link" href="#mobile-app">Mobile app</a>
        <a class="burger-link" href="#contact-us">Contact us</a>
        <a class="burger-link" href="#register">Register</a>
        <a href="#cart" class="burger-link">
          <span class="">Cart</span>
          <img class="burger-coffee" src="assets/main/coffee-cup.svg" alt="" />
        </a>
      </div>
    </header>
  `;
}