import { Routes, Route, Navigate } from "react-router-dom";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import Overview from "./Overview";
import Applications from "./Applications";
import AddJob from "./AddJob";
import Profile from "./Profile";
import AIInsights from "./AIInsights";
import ProtectedRoute from "./ProtectedRoute";

export default function DashboardRoutes() {
  return (
    <Routes>
      <Route element={<ProtectedRoute />}>
        <Route path="" element={<DashboardLayout />}>
          <Route index element={<Overview />} />
          <Route path="applications" element={<Applications />} />
          <Route path="add-job" element={<AddJob />} />
          <Route path="profile" element={<Profile />} />
          <Route path="ai-insights" element={<AIInsights />} />
          <Route path="*" element={<Navigate to="/dashboard" />} />
        </Route>
      </Route>
    </Routes>
  );
} 