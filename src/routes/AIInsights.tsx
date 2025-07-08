import AIInsights from "@/components/dashboard/AIInsights";
import { useQuery } from "@tanstack/react-query";
import { fetchApplications, fetchUser } from "@/lib/api";

export default function AIInsightsRoute() {
  const { data: applications = [] } = useQuery({ queryKey: ["applications"], queryFn: fetchApplications });
  const { data: profile = {} } = useQuery({ queryKey: ["user"], queryFn: fetchUser });
  return <AIInsights applications={applications} profile={profile} />;
} 