import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as authService from "../../services/authService.js";

export default function VerifyAccount() {
  const navigate = useNavigate();
  const [code, setCode] = useState("");
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      await authService.verifyAccount(code);
      navigate("/login");
    } catch (err) {
      setError(err?.data?.message || "That code didn't work. Please check and try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="container">
      <div className="login-card">
        <h1>Verify your account</h1>
        <p className="subtitle">Enter the code we sent to your email</p>
        <form onSubmit={handleSubmit}>
          <label>Verification code</label>
          <input value={code} onChange={(e) => setCode(e.target.value)} required />
          {error && <p style={{ color: "var(--color-danger)", fontSize: "0.85rem" }}>{error}</p>}
          <button className="signin-btn" type="submit" disabled={submitting}>
            {submitting ? "Verifying…" : "Verify"}
          </button>
        </form>
      </div>
    </div>
  );
}
