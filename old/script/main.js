// Coffee Slider Functionality

let burger = document.querySelector('#burger')
let menu = document.querySelector('#menu')

let burgerDefault = document.querySelector(".burger-default")
let burgerActive = document.querySelector(".burger-active")


burger.addEventListener("click", () => {
  if (burgerDefault.style.display === 'block') {
    burgerActive.style.display = 'block'
    burgerDefault.style.display = 'none'
  } else {
    burgerActive.style.display = 'none'
    burgerDefault.style.display = 'block'
  }

  burger.classList.toggle("open");
  menu.classList.toggle("open");
  document.body.classList.toggle("no-scroll");

})







class CoffeeSlider {
  constructor() {
    this.currentSlide = 0;
    this.slides = document.querySelectorAll('.slide');
    this.dots = document.querySelectorAll('.dot');
    this.prevBtn = document.getElementById('prevBtn');
    this.nextBtn = document.getElementById('nextBtn');
    this.totalSlides = this.slides.length;

    this.init();
  }

  init() {
    // Add event listeners
    this.prevBtn.addEventListener('click', () => this.prevSlide());
    this.nextBtn.addEventListener('click', () => this.nextSlide());

    // Add dot click listeners
    this.dots.forEach((dot, index) => {
      dot.addEventListener('click', () => this.goToSlide(index));
    });

    // Auto-play slider (optional)
    this.autoPlay();

    // Update initial state
    this.updateSlider();
  }

  nextSlide() {
    this.currentSlide = (this.currentSlide + 1) % this.totalSlides;
    this.updateSlider();
  }

  prevSlide() {
    this.currentSlide = this.currentSlide === 0 ? this.totalSlides - 1 : this.currentSlide - 1;
    this.updateSlider();
  }

  goToSlide(slideIndex) {
    this.currentSlide = slideIndex;
    this.updateSlider();
  }

  updateSlider() {
    // Update slides
    this.slides.forEach((slide, index) => {
      slide.classList.remove('active', 'prev');

      if (index === this.currentSlide) {
        slide.classList.add('active');
      } else if (index < this.currentSlide) {
        slide.classList.add('prev');
      }
    });

    // Update dots
    this.dots.forEach((dot, index) => {
      dot.classList.toggle('active', index === this.currentSlide);
    });

    // Update button states (optional - disable when at edges)
    // this.prevBtn.disabled = this.currentSlide === 0;
    // this.nextBtn.disabled = this.currentSlide === this.totalSlides - 1;
  }

  autoPlay() {
    setInterval(() => {
      this.nextSlide();
    }, 5000); // Change slide every 5 seconds
  }
}

// Initialize slider when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new CoffeeSlider();
});

// Mobile Menu Functionality
class MobileMenu {
  constructor() {
    this.mobileMenuBtn = document.getElementById('mobileMenuBtn');
    this.navMenu = document.getElementById('navMenu');
    this.navLinks = document.querySelectorAll('.nav-link');

    this.init();
  }

  init() {
    if (this.mobileMenuBtn && this.navMenu) {
      this.mobileMenuBtn.addEventListener('click', () => this.toggleMenu());

      // Close menu when clicking on nav links
      this.navLinks.forEach(link => {
        link.addEventListener('click', () => this.closeMenu());
      });

      // Close menu when clicking outside
      document.addEventListener('click', (e) => {
        if (!this.mobileMenuBtn.contains(e.target) && !this.navMenu.contains(e.target)) {
          this.closeMenu();
        }
      });
    }
  }

  toggleMenu() {
    this.mobileMenuBtn.classList.toggle('active');
    this.navMenu.classList.toggle('active');
  }

  closeMenu() {
    this.mobileMenuBtn.classList.remove('active');
    this.navMenu.classList.remove('active');
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new MobileMenu();

  const navLinks = document.querySelectorAll('.nav-link[href^="#"]');

  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();

      const targetId = link.getAttribute('href');
      const targetSection = document.querySelector(targetId);

      if (targetSection) {
        targetSection.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
});

