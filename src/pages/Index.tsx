
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LoginForm from "@/components/auth/LoginForm";
import SignupForm from "@/components/auth/SignupForm";
import Dashboard from "@/components/dashboard/Dashboard";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const { toast } = useToast();

  const handleLogin = (userData: any) => {
    setUser(userData);
    setIsAuthenticated(true);
    toast({
      title: "Welcome back!",
      description: "Successfully logged in to your job tracker.",
    });
  };

  const handleSignup = (userData: any) => {
    setUser(userData);
    setIsAuthenticated(true);
    toast({
      title: "Account created!",
      description: "Welcome to your new job tracking dashboard.",
    });
  };

  const handleLogout = () => {
    setUser(null);
    setIsAuthenticated(false);
    toast({
      title: "Logged out",
      description: "See you next time!",
    });
  };

  if (isAuthenticated) {
    return <Dashboard user={user} onLogout={handleLogout} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent mb-4">
            JobTracker AI
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Track your job applications with AI-powered insights and never miss an opportunity again
          </p>
        </div>

        <div className="max-w-md mx-auto">
          <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold text-gray-800">Get Started</CardTitle>
              <CardDescription>
                Sign in to your account or create a new one
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="login" className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-6">
                  <TabsTrigger value="login">Login</TabsTrigger>
                  <TabsTrigger value="signup">Sign Up</TabsTrigger>
                </TabsList>
                <TabsContent value="login">
                  <LoginForm onLogin={handleLogin} />
                </TabsContent>
                <TabsContent value="signup">
                  <SignupForm onSignup={handleSignup} />
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        <div className="mt-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Why Choose JobTracker AI?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Streamline your job search with powerful tracking and AI-driven insights
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Card className="text-center p-6 border-0 shadow-lg bg-white/60 backdrop-blur-sm hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📊</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Smart Tracking</h3>
              <p className="text-gray-600">
                Keep track of all your applications, interviews, and follow-ups in one place
              </p>
            </Card>

            <Card className="text-center p-6 border-0 shadow-lg bg-white/60 backdrop-blur-sm hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🤖</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">AI Insights</h3>
              <p className="text-gray-600">
                Get intelligent recommendations and insights to improve your job search success
              </p>
            </Card>

            <Card className="text-center p-6 border-0 shadow-lg bg-white/60 backdrop-blur-sm hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">⚡</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Quick Actions</h3>
              <p className="text-gray-600">
                Save time with automated reminders and quick application templates
              </p>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
