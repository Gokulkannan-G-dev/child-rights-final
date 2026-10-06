import { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar.jsx";
import Loading from "../../components/Loading.jsx";
import { listResources, createResource, deleteResource } from "../../services/resourceService.js";

export default function ResourceManagement() {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState("");

  function load() {
    setLoading(true);
    listResources().then((data) => setResources(data?.resources || [])).catch(() => setResources([])).finally(() => setLoading(false));
  }

  useEffect(load, []);

  async function handleCreate(e) {
    e.preventDefault();
    if (!title.trim()) return;
    await createResource({ title }).catch(() => {});
    setTitle("");
    load();
  }

  async function handleDelete(id) {
    await deleteResource(id).catch(() => {});
    load();
  }

  return (
    <div className="app-shell">
      <Sidebar role="admin" />
      <div className="main-content">
        <h1>Resource management</h1>
        <form onSubmit={handleCreate} style={{ display: "flex", gap: 8, marginBottom: 16 }}>
          <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="New resource title" style={{ flex: 1 }} />
          <button className="signin-btn" style={{ width: "auto", marginTop: 0 }} type="submit">Add resource</button>
        </form>
        {loading ? <Loading /> : (
          <ul>
            {resources.map((r) => (
              <li key={r.id} style={{ marginBottom: 8, display: "flex", justifyContent: "space-between" }}>
                {r.title}
                <button className="register-btn" style={{ width: "auto", marginTop: 0 }} onClick={() => handleDelete(r.id)}>Delete</button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
