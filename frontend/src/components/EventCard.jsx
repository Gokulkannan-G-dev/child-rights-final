export default function EventCard({ event }) {
  return (
    <div className="info-card">
      <p style={{ fontWeight: 600 }}>{event.title}</p>
      <p className="subtitle">{event.date} · {event.location}</p>
      <p>{event.description}</p>
    </div>
  );
}
