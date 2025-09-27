import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Mail, Phone } from "lucide-react";
import { z } from "zod";

// Validation schemas
const emailLoginSchema = z.object({
  email: z.string().trim().email({ message: "Invalid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});

const emailSignupSchema = z.object({
  fullName: z.string().trim().min(2, { message: "Full name must be at least 2 characters" }).max(100, { message: "Full name too long" }),
  mobileNumber: z.string().trim().regex(/^[6-9]\d{9}$/, { message: "Invalid Indian mobile number" }),
  email: z.string().trim().email({ message: "Invalid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});

const mobileSchema = z.object({
  mobileNumber: z.string().trim().regex(/^[6-9]\d{9}$/, { message: "Invalid Indian mobile number" }),
});

const Auth = () => {
  const [loading, setLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Form states
  const [emailLoginData, setEmailLoginData] = useState({ email: "", password: "" });
  const [emailSignupData, setEmailSignupData] = useState({ 
    fullName: "", 
    mobileNumber: "", 
    email: "", 
    password: "" 
  });
  const [mobileLoginData, setMobileLoginData] = useState({ mobileNumber: "", otp: "" });

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const validatedData = emailLoginSchema.parse(emailLoginData);
      setLoading(true);

      const { error } = await supabase.auth.signInWithPassword({
        email: validatedData.email,
        password: validatedData.password,
      });

      if (error) {
        toast({
          title: "Login Failed",
          description: error.message,
          variant: "destructive",
        });
        return;
      }

      toast({
        title: "Successfully logged in",
        description: "Welcome back!",
      });

      // Redirect will be handled by auth state change in App
      navigate("/");
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast({
          title: "Validation Error",
          description: error.errors[0].message,
          variant: "destructive",
        });
      } else {
        console.error('Login error:', error);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleEmailSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const validatedData = emailSignupSchema.parse(emailSignupData);
      setLoading(true);

      const redirectUrl = `${window.location.origin}/`;
      
      const { error } = await supabase.auth.signUp({
        email: validatedData.email,
        password: validatedData.password,
        options: {
          emailRedirectTo: redirectUrl,
          data: {
            full_name: validatedData.fullName,
            mobile_number: validatedData.mobileNumber,
          }
        }
      });

      if (error) {
        toast({
          title: "Signup Failed",
          description: error.message,
          variant: "destructive",
        });
        return;
      }

      toast({
        title: "Account created successfully",
        description: "Please check your email to verify your account.",
      });

      // Navigate to location capture
      navigate("/location-capture");
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast({
          title: "Validation Error",
          description: error.errors[0].message,
          variant: "destructive",
        });
      } else {
        console.error('Signup error:', error);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSendOTP = async () => {
    try {
      const validatedData = mobileSchema.parse({ mobileNumber: mobileLoginData.mobileNumber });
      setLoading(true);

      // For demo purposes, we'll show OTP sent message
      // In production, integrate with SMS service
      setOtpSent(true);
      toast({
        title: "OTP Sent",
        description: "Please enter the OTP sent to your mobile number.",
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast({
          title: "Validation Error",
          description: error.errors[0].message,
          variant: "destructive",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 via-background to-success/5 p-4">
      <Card className="w-full max-w-md shadow-card">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-brand-gradient">
            Welcome to ZERO GAP
          </CardTitle>
          <CardDescription>
            Connect with local food producers directly
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>

            <TabsContent value="login" className="space-y-4">
              <Tabs defaultValue="email" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="email" className="text-xs">
                    <Mail className="h-3 w-3 mr-1" />
                    Email
                  </TabsTrigger>
                  <TabsTrigger value="mobile" className="text-xs">
                    <Phone className="h-3 w-3 mr-1" />
                    Mobile
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="email">
                  <form onSubmit={handleEmailLogin} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="login-email">Email ID</Label>
                      <Input
                        id="login-email"
                        type="email"
                        value={emailLoginData.email}
                        onChange={(e) => setEmailLoginData(prev => ({ ...prev, email: e.target.value }))}
                        placeholder="Enter your email"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="login-password">Password</Label>
                      <Input
                        id="login-password"
                        type="password"
                        value={emailLoginData.password}
                        onChange={(e) => setEmailLoginData(prev => ({ ...prev, password: e.target.value }))}
                        placeholder="Enter your password"
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
                      Log In
                    </Button>
                  </form>
                </TabsContent>

                <TabsContent value="mobile">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="mobile-number">Mobile Number</Label>
                      <Input
                        id="mobile-number"
                        type="tel"
                        value={mobileLoginData.mobileNumber}
                        onChange={(e) => setMobileLoginData(prev => ({ ...prev, mobileNumber: e.target.value }))}
                        placeholder="Enter 10-digit mobile number"
                        maxLength={10}
                      />
                    </div>
                    
                    {!otpSent ? (
                      <Button 
                        onClick={handleSendOTP}
                        className="w-full" 
                        variant="brand"
                        disabled={loading}
                      >
                        {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Send OTP
                      </Button>
                    ) : (
                      <div className="space-y-2">
                        <Label htmlFor="otp">Enter OTP</Label>
                        <Input
                          id="otp"
                          type="text"
                          value={mobileLoginData.otp}
                          onChange={(e) => setMobileLoginData(prev => ({ ...prev, otp: e.target.value }))}
                          placeholder="Enter 6-digit OTP"
                          maxLength={6}
                        />
                        <Button className="w-full" variant="brand">
                          Verify OTP
                        </Button>
                      </div>
                    )}
                  </div>
                </TabsContent>
              </Tabs>
            </TabsContent>

            <TabsContent value="signup" className="space-y-4">
              <form onSubmit={handleEmailSignup} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="signup-name">Full Name</Label>
                  <Input
                    id="signup-name"
                    type="text"
                    value={emailSignupData.fullName}
                    onChange={(e) => setEmailSignupData(prev => ({ ...prev, fullName: e.target.value }))}
                    placeholder="Enter your full name"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-mobile">Mobile Number</Label>
                  <Input
                    id="signup-mobile"
                    type="tel"
                    value={emailSignupData.mobileNumber}
                    onChange={(e) => setEmailSignupData(prev => ({ ...prev, mobileNumber: e.target.value }))}
                    placeholder="Enter 10-digit mobile number"
                    maxLength={10}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-email">Email ID</Label>
                  <Input
                    id="signup-email"
                    type="email"
                    value={emailSignupData.email}
                    onChange={(e) => setEmailSignupData(prev => ({ ...prev, email: e.target.value }))}
                    placeholder="Enter your email"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-password">Password</Label>
                  <Input
                    id="signup-password"
                    type="password"
                    value={emailSignupData.password}
                    onChange={(e) => setEmailSignupData(prev => ({ ...prev, password: e.target.value }))}
                    placeholder="Create a password (min 6 characters)"
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
                  Sign Up
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default Auth;