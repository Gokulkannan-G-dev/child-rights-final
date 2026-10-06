import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth.js";

const NAV_ITEMS = {
  reviewer: [
    { to: "/reviewer", label: "Dashboard", icon: "\uD83D\uDCCA" },
    { to: "/reviewer/queue", label: "Case Queue", icon: "\uD83D\uDCCB" }
  ],
  admin: [
    { to: "/admin", label: "Dashboard", icon: "\uD83D\uDCCA" },
    { to: "/admin/users", label: "Users", icon: "\uD83D\uDC65" },
    { to: "/admin/verification-requests", label: "Verifications", icon: "\u2705" },
    { to: "/admin/content", label: "Content", icon: "\uD83D\uDCDD" },
    { to: "/admin/resources", label: "Resources", icon: "\uD83D\uDCDA" },
    { to: "/admin/events", label: "Events", icon: "\uD83D\uDCC5" },
    { to: "/admin/campaigns", label: "Campaigns", icon: "\uD83D\uDCE3" },
    { to: "/admin/analytics", label: "Analytics", icon: "\uD83D\uDCC8" },
    { to: "/admin/reports-export", label: "Export", icon: "\u2B07" }
  ]
};

export default function Sidebar({ role = "reviewer" }) {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const items = NAV_ITEMS[role] || NAV_ITEMS.reviewer;

  return (
    <div className="sidebar">
      <p className="sidebar-title">Child Rights Platform</p>
      <div className="sidebar-nav">
        {items.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end
            className={({ isActive }) => "sidebar-item" + (isActive ? " active" : "")}
          >
            <span className="sidebar-icon">{item.icon}</span>
            {item.label}
          </NavLink>
        ))}
      </div>
      <div className="sidebar-footer" onClick={() => { logout(); navigate("/login"); }}>
        <span className="sidebar-icon">\u21A9</span>
        Sign out
      </div>
    </div>
  );
}
