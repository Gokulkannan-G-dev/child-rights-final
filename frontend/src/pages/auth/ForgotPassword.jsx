import { useState } from "react";
import * as authService from "../../services/authService.js";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [error, setError] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await authService.forgotPassword(email);
      setSent(true);
    } catch (err) {
      setError(err?.data?.message || "Couldn't send a reset link. Please try again.");
    }
  }

  return (
    <div className="container">
      <div className="login-card">
        <h1>Reset your password</h1>
        {sent ? (
          <p>If an account exists for that email, a reset link has been sent.</p>
        ) : (
          <form onSubmit={handleSubmit}>
            <label>Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            {error && <p style={{ color: "var(--color-danger)", fontSize: "0.85rem" }}>{error}</p>}
            <button className="signin-btn" type="submit">Send reset link</button>
          </form>
        )}
      </div>
    </div>
  );
}
