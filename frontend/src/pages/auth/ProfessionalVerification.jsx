import { useState } from "react";
import * as authService from "../../services/authService.js";

export default function ProfessionalVerification() {
  const [organization, setOrganization] = useState("");
  const [role, setRole] = useState("");
  const [file, setFile] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    try {
      await authService.submitProfessionalVerification({ organization, role, fileName: file?.name });
      setSubmitted(true);
    } catch (err) {
      setError(err?.data?.message || "Couldn't submit your verification request.");
    }
  }

  if (submitted) {
    return (
      <div className="container">
        <div className="login-card">
          <h1>Verification submitted</h1>
          <p>An administrator will review your credentials and notify you by email.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="login-card">
        <h1>Professional verification</h1>
        <p className="subtitle">Submit your credentials for reviewer access</p>
        <form onSubmit={handleSubmit}>
          <label>Organization</label>
          <input value={organization} onChange={(e) => setOrganization(e.target.value)} required />

          <label>Role / title</label>
          <input value={role} onChange={(e) => setRole(e.target.value)} required />

          <label>Supporting document</label>
          <input type="file" onChange={(e) => setFile(e.target.files?.[0] || null)} />

          {error && <p style={{ color: "var(--color-danger)", fontSize: "0.85rem" }}>{error}</p>}
          <button className="signin-btn" type="submit">Submit for review</button>
        </form>
      </div>
    </div>
  );
}
