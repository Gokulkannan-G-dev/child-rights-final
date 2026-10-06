import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth.js";
import Loading from "./Loading.jsx";

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  if (loading) return <Loading label="Checking your session…" />;
  if (!user) return <Navigate to="/login" replace />;
  return children;
}
