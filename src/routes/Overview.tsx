import DashboardStats from "@/components/dashboard/DashboardStats";
import { useQuery } from "@tanstack/react-query";
import { fetchApplications } from "@/lib/api";

export default function Overview() {
  const { data: applications = [] } = useQuery({ queryKey: ["applications"], queryFn: fetchApplications });
  return (
    <div className="space-y-6">
      <DashboardStats applications={applications} />
      {/* Add recent applications or other overview content here */}
    </div>
  );
} 