import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Loader2, MapPin } from "lucide-react";
import { z } from "zod";

const locationSchema = z.object({
  villageName: z.string().trim().min(2, { message: "Village name must be at least 2 characters" }).max(100, { message: "Village name too long" }),
  district: z.string().trim().min(2, { message: "District must be at least 2 characters" }).max(100, { message: "District name too long" }),
  state: z.string().trim().min(2, { message: "State must be at least 2 characters" }).max(100, { message: "State name too long" }),
});

const LocationCapture = () => {
  const [loading, setLoading] = useState(false);
  const [locationData, setLocationData] = useState({
    villageName: "",
    district: "",
    state: "",
  });
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const validatedData = locationSchema.parse(locationData);
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

      // Create or update user profile with location data
      const { error } = await supabase
        .from('profiles')
        .upsert({
          user_id: user.id,
          full_name: user.user_metadata?.full_name || "",
          mobile_number: user.user_metadata?.mobile_number || "",
          village_name: validatedData.villageName,
          district: validatedData.district,
          state: validatedData.state,
        });

      if (error) {
        toast({
          title: "Error",
          description: "Failed to save location data. Please try again.",
          variant: "destructive",
        });
        return;
      }

      toast({
        title: "Location saved successfully",
        description: "Welcome to ZERO GAP!",
      });

      // Navigate to role selection
      navigate("/role-selection");
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast({
          title: "Validation Error",
          description: error.errors[0].message,
          variant: "destructive",
        });
      } else {
        console.error('Location capture error:', error);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 via-background to-success/5 p-4">
      <Card className="w-full max-w-md shadow-card">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
              <MapPin className="h-6 w-6 text-primary" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold text-brand-gradient">
            Location Details
          </CardTitle>
          <CardDescription>
            Help us connect you with local producers in your area
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="village">Village Name</Label>
              <Input
                id="village"
                type="text"
                value={locationData.villageName}
                onChange={(e) => setLocationData(prev => ({ ...prev, villageName: e.target.value }))}
                placeholder="Enter your village name"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="district">District</Label>
              <Input
                id="district"
                type="text"
                value={locationData.district}
                onChange={(e) => setLocationData(prev => ({ ...prev, district: e.target.value }))}
                placeholder="Enter your district"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="state">State</Label>
              <Input
                id="state"
                type="text"
                value={locationData.state}
                onChange={(e) => setLocationData(prev => ({ ...prev, state: e.target.value }))}
                placeholder="Enter your state"
                required
              />
            </div>
            
            <Button 
              type="submit" 
              className="w-full" 
              variant="brand"
              disabled={loading}
            >
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Continue
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default LocationCapture;