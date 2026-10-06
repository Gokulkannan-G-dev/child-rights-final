import { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar.jsx";
import Loading from "../../components/Loading.jsx";
import { getDashboardSummary } from "../../services/analyticsService.js";

export default function AdminDashboard() {
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getDashboardSummary().then(setSummary).catch(() => setSummary(null)).finally(() => setLoading(false));
  }, []);

  return (
    <div className="app-shell">
      <Sidebar role="admin" />
      <div className="main-content">
        <h1>Admin dashboard</h1>
        {loading ? <Loading /> : (
          <div className="card-grid">
            <div className="info-card"><p className="subtitle">Total reports</p><h2>{summary?.totalReports ?? "—"}</h2></div>
            <div className="info-card"><p className="subtitle">Active users</p><h2>{summary?.activeUsers ?? "—"}</h2></div>
            <div className="info-card"><p className="subtitle">Pending verifications</p><h2>{summary?.pendingVerifications ?? "—"}</h2></div>
            <div className="info-card"><p className="subtitle">Escalated cases</p><h2>{summary?.escalatedCases ?? "—"}</h2></div>
          </div>
        )}
      </div>
    </div>
  );
}
