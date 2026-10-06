import { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar.jsx";
import Loading from "../../components/Loading.jsx";
import { apiRequest } from "../../services/api.js";

export default function VerificationRequests() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  function load() {
    setLoading(true);
    apiRequest("/admin/verification-requests", { auth: true })
      .then((data) => setRequests(data?.requests || []))
      .catch(() => setRequests([]))
      .finally(() => setLoading(false));
  }

  useEffect(load, []);

  async function decide(id, decision) {
    await apiRequest(`/admin/verification-requests/${id}`, { method: "PATCH", auth: true, body: { decision } }).catch(() => {});
    load();
  }

  return (
    <div className="app-shell">
      <Sidebar role="admin" />
      <div className="main-content">
        <h1>Professional verification requests</h1>
        {loading ? <Loading /> : requests.length === 0 ? <p>No pending requests.</p> : (
          <div className="card-grid">
            {requests.map((r) => (
              <div key={r.id} className="info-card">
                <p style={{ fontWeight: 600 }}>{r.name}</p>
                <p className="subtitle">{r.organization} · {r.role}</p>
                <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
                  <button className="signin-btn" style={{ width: "auto", marginTop: 0 }} onClick={() => decide(r.id, "approved")}>Approve</button>
                  <button className="register-btn" style={{ width: "auto", marginTop: 0 }} onClick={() => decide(r.id, "rejected")}>Reject</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
