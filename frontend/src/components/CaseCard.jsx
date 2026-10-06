import StatusBadge from "./StatusBadge.jsx";

export default function CaseCard({ caseItem, onClick }) {
  return (
    <div className="info-card" onClick={onClick} style={{ cursor: "pointer" }}>
      <p style={{ fontWeight: 600 }}>Case {caseItem.refCode}</p>
      <p className="subtitle">{caseItem.category} · {caseItem.location || "No location"}</p>
      <StatusBadge status={caseItem.status} />
    </div>
  );
}
