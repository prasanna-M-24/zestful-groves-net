import { useState } from "react";
import { Search, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";

const Header = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user, userProfile, signOut } = useAuth();

  const handleSignOut = async () => {
    try {
      await signOut();
      toast({
        title: "Signed out successfully",
        description: "You have been logged out.",
      });
      navigate("/");
    } catch (error) {
      console.error('Error signing out:', error);
      toast({
        title: "Error",
        description: "Failed to sign out. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center px-4">
        {/* Brand Logo */}
        <div 
          className="flex items-center space-x-2 cursor-pointer" 
          onClick={() => navigate("/")}
        >
          <div className="text-2xl font-bold text-brand-gradient">ZG</div>
          <span className="text-xl font-bold text-brand-gradient hidden sm:block">
            ZERO GAP
          </span>
        </div>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="flex-1 max-w-md mx-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              type="text"
              placeholder="Search for products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-muted/50 border-primary/20 focus:border-primary"
            />
          </div>
        </form>

        {/* User Status */}
        <div className="flex items-center space-x-2">
          {user ? (
            <div className="flex items-center space-x-3">
              <span className="text-sm font-medium hidden sm:block">
                Welcome, {userProfile?.full_name || "User"}
              </span>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    if (userProfile?.role === 'buyer') {
                      navigate("/buyer");
                    } else if (userProfile?.role === 'seller') {
                      navigate("/seller");
                    } else {
                      navigate("/role-selection");
                    }
                  }}
                >
                  <User className="h-4 w-4 mr-1" />
                  Dashboard
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleSignOut}
                >
                  Sign Out
                </Button>
              </div>
            </div>
          ) : (
            <Button 
              variant="brand" 
              onClick={() => navigate("/auth")}
            >
              Log In / Sign Up
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;