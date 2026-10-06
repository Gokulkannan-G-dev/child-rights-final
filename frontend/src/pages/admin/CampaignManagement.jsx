import { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar.jsx";
import Loading from "../../components/Loading.jsx";
import { listCampaigns, createCampaign, deleteCampaign } from "../../services/campaignService.js";

export default function CampaignManagement() {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState("");

  function load() {
    setLoading(true);
    listCampaigns().then((data) => setCampaigns(data?.campaigns || [])).catch(() => setCampaigns([])).finally(() => setLoading(false));
  }

  useEffect(load, []);

  async function handleCreate(e) {
    e.preventDefault();
    if (!title.trim()) return;
    await createCampaign({ title }).catch(() => {});
    setTitle("");
    load();
  }

  async function handleDelete(id) {
    await deleteCampaign(id).catch(() => {});
    load();
  }

  return (
    <div className="app-shell">
      <Sidebar role="admin" />
      <div className="main-content">
        <h1>Campaign management</h1>
        <form onSubmit={handleCreate} style={{ display: "flex", gap: 8, marginBottom: 16 }}>
          <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="New campaign title" style={{ flex: 1 }} />
          <button className="signin-btn" style={{ width: "auto", marginTop: 0 }} type="submit">Add campaign</button>
        </form>
        {loading ? <Loading /> : (
          <ul>
            {campaigns.map((c) => (
              <li key={c.id} style={{ marginBottom: 8, display: "flex", justifyContent: "space-between" }}>
                {c.title}
                <button className="register-btn" style={{ width: "auto", marginTop: 0 }} onClick={() => handleDelete(c.id)}>Delete</button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
