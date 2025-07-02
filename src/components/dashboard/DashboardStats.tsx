
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface JobApplication {
  id: string;
  company: string;
  position: string;
  status: "applied" | "interview" | "rejected" | "offer" | "accepted";
  dateApplied: string;
  salary?: string;
  notes?: string;
  jobUrl?: string;
}

interface DashboardStatsProps {
  applications: JobApplication[];
}

const DashboardStats = ({ applications }: DashboardStatsProps) => {
  const totalApplications = applications.length;
  const interviews = applications.filter(app => app.status === "interview").length;
  const offers = applications.filter(app => app.status === "offer" || app.status === "accepted").length;
  const rejections = applications.filter(app => app.status === "rejected").length;
  
  const responseRate = totalApplications > 0 ? Math.round(((interviews + offers) / totalApplications) * 100) : 0;

  const stats = [
    {
      title: "Total Applications",
      value: totalApplications,
      description: "Jobs applied to",
      color: "bg-blue-500",
    },
    {
      title: "Interviews",
      value: interviews,
      description: "Interview opportunities",
      color: "bg-green-500",
    },
    {
      title: "Offers",
      value: offers,
      description: "Job offers received",
      color: "bg-purple-500",
    },
    {
      title: "Response Rate",
      value: `${responseRate}%`,
      description: "Applications with response",
      color: "bg-orange-500",
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <Card key={index} className="text-center">
          <CardContent className="pt-6">
            <div className={`w-12 h-12 ${stat.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
              <span className="text-white font-bold text-lg">{typeof stat.value === 'number' ? stat.value : stat.value.charAt(0)}</span>
            </div>
            <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
            <p className="text-xs text-gray-600 mt-1">{stat.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default DashboardStats;
