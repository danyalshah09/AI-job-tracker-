import { Outlet } from "react-router-dom";

export default function DashboardLayout() {
  return (
    <main className="flex-1 p-6">
      <Outlet />
    </main>
  );
} 