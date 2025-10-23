export function Header() {
  return `
    <header>
      <nav>
        <a href="index.html">
          <img class="logo-img" src="assets/logo.svg" alt="logo" />
        </a>
        <ul class="nav-menu">
          <li class="nav-item">
            <a href="index.html#favorite-coffee" class="nav-link text-action"
            >Favorite coffee</a
            >
          </li>
          <li class="nav-item">
            <a href="index.html#about" class="nav-link text-action">About</a>
          </li>
          <li class="nav-item">
            <a href="index.html#mobile-app" class="nav-link text-action"
            >Mobile app</a
            >
          </li>
          <li class="nav-item">
            <a href="index.html#conatct-us" class="nav-link text-action"
            >Contact us</a
            >
          </li>
        </ul>
        <a href="coffee.html" class="menu-link">
          <span class="text-action">Menu</span>
          <img src="assets/main/coffee-cup.svg" alt="" />
        </a>
        <div class="burger" id="burger">
          <img class="burger-default" src="assets/burger-default.svg" alt="" style="display: block;" />
          <img class="burger-active close-burger" src="assets/burger-active.svg" alt="" style="display: none;"/>
        </div>
      </nav>
      <div class="menu" id="menu">
        <a class="burger-link" href="coffee.html">Favorite coffee</a>
        <a class="burger-link" href="index.html#about">About</a>
        <a class="burger-link" href="index.html#mobile-app">Mobile app</a>
        <a class="burger-link" href="index.html#contact-us  ">Contact us</a>
        <a href="coffee.html" class= " burger-link">
          <span class="">Menu</span>
          <img class="burger-coffee" src="assets/main/coffee-cup.svg" alt="" />
        </a>
      </div>
    </header>
  `;
}