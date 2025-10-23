export function Footer() {
  return `
        <footer class="footer" id="contact">
      <div class="container">
        <div class="footer-content">
          <div class="footer-text">
            <h3 class="footer-title">
              Sip, Savor, Smile.<br /><span class="accent-text"
                >It's coffee time!</span
              >
            </h3>
            <div class="social-links">
              <a href="#" class="social-link">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </a>
              <a href="#" class="social-link">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <rect
                    x="2"
                    y="2"
                    width="20"
                    height="20"
                    rx="5"
                    ry="5"
                    stroke="currentColor"
                    stroke-width="2"
                  />
                  <path
                    d="m16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"
                    stroke="currentColor"
                    stroke-width="2"
                  />
                  <line
                    x1="17.5"
                    y1="6.5"
                    x2="17.51"
                    y2="6.5"
                    stroke="currentColor"
                    stroke-width="2"
                  />
                </svg>
              </a>
              <a href="#" class="social-link">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"
                    stroke="currentColor"
                    stroke-width="2"
                  />
                </svg>
              </a>
            </div>
          </div>
          <div class="footer-contact">
            <div class="contact-section">
              <h3 class="heading-3">Contact us</h3>
              <div class="contact-info">
                <div class="contact-item">
                  <img src="assets/main/pin-alt.png" alt="" />
                  <span>8558 Green Rd., LA</span>
                </div>
                <div class="contact-item">
                  <img src="assets/main/phone.png" alt="" />
                  <a href="tel:+16035550123" class="contact-link"
                    >+1 (603) 555-0123</a
                  >
                </div>
                <div class="contact-item">
                  <img src="assets/main/clock.png" alt="" />
                  <span>Mon-Sat: 9:00 AM – 23:00 PM</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  `;
}