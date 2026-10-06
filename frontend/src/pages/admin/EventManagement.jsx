import { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar.jsx";
import Loading from "../../components/Loading.jsx";
import { listEvents, createEvent, deleteEvent } from "../../services/eventService.js";

export default function EventManagement() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState("");

  function load() {
    setLoading(true);
    listEvents().then((data) => setEvents(data?.events || [])).catch(() => setEvents([])).finally(() => setLoading(false));
  }

  useEffect(load, []);

  async function handleCreate(e) {
    e.preventDefault();
    if (!title.trim()) return;
    await createEvent({ title }).catch(() => {});
    setTitle("");
    load();
  }

  async function handleDelete(id) {
    await deleteEvent(id).catch(() => {});
    load();
  }

  return (
    <div className="app-shell">
      <Sidebar role="admin" />
      <div className="main-content">
        <h1>Event management</h1>
        <form onSubmit={handleCreate} style={{ display: "flex", gap: 8, marginBottom: 16 }}>
          <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="New event title" style={{ flex: 1 }} />
          <button className="signin-btn" style={{ width: "auto", marginTop: 0 }} type="submit">Add event</button>
        </form>
        {loading ? <Loading /> : (
          <ul>
            {events.map((ev) => (
              <li key={ev.id} style={{ marginBottom: 8, display: "flex", justifyContent: "space-between" }}>
                {ev.title}
                <button className="register-btn" style={{ width: "auto", marginTop: 0 }} onClick={() => handleDelete(ev.id)}>Delete</button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
