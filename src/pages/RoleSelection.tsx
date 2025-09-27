import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Loader2, ShoppingCart, Store } from "lucide-react";

const RoleSelection = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleRoleSelection = async (role: 'buyer' | 'seller') => {
    try {
      setLoading(true);

      // Get current user
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      
      if (userError || !user) {
        toast({
          title: "Authentication Error",
          description: "Please log in again.",
          variant: "destructive",
        });
        navigate("/auth");
        return;
      }

      // Update user profile with selected role
      const { error } = await supabase
        .from('profiles')
        .update({ role })
        .eq('user_id', user.id);

      if (error) {
        toast({
          title: "Error",
          description: "Failed to save role selection. Please try again.",
          variant: "destructive",
        });
        return;
      }

      toast({
        title: "Role selected successfully",
        description: `Welcome ${role}!`,
      });

      // Navigate based on role
      if (role === 'buyer') {
        navigate("/buyer");
      } else {
        navigate("/seller");
      }
    } catch (error) {
      console.error('Role selection error:', error);
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 via-background to-success/5 p-4">
      <Card className="w-full max-w-2xl shadow-card">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold text-brand-gradient mb-2">
            What do you want to be?
          </CardTitle>
          <CardDescription className="text-lg">
            Choose your role to get started with ZERO GAP
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Buyer Option */}
            <Card className="border-2 hover:border-primary/50 transition-colors cursor-pointer shadow-soft hover:shadow-card">
              <CardContent className="p-8 text-center">
                <div className="flex justify-center mb-6">
                  <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
                    <ShoppingCart className="h-8 w-8 text-primary" />
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-3">Buyer</h3>
                <p className="text-muted-foreground mb-6">
                  Browse and purchase fresh produce directly from local farmers and producers
                </p>
                <Button 
                  onClick={() => handleRoleSelection('buyer')}
                  className="w-full"
                  variant="brand"
                  disabled={loading}
                >
                  {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Choose Buyer
                </Button>
              </CardContent>
            </Card>

            {/* Seller Option */}
            <Card className="border-2 hover:border-primary/50 transition-colors cursor-pointer shadow-soft hover:shadow-card">
              <CardContent className="p-8 text-center">
                <div className="flex justify-center mb-6">
                  <div className="h-16 w-16 rounded-full bg-success/10 flex items-center justify-center">
                    <Store className="h-8 w-8 text-success" />
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-3">Seller</h3>
                <p className="text-muted-foreground mb-6">
                  Sell your fresh produce and connect directly with consumers in your area
                </p>
                <Button 
                  onClick={() => handleRoleSelection('seller')}
                  className="w-full"
                  variant="success"
                  disabled={loading}
                >
                  {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Choose Seller
                </Button>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RoleSelection;