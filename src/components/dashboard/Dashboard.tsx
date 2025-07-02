
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import JobApplicationForm from "./JobApplicationForm";
import ApplicationsList from "./ApplicationsList";
import ProfileForm from "./ProfileForm";
import AIInsights from "./AIInsights";
import DashboardStats from "./DashboardStats";

interface DashboardProps {
  user: any;
  onLogout: () => void;
}

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

const Dashboard = ({ user, onLogout }: DashboardProps) => {
  const [applications, setApplications] = useState<JobApplication[]>([
    {
      id: "1",
      company: "Google",
      position: "Software Engineer",
      status: "interview",
      dateApplied: "2024-01-15",
      salary: "$120k - $150k",
      notes: "Technical interview scheduled for next week",
    }
  ]);

  const [profile, setProfile] = useState<UserProfile>({
    name: user.name || "",
    email: user.email || "",
    phone: "",
    linkedin: "",
    github: "",
    resume: "",
    skills: ["JavaScript", "React", "Node.js"],
    experience: "",
  });

  const [activeTab, setActiveTab] = useState("overview");

  const addApplication = (application: Omit<JobApplication, "id">) => {
    const newApplication = {
      ...application,
      id: Date.now().toString(),
    };
    setApplications([newApplication, ...applications]);
  };

  const updateApplication = (id: string, updates: Partial<JobApplication>) => {
    setApplications(applications.map(app => 
      app.id === id ? { ...app, ...updates } : app
    ));
  };

  const deleteApplication = (id: string) => {
    setApplications(applications.filter(app => app.id !== id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <header className="bg-white/80 backdrop-blur-sm border-b shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                JobTracker AI
              </h1>
              <p className="text-gray-600">Welcome back, {user.name}!</p>
            </div>
            <Button 
              onClick={onLogout} 
              variant="outline"
              className="hover:bg-red-50 hover:border-red-300"
            >
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-5 mb-8">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="applications">Applications</TabsTrigger>
            <TabsTrigger value="add-job">Add Job</TabsTrigger>
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="ai-insights">AI Insights</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <div className="space-y-6">
              <DashboardStats applications={applications} />
              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Applications</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {applications.slice(0, 3).map((app) => (
                        <div key={app.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                          <div>
                            <p className="font-semibold">{app.position}</p>
                            <p className="text-sm text-gray-600">{app.company}</p>
                          </div>
                          <Badge 
                            variant={app.status === "offer" ? "default" : "secondary"}
                            className={
                              app.status === "interview" ? "bg-blue-100 text-blue-800" :
                              app.status === "offer" ? "bg-green-100 text-green-800" :
                              app.status === "rejected" ? "bg-red-100 text-red-800" :
                              "bg-gray-100 text-gray-800"
                            }
                          >
                            {app.status}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Quick Actions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button 
                      className="w-full justify-start" 
                      variant="outline"
                      onClick={() => setActiveTab("add-job")}
                    >
                      + Add New Application
                    </Button>
                    <Button 
                      className="w-full justify-start" 
                      variant="outline"
                      onClick={() => setActiveTab("profile")}
                    >
                      Update Profile
                    </Button>
                    <Button 
                      className="w-full justify-start" 
                      variant="outline"
                      onClick={() => setActiveTab("ai-insights")}
                    >
                      View AI Insights
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="applications">
            <ApplicationsList 
              applications={applications}
              onUpdate={updateApplication}
              onDelete={deleteApplication}
            />
          </TabsContent>

          <TabsContent value="add-job">
            <JobApplicationForm 
              onSubmit={addApplication}
              userProfile={profile}
            />
          </TabsContent>

          <TabsContent value="profile">
            <ProfileForm 
              profile={profile}
              onUpdate={setProfile}
            />
          </TabsContent>

          <TabsContent value="ai-insights">
            <AIInsights 
              applications={applications}
              profile={profile}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;
