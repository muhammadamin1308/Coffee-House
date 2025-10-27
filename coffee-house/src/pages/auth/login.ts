export function renderLogin(): string {
  return `
    <main id="login">
      <div class="container auth-container">
        <h2 class="heading-2">Login</h2>
        <form id="login-form" class="login-form">
          <div class="form-group">
            <div class="input-wrapper">
              <input type="text" name="login" id="login" placeholder="Login" required />
              <span class="error-icon" style="display: none;">!</span>
            </div>
            <div class="error-message" style="display: none;"></div>
          </div>
          
          <div class="form-group">
            <div class="input-wrapper">
              <input type="password" name="password" id="password" placeholder="Password" required />
              <span class="error-icon" style="display: none;">!</span>
            </div>
            <div class="error-message" style="display: none;"></div>
          </div>
          
          <div id="form-error" class="form-error" style="display: none;"></div>
          
          <button type="submit" disabled>Sign In</button>
        </form>
      </div>
    </main>
  `;
}