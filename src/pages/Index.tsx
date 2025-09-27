import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 px-4">
        <div className="absolute inset-0 gradient-brand opacity-5"></div>
        <div className="container mx-auto text-center relative z-10">
          <div className="flex justify-center mb-8">
            <div className="text-6xl font-bold text-brand-gradient">ZG</div>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-brand-gradient mb-6">
            ZERO GAP
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Connecting Local Food Producers Directly to Consumers
          </p>
          <p className="text-lg text-muted-foreground mb-12 max-w-2xl mx-auto">
            Fresh, organic produce from your neighborhood farmers, delivered with zero middleman markup. 
            Support local agriculture while enjoying the freshest food at fair prices.
          </p>
          <Button 
            size="lg"
            variant="brand"
            className="text-lg px-8 py-4"
            onClick={() => navigate("/auth")}
          >
            Log In / Sign Up
          </Button>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-brand-gradient">
            Why Choose ZERO GAP?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 rounded-lg shadow-soft bg-card">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🥕</span>
              </div>
              <h3 className="text-xl font-bold mb-3">Fresh & Organic</h3>
              <p className="text-muted-foreground">
                Get the freshest produce directly from local farms, harvested at peak ripeness
              </p>
            </div>
            <div className="text-center p-6 rounded-lg shadow-soft bg-card">
              <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">💰</span>
              </div>
              <h3 className="text-xl font-bold mb-3">Fair Prices</h3>
              <p className="text-muted-foreground">
                No middleman markup means better prices for you and fair compensation for farmers
              </p>
            </div>
            <div className="text-center p-6 rounded-lg shadow-soft bg-card">
              <div className="w-16 h-16 bg-warning/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🌱</span>
              </div>
              <h3 className="text-xl font-bold mb-3">Support Local</h3>
              <p className="text-muted-foreground">
                Strengthen your community by supporting local farmers and sustainable agriculture
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6 text-brand-gradient">
            Ready to Start?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied customers and farmers who have discovered the benefits of direct trade
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg"
              variant="brand"
              className="text-lg px-8 py-4"
              onClick={() => navigate("/auth")}
            >
              Start as Buyer
            </Button>
            <Button 
              size="lg"
              variant="success"
              className="text-lg px-8 py-4"
              onClick={() => navigate("/auth")}
            >
              Start as Seller
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
