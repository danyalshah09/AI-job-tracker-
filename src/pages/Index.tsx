import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LoginForm from "@/components/auth/LoginForm";
import SignupForm from "@/components/auth/SignupForm";
import { useToast } from "@/hooks/use-toast";
import Hero from "@/components/Hero";
import MovingSlider from "@/components/Slider";
import Tools from "@/components/Tools";
import JobTrackerFAQ from "@/components/Faq";
import Info from "@/components/Info";
import Additional from "@/components/Additional";
interface IndexProps {
  setUser: (user: any) => void;
  showAuth: boolean;
  authTab: string;
}

const Index = ({ setUser, showAuth, authTab }: IndexProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/dashboard", { replace: true });
    }
  }, [navigate]);

  const handleLogin = (userData: any) => {
    setUser(userData);
    setIsAuthenticated(true);
    toast({
      title: "Welcome back!",
      description: "Successfully logged in to your job tracker.",
    });
    navigate("/dashboard", { replace: true });
  };

  const handleSignup = (userData: any) => {
    setUser(userData);
    setIsAuthenticated(true);
    toast({
      title: "Account created!",
      description: "Welcome to your new job tracking dashboard.",
    });
    navigate("/dashboard", { replace: true });
  };

  if (loggingOut) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-green-50">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-lg text-gray-700">Logging out...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Hero />
      <MovingSlider />
      <Tools />
      <Info />
      <Additional/>
      {showAuth && (
        <div className="max-w-md mx-auto py-12">
          <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold text-gray-800">Get Started</CardTitle>
              <CardDescription>
                Sign in to your account or create a new one
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs value={authTab} className="w-full">
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
      )}
      <JobTrackerFAQ />
    </div>
  );
};

export default Index;
