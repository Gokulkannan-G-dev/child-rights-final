import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth.js";

export default function RoleRoute({ children, roles = [] }) {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  if (roles.length > 0 && !roles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }
  return children;
}
