export function renderRegister(): string {
  return `
    <main id="register">
      <section class="register-section">
        <div class="container">
          <h1 class="heading-2">Registration</h1>
          
          <form id="register-form" class="register-form" novalidate>
            <!-- Login Field -->
            <div class="form-group">
              <label for="login" class="form-label">Login</label>
              <div class="input-wrapper">
                <input
                  type="text"
                  id="login"
                  name="login"
                  class="form-input"
                  placeholder="Enter your login"
                  autocomplete="username"
                />
                <span class="error-icon" style="display: none;">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <circle cx="10" cy="10" r="8" stroke="#e53e3e" stroke-width="2"/>
                    <path d="M10 6v4M10 14h.01" stroke="#e53e3e" stroke-width="2" stroke-linecap="round"/>
                  </svg>
                </span>
              </div>
              <span class="error-message"></span>
            </div>

            <!-- Password Fields -->
            <div class="form-row">
              <div class="form-group">
                <label for="password" class="form-label">Password</label>
                <div class="input-wrapper">
                  <input
                    type="password"
                    id="password"
                    name="password"
                    class="form-input"
                    placeholder="Enter password"
                    autocomplete="new-password"
                  />
                  <span class="error-icon" style="display: none;">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <circle cx="10" cy="10" r="8" stroke="#e53e3e" stroke-width="2"/>
                      <path d="M10 6v4M10 14h.01" stroke="#e53e3e" stroke-width="2" stroke-linecap="round"/>
                    </svg>
                  </span>
                </div>
                <span class="error-message"></span>
              </div>

              <div class="form-group">
                <label for="confirmPassword" class="form-label">Confirm Password</label>
                <div class="input-wrapper">
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    class="form-input"
                    placeholder="Confirm password"
                    autocomplete="new-password"
                  />
                  <span class="error-icon" style="display: none;">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <circle cx="10" cy="10" r="8" stroke="#e53e3e" stroke-width="2"/>
                      <path d="M10 6v4M10 14h.01" stroke="#e53e3e" stroke-width="2" stroke-linecap="round"/>
                    </svg>
                  </span>
                </div>
                <span class="error-message"></span>
              </div>
            </div>

            <!-- Address Fields -->
            <div class="form-row">
              <div class="form-group">
                <label for="city" class="form-label">City</label>
                <div class="input-wrapper">
                  <select id="city" name="city" class="form-input form-select">
                    <option value="">Select city</option>
                  </select>
                  <span class="error-icon" style="display: none;">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <circle cx="10" cy="10" r="8" stroke="#e53e3e" stroke-width="2"/>
                      <path d="M10 6v4M10 14h.01" stroke="#e53e3e" stroke-width="2" stroke-linecap="round"/>
                    </svg>
                  </span>
                </div>
                <span class="error-message"></span>
              </div>

              <div class="form-group">
                <label for="street" class="form-label">Street</label>
                <div class="input-wrapper">
                  <select id="street" name="street" class="form-input form-select" disabled>
                    <option value="">Select street</option>
                  </select>
                  <span class="error-icon" style="display: none;">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <circle cx="10" cy="10" r="8" stroke="#e53e3e" stroke-width="2"/>
                      <path d="M10 6v4M10 14h.01" stroke="#e53e3e" stroke-width="2" stroke-linecap="round"/>
                    </svg>
                  </span>
                </div>
                <span class="error-message"></span>
              </div>

              <div class="form-group form-group-small">
                <label for="houseNumber" class="form-label">House number</label>
                <div class="input-wrapper">
                  <input
                    type="number"
                    id="houseNumber"
                    name="houseNumber"
                    class="form-input"
                    placeholder="123"
                    min="2"
                  />
                  <span class="error-icon" style="display: none;">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <circle cx="10" cy="10" r="8" stroke="#e53e3e" stroke-width="2"/>
                      <path d="M10 6v4M10 14h.01" stroke="#e53e3e" stroke-width="2" stroke-linecap="round"/>
                    </svg>
                  </span>
                </div>
                <span class="error-message"></span>
              </div>
            </div>

            <!-- Payment Method -->
            <div class="form-group">
              <label class="form-label">Pay by</label>
              <div class="radio-group">
                <label class="radio-label">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="cash"
                    checked
                  />
                  <span class="radio-custom"></span>
                  <span class="radio-text">Cash</span>
                </label>
                <label class="radio-label">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="card"
                  />
                  <span class="radio-custom"></span>
                  <span class="radio-text">Card</span>
                </label>
              </div>
            </div>

            <!-- Form Error Message -->
            <div id="form-error" class="form-error" style="display: none;"></div>

            <!-- Submit Button -->
            <button type="submit" class="btn-primary register-btn" disabled>
              Registration
            </button>
          </form>
        </div>
      </section>
    </main>
  `;
}