import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import * as authService from "../../services/authService.js";
import { validateRegisterForm } from "../../utils/validation.js";

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState(null);

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const validation = validateRegisterForm(form);
    setErrors(validation);
    if (Object.keys(validation).length > 0) return;

    setSubmitting(true);
    setServerError(null);
    try {
      await authService.register(form);
      navigate("/verify-account");
    } catch (err) {
      setServerError(err?.data?.message || "Couldn't create your account. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="container">
      <div className="login-card">
        <h1>Register as a community member</h1>
        <form onSubmit={handleSubmit}>
          <label>Full name</label>
          <input value={form.name} onChange={(e) => update("name", e.target.value)} />
          {errors.name && <p style={{ color: "var(--color-danger)", fontSize: "0.8rem" }}>{errors.name}</p>}

          <label>Email</label>
          <input type="email" value={form.email} onChange={(e) => update("email", e.target.value)} />
          {errors.email && <p style={{ color: "var(--color-danger)", fontSize: "0.8rem" }}>{errors.email}</p>}

          <label>Password</label>
          <input type="password" value={form.password} onChange={(e) => update("password", e.target.value)} />
          {errors.password && <p style={{ color: "var(--color-danger)", fontSize: "0.8rem" }}>{errors.password}</p>}

          {serverError && <p style={{ color: "var(--color-danger)", fontSize: "0.85rem" }}>{serverError}</p>}

          <button className="signin-btn" type="submit" disabled={submitting}>
            {submitting ? "Creating account…" : "Create account"}
          </button>
        </form>
        <p style={{ marginTop: 16, fontSize: "0.85rem", textAlign: "center" }}>
          Already have an account? <Link to="/login">Sign in</Link>
        </p>
      </div>
    </div>
  );
}
