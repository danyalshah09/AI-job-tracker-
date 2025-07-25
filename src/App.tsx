import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Dashboard from "@/components/dashboard/Dashboard";
import { useState } from "react";
import Layout from "@/components/layout";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import LoginForm from "@/components/auth/LoginForm";
import SignupForm from "@/components/auth/SignupForm";

const queryClient = new QueryClient();

function AppRoutes() {
  const [user, setUser] = useState(null);
  const [loggingOut, setLoggingOut] = useState(false);
  const [showAuth, setShowAuth] = useState(false);
  const [authTab, setAuthTab] = useState("login");
  const navigate = useNavigate();

  const handleLogout = () => {
    setLoggingOut(true);
    setTimeout(() => {
      setUser(null);
      localStorage.removeItem("token");
      setLoggingOut(false);
      navigate("/", { replace: true });
    }, 1000);
  };

  // Handler for successful login/signup
  const handleAuthSuccess = (userData: any) => {
    setUser(userData);
    setShowAuth(false);
  };

  return (
    <>
      {loggingOut && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/70 backdrop-blur-sm transition-opacity duration-300">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-blue-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-lg text-gray-700">Logging out...</p>
          </div>
        </div>
      )}
      <Layout setShowAuth={setShowAuth} setAuthTab={setAuthTab}>
        <Routes>
          <Route path="/" element={<Index setUser={setUser} showAuth={showAuth} authTab={authTab} />} />
          <Route path="/dashboard" element={<Dashboard user={user} onLogout={handleLogout} loggingOut={loggingOut} />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>

      {/* Auth Modal */}
      <Dialog open={showAuth} onOpenChange={setShowAuth}>
        <DialogContent className="max-w-md w-full p-0">
          <div className="flex border-b">
            <button
              className={`flex-1 py-2 text-center ${authTab === "login" ? "font-bold border-b-2 border-blue-600" : "text-gray-500"}`}
              onClick={() => setAuthTab("login")}
              aria-current={authTab === "login"}
            >
              Login
            </button>
            <button
              className={`flex-1 py-2 text-center ${authTab === "signup" ? "font-bold border-b-2 border-blue-600" : "text-gray-500"}`}
              onClick={() => setAuthTab("signup")}
              aria-current={authTab === "signup"}
            >
              Signup
            </button>
          </div>
          <div className="p-6">
            {authTab === "login" ? (
              <LoginForm onLogin={handleAuthSuccess} />
            ) : (
              <SignupForm onSignup={handleAuthSuccess} />
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
}
export default App;
