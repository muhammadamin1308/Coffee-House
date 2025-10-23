export function renderLogin(): string {
  return `
    <main id="login">
      <div class="container auth-container">
        <h2 class="heading-2">Login</h2>
        <form class="login-form">
          <input type="email" placeholder="Email" required />
          <input type="password" placeholder="Password" required />
          <button type="submit">Login</button>
        </form>
      </div>
    </main>
  `;
}
