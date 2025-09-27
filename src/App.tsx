import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import LocationCapture from "./pages/LocationCapture";
import RoleSelection from "./pages/RoleSelection";
import BuyerHomepage from "./pages/BuyerHomepage";
import SellerDashboard from "./pages/SellerDashboard";
import NotFound from "./pages/NotFound";
import Header from "./components/Header";

const queryClient = new QueryClient();

const App = () => {
  const { user, loading } = useAuth();

  // Protected route wrapper
  const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    if (loading) {
      return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
    }
    if (!user) {
      return <Navigate to="/auth" replace />;
    }
    return <>{children}</>;
  };

  // Public route wrapper (redirect to appropriate dashboard if logged in)
  const PublicRoute = ({ children }: { children: React.ReactNode }) => {
    if (loading) {
      return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
    }
    return <>{children}</>;
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter
          future={{
            v7_startTransition: true,
            v7_relativeSplatPath: true,
          }}
        >
          <div className="min-h-screen bg-background">
            <Header />
            <Routes>
              <Route 
                path="/" 
                element={
                  <PublicRoute>
                    <Index />
                  </PublicRoute>
                } 
              />
              <Route 
                path="/auth" 
                element={
                  <PublicRoute>
                    <Auth />
                  </PublicRoute>
                } 
              />
              <Route 
                path="/location-capture" 
                element={
                  <ProtectedRoute>
                    <LocationCapture />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/role-selection" 
                element={
                  <ProtectedRoute>
                    <RoleSelection />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/buyer" 
                element={
                  <ProtectedRoute>
                    <BuyerHomepage />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/seller" 
                element={
                  <ProtectedRoute>
                    <SellerDashboard />
                  </ProtectedRoute>
                } 
              />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
