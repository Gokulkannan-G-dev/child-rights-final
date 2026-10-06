import StatusBadge from "./StatusBadge.jsx";

export default function ReportCard({ report, onClick }) {
  return (
    <div className="info-card" onClick={onClick} style={{ cursor: onClick ? "pointer" : "default" }}>
      <p style={{ fontWeight: 600 }}>{report.refCode}</p>
      <p className="subtitle">{report.category} · {report.submittedAt}</p>
      <StatusBadge status={report.status} />
    </div>
  );
}
