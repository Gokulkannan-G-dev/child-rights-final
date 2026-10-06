import { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar.jsx";
import Loading from "../../components/Loading.jsx";
import { listArticles, createArticle, deleteArticle } from "../../services/contentService.js";

export default function ContentManagement() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState("");

  function load() {
    setLoading(true);
    listArticles().then((data) => setArticles(data?.articles || [])).catch(() => setArticles([])).finally(() => setLoading(false));
  }

  useEffect(load, []);

  async function handleCreate(e) {
    e.preventDefault();
    if (!title.trim()) return;
    await createArticle({ title, type: "Article" }).catch(() => {});
    setTitle("");
    load();
  }

  async function handleDelete(id) {
    await deleteArticle(id).catch(() => {});
    load();
  }

  return (
    <div className="app-shell">
      <Sidebar role="admin" />
      <div className="main-content">
        <h1>Content management</h1>
        <form onSubmit={handleCreate} style={{ display: "flex", gap: 8, marginBottom: 16 }}>
          <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="New article title" style={{ flex: 1 }} />
          <button className="signin-btn" style={{ width: "auto", marginTop: 0 }} type="submit">Add article</button>
        </form>
        {loading ? <Loading /> : (
          <ul>
            {articles.map((a) => (
              <li key={a.id} style={{ marginBottom: 8, display: "flex", justifyContent: "space-between" }}>
                {a.title}
                <button className="register-btn" style={{ width: "auto", marginTop: 0 }} onClick={() => handleDelete(a.id)}>Delete</button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
