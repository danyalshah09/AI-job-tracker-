import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import JobApplicationForm from "./JobApplicationForm";
import ApplicationsList from "./ApplicationsList";
import ProfileForm from "./ProfileForm";
import AIInsights from "./AIInsights";
import DashboardStats from "./DashboardStats";
import { fetchUser, updateUser, fetchApplications, addApplication, updateApplication, deleteApplication } from "@/lib/api";

interface DashboardProps {
  user: any;
  onLogout: () => void;
  loggingOut?: boolean;
}

const Dashboard = ({ user: initialUser, onLogout, loggingOut = false }: DashboardProps) => {
  const queryClient = useQueryClient();

  // Fetch user profile
  const { data: profile, isLoading: userLoading } = useQuery({
    queryKey: ["user"],
    queryFn: fetchUser,
  });
  // Fetch job applications
  const { data: applications, isLoading: appsLoading } = useQuery({
    queryKey: ["applications"],
    queryFn: fetchApplications,
  });

  // Mutations
  const addAppMutation = useMutation({
    mutationFn: addApplication,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["applications"] }),
  });
  const updateAppMutation = useMutation({
    mutationFn: ({ id, data }: any) => updateApplication(id, data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["applications"] }),
  });
  const deleteAppMutation = useMutation({
    mutationFn: deleteApplication,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["applications"] }),
  });
  const updateUserMutation = useMutation({
    mutationFn: updateUser,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["user"] }),
  });

  const [activeTab, setActiveTab] = useState("overview");

  // Handlers for child components
  const handleAddApplication = (application: any) => {
    addAppMutation.mutate(application);
  };
  const handleUpdateApplication = (id: string, updates: any) => {
    updateAppMutation.mutate({ id: Number(id), data: updates });
  };
  const handleDeleteApplication = (id: string) => {
    deleteAppMutation.mutate(Number(id));
  };
  const handleUpdateProfile = (data: any) => {
    updateUserMutation.mutate(data);
  };

  if (userLoading || appsLoading) {
    return <div className="p-8 text-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 relative">
      {loggingOut && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/70 backdrop-blur-sm transition-opacity duration-300">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-blue-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-lg text-gray-700">Logging out...</p>
          </div>
        </div>
      )}
      <div className={loggingOut ? 'pointer-events-none opacity-40 select-none' : ''}>
        <header className="bg-white/80 backdrop-blur-sm border-b shadow-sm">
          <div className="container mx-auto px-4 py-4">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                  JobTracker AI
                </h1>
                <p className="text-gray-600">Welcome back, {profile?.name || "User"}!</p>
                <p className="text-gray-500 text-sm">Email: {profile?.email}</p>
              </div>
              <Button 
                onClick={() => {
                  console.log('Logout button clicked');
                  onLogout();
                }} 
                variant="outline"
                className="hover:bg-red-50 hover:border-red-300"
                disabled={loggingOut}
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
                <DashboardStats applications={applications || []} />
                <div className="grid md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Recent Applications</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {applications?.slice(0, 3).map((app) => (
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
                applications={applications || []}
                onUpdate={handleUpdateApplication}
                onDelete={handleDeleteApplication}
              />
            </TabsContent>

            <TabsContent value="add-job">
              <JobApplicationForm 
                onSubmit={handleAddApplication}
                userProfile={profile || {}}
              />
            </TabsContent>

            <TabsContent value="profile">
              <ProfileForm 
                profile={profile || {}}
                onUpdate={handleUpdateProfile}
              />
            </TabsContent>

            <TabsContent value="ai-insights">
              <AIInsights 
                applications={applications || []}
                profile={profile || {}}
              />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
