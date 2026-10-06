import { useState } from "react";
import Sidebar from "../../components/Sidebar.jsx";
import { apiRequest } from "../../services/api.js";

export default function ReportsExport() {
  const [range, setRange] = useState("30d");
  const [exporting, setExporting] = useState(false);
  const [error, setError] = useState(null);

  async function handleExport() {
    setExporting(true);
    setError(null);
    try {
      const data = await apiRequest(`/admin/reports-export?range=${range}`, { auth: true });
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `reports-export-${range}.json`;
      link.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      setError(err?.data?.message || "Couldn't export reports right now.");
    } finally {
      setExporting(false);
    }
  }

  return (
    <div className="app-shell">
      <Sidebar role="admin" />
      <div className="main-content">
        <h1>Export reports</h1>
        <div className="info-card" style={{ maxWidth: 400 }}>
          <label>Date range</label>
          <select value={range} onChange={(e) => setRange(e.target.value)}>
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
          </select>
          {error && <p style={{ color: "var(--color-danger)", fontSize: "0.85rem" }}>{error}</p>}
          <button className="signin-btn" onClick={handleExport} disabled={exporting}>
            {exporting ? "Exporting…" : "Export as JSON"}
          </button>
        </div>
      </div>
    </div>
  );
}
