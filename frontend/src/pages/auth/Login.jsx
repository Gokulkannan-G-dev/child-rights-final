import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth.js";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSignIn(e) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      const result = await login(email, password);
      if (result?.user?.role === "admin") navigate("/admin");
      else if (result?.user?.role === "reviewer") navigate("/reviewer");
      else navigate("/");
    } catch (err) {
      setError(err?.data?.message || "Invalid email or password.");
    } finally {
      setSubmitting(false);
    }
  }

  function continueAnonymously() {
    navigate("/report");
  }

  return (
    <div className="container">
      <div className="login-card">
        <h1>Welcome</h1>
        <p className="subtitle">Report a concern or sign in</p>

        <form onSubmit={handleSignIn}>
          <label>Phone or Email</label>
          <input type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required />

          <label>Password</label>
          <input type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} required />

          {error && <p style={{ color: "var(--color-danger)", fontSize: "0.85rem" }}>{error}</p>}

          <button className="signin-btn" type="submit" disabled={submitting}>
            {submitting ? "Signing in…" : "Sign In"}
          </button>
        </form>

        <Link to="/register"><button className="register-btn">Register as community member</button></Link>
        <hr />

        <div className="verified-card">
          <div className="checkbox-area">
            <input type="checkbox" id="verified" />
            <div>
              <h3>Verified Professional?</h3>
              <p>Submit credentials for reviewer access</p>
            </div>
          </div>
          <Link to="/professional-verification" style={{ fontSize: "0.85rem" }}>Continue to verification</Link>
        </div>

        <button className="anonymous-btn" onClick={continueAnonymously}>Continue anonymously</button>

        <p style={{ marginTop: 16, fontSize: "0.85rem", textAlign: "center" }}>
          <Link to="/forgot-password">Forgot password?</Link>
        </p>
      </div>
    </div>
  );
}
