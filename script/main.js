// Coffee Slider Functionality
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
    }, 5000000); // Change slide every 5 seconds
  }
}

// Initialize slider when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new CoffeeSlider();
});

// Smooth scroll for navigation links
document.addEventListener('DOMContentLoaded', () => {
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