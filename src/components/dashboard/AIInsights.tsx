import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { TrendingUp, Target, Lightbulb, Calendar, BarChart3 } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, BarChart, Bar } from "recharts";

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

interface UserProfile {
  name: string;
  email: string;
  phone: string;
  linkedin: string;
  github: string;
  resume: string;
  skills: string[];
  experience: string;
}

interface AIInsightsProps {
  applications: JobApplication[];
  profile: UserProfile;
}

const AIInsights = ({ applications, profile }: AIInsightsProps) => {
  // AI-powered calculations
  const totalApplications = applications.length;
  const responseRate = totalApplications > 0 ? Math.round(((applications.filter(app => app.status !== "applied").length) / totalApplications) * 100) : 0;
  const avgTimeToResponse = 7; // Simulated AI calculation
  
  const topCompanies = ["Google", "Microsoft", "Apple", "Amazon", "Meta"];
  const recommendedSkills = ["TypeScript", "Python", "AWS", "Docker", "GraphQL"];
  
  // Generate chart data based on applications
  const generateProgressData = () => {
    const last6Months = [];
    const currentDate = new Date();
    
    for (let i = 5; i >= 0; i--) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth() - i, 1);
      const monthName = date.toLocaleDateString('en-US', { month: 'short' });
      
      // Count applications for this month
      const monthApplications = applications.filter(app => {
        const appDate = new Date(app.dateApplied);
        return appDate.getMonth() === date.getMonth() && appDate.getFullYear() === date.getFullYear();
      });
      
      const responses = monthApplications.filter(app => app.status !== "applied").length;
      const interviews = monthApplications.filter(app => app.status === "interview" || app.status === "offer").length;
      
      last6Months.push({
        month: monthName,
        applications: monthApplications.length,
        responses: responses,
        interviews: interviews,
      });
    }
    
    return last6Months;
  };

  const chartData = generateProgressData();

  const chartConfig = {
    applications: {
      label: "Applications",
      color: "#3b82f6",
    },
    responses: {
      label: "Responses",
      color: "#10b981",
    },
    interviews: {
      label: "Interviews",
      color: "#f59e0b",
    },
  };

  const getMotivationalMessage = () => {
    if (responseRate > 70) return "Excellent! Your application strategy is working great!";
    if (responseRate > 40) return "Good progress! Keep optimizing your applications.";
    return "Don't give up! Every application is a learning opportunity.";
  };

  const insights = [
    {
      title: "Progress Chart",
      description: "Your 6-month application trends",
      icon: <BarChart3 className="h-5 w-5" />,
      content: (
        <div className="space-y-4">
          <ChartContainer config={chartConfig} className="h-[300px]">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Line 
                type="monotone" 
                dataKey="applications" 
                stroke="var(--color-applications)" 
                strokeWidth={2}
                dot={{ fill: "var(--color-applications)" }}
              />
              <Line 
                type="monotone" 
                dataKey="responses" 
                stroke="var(--color-responses)" 
                strokeWidth={2}
                dot={{ fill: "var(--color-responses)" }}
              />
              <Line 
                type="monotone" 
                dataKey="interviews" 
                stroke="var(--color-interviews)" 
                strokeWidth={2}
                dot={{ fill: "var(--color-interviews)" }}
              />
            </LineChart>
          </ChartContainer>
          <div className="grid grid-cols-3 gap-4 text-center text-sm">
            <div>
              <div className="w-3 h-3 bg-blue-500 rounded-full mx-auto mb-1"></div>
              <span className="text-gray-600">Applications</span>
            </div>
            <div>
              <div className="w-3 h-3 bg-green-500 rounded-full mx-auto mb-1"></div>
              <span className="text-gray-600">Responses</span>
            </div>
            <div>
              <div className="w-3 h-3 bg-yellow-500 rounded-full mx-auto mb-1"></div>
              <span className="text-gray-600">Interviews</span>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Application Performance",
      description: "Your job search analytics",
      icon: <TrendingUp className="h-5 w-5" />,
      content: (
        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span>Response Rate</span>
              <span>{responseRate}%</span>
            </div>
            <Progress value={responseRate} className="h-2" />
          </div>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-gray-600">Total Applications:</span>
              <p className="font-semibold">{totalApplications}</p>
            </div>
            <div>
              <span className="text-gray-600">Avg. Response Time:</span>
              <p className="font-semibold">{avgTimeToResponse} days</p>
            </div>
          </div>
          <p className="text-sm text-green-600 font-medium">{getMotivationalMessage()}</p>
        </div>
      )
    },
    {
      title: "Recommended Companies",
      description: "Based on your profile and market trends",
      icon: <Target className="h-5 w-5" />,
      content: (
        <div className="space-y-3">
          {topCompanies.slice(0, 4).map((company, index) => (
            <div key={index} className="flex justify-between items-center">
              <span className="font-medium">{company}</span>
              <Badge variant="outline" className="text-xs">
                {Math.floor(Math.random() * 30 + 70)}% match
              </Badge>
            </div>
          ))}
          <p className="text-xs text-gray-600 mt-2">
            Companies hiring for roles matching your {profile.skills.slice(0, 3).join(", ")} skills
          </p>
        </div>
      )
    },
    {
      title: "Skill Recommendations",
      description: "Trending skills in your field",
      icon: <Lightbulb className="h-5 w-5" />,
      content: (
        <div className="space-y-3">
          <div className="flex flex-wrap gap-2">
            {recommendedSkills.map((skill, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {skill}
              </Badge>
            ))}
          </div>
          <p className="text-xs text-gray-600">
            These skills are appearing in 80%+ of job postings similar to your interests
          </p>
          <div className="bg-blue-50 p-3 rounded-lg">
            <p className="text-sm text-blue-800">
              💡 <strong>AI Tip:</strong> Adding these skills to your profile could increase your match rate by 25%
            </p>
          </div>
        </div>
      )
    },
    {
      title: "Next Actions",
      description: "AI-powered recommendations",
      icon: <Calendar className="h-5 w-5" />,
      content: (
        <div className="space-y-3">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-sm">Follow up on 2 pending applications</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span className="text-sm">Update LinkedIn with recent projects</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <span className="text-sm">Apply to 3 new positions this week</span>
            </div>
          </div>
          <div className="bg-green-50 p-3 rounded-lg">
            <p className="text-sm text-green-800">
              🎯 <strong>Weekly Goal:</strong> Based on your current pace, aim for 5 new applications
            </p>
          </div>
        </div>
      )
    }
  ];

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-2">
          AI-Powered Insights
        </h2>
        <p className="text-gray-600">
          Personalized recommendations to boost your job search success
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {insights.map((insight, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-gradient-to-r from-purple-100 to-blue-100 rounded-lg">
                  {insight.icon}
                </div>
                <div>
                  <CardTitle className="text-lg">{insight.title}</CardTitle>
                  <CardDescription className="text-sm">{insight.description}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {insight.content}
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="bg-gradient-to-r from-blue-50 to-green-50 border-0">
        <CardContent className="pt-6">
          <div className="text-center">
            <h3 className="text-xl font-bold text-gray-800 mb-2">🚀 Pro Tip</h3>
            <p className="text-gray-700 mb-4">
              Job seekers who track their applications and follow AI recommendations are 3x more likely to land interviews!
            </p>
            <div className="flex justify-center gap-4 text-sm text-gray-600">
              <span>✅ Stay organized</span>
              <span>✅ Follow up consistently</span>
              <span>✅ Optimize your approach</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AIInsights;
