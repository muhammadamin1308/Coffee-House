export function renderSignup(): string {
  return `
    <main id="signup">
      <div class="container auth-container">
        <h2 class="heading-2">Sign Up</h2>
        <form class="signup-form">
          <input type="text" placeholder="Full Name" required />
          <input type="email" placeholder="Email" required />
          <input type="password" placeholder="Password" required />
          <input type="password" placeholder="Confirm Password" required />
          <button type="submit">Sign Up</button>
        </form>
      </div>
    </main>
  `;
}
