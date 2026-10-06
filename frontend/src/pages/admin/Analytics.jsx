import { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar.jsx";
import Loading from "../../components/Loading.jsx";
import { getCaseTrends } from "../../services/analyticsService.js";

export default function Analytics() {
  const [trends, setTrends] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCaseTrends().then((data) => setTrends(data?.trends || [])).catch(() => setTrends([])).finally(() => setLoading(false));
  }, []);

  return (
    <div className="app-shell">
      <Sidebar role="admin" />
      <div className="main-content">
        <h1>Analytics</h1>
        {loading ? <Loading /> : trends.length === 0 ? <p>No analytics data available yet.</p> : (
          <table style={{ width: "100%", borderCollapse: "collapse", background: "var(--color-surface)", borderRadius: 12 }}>
            <thead><tr><th style={{ textAlign: "left", padding: 10 }}>Date</th><th style={{ textAlign: "left", padding: 10 }}>New cases</th><th style={{ textAlign: "left", padding: 10 }}>Resolved</th></tr></thead>
            <tbody>
              {trends.map((t, i) => (
                <tr key={i} style={{ borderTop: "1px solid var(--color-border)" }}>
                  <td style={{ padding: 10 }}>{t.date}</td>
                  <td style={{ padding: 10 }}>{t.newCases}</td>
                  <td style={{ padding: 10 }}>{t.resolved}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
