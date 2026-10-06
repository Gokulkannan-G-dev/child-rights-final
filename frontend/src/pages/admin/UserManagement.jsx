import { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar.jsx";
import Loading from "../../components/Loading.jsx";
import { apiRequest } from "../../services/api.js";

export default function UserManagement() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiRequest("/admin/users", { auth: true })
      .then((data) => setUsers(data?.users || []))
      .catch(() => setUsers([]))
      .finally(() => setLoading(false));
  }, []);

  async function handleRoleChange(userId, role) {
    setUsers((prev) => prev.map((u) => (u.id === userId ? { ...u, role } : u)));
    await apiRequest(`/admin/users/${userId}`, { method: "PATCH", auth: true, body: { role } }).catch(() => {});
  }

  return (
    <div className="app-shell">
      <Sidebar role="admin" />
      <div className="main-content">
        <h1>User management</h1>
        {loading ? <Loading /> : (
          <table style={{ width: "100%", borderCollapse: "collapse", background: "var(--color-surface)", borderRadius: 12 }}>
            <thead>
              <tr><th style={{ textAlign: "left", padding: 10 }}>Name</th><th style={{ textAlign: "left", padding: 10 }}>Email</th><th style={{ textAlign: "left", padding: 10 }}>Role</th></tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.id} style={{ borderTop: "1px solid var(--color-border)" }}>
                  <td style={{ padding: 10 }}>{u.name}</td>
                  <td style={{ padding: 10 }}>{u.email}</td>
                  <td style={{ padding: 10 }}>
                    <select value={u.role} onChange={(e) => handleRoleChange(u.id, e.target.value)}>
                      <option value="reporter">reporter</option>
                      <option value="reviewer">reviewer</option>
                      <option value="admin">admin</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
