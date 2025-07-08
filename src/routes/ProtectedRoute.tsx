import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoute() {
  const token = localStorage.getItem("token");
  // Optionally: add JWT expiry check here
  return token ? <Outlet /> : <Navigate to="/" replace />;
} 