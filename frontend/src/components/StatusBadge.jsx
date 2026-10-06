const STATUS_CLASS = {
  Pending: "badge badge-neutral",
  "Under Review": "badge badge-warning",
  Escalated: "badge badge-danger",
  Resolved: "badge badge-success",
  Closed: "badge badge-neutral"
};

export default function StatusBadge({ status }) {
  return <span className={STATUS_CLASS[status] || "badge badge-neutral"}>{status}</span>;
}
