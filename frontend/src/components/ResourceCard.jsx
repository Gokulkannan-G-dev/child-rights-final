export default function ResourceCard({ resource }) {
  return (
    <div className="info-card">
      <p style={{ fontWeight: 600 }}>{resource.title}</p>
      <p className="subtitle">{resource.category} · {resource.region}</p>
      <p>{resource.description}</p>
    </div>
  );
}
