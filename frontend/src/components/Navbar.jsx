import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth.js";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <header className="navbar">
      <Link to="/" className="brand">Child Rights Platform</Link>
      <nav>
        <Link to="/awareness">Awareness</Link>
        <Link to="/resources">Resources</Link>
        <Link to="/events">Events</Link>
        <Link to="/emergency-help">Emergency Help</Link>
        {user ? (
          <>
            <Link to="/profile">{user.name}</Link>
            <a href="#" onClick={(e) => { e.preventDefault(); logout(); navigate("/login"); }}>Sign out</a>
          </>
        ) : (
          <Link to="/login">Sign in</Link>
        )}
      </nav>
    </header>
  );
}
