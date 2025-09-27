import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";

// Import food category images
import vegetablesImg from "@/assets/vegetables.jpg";
import fruitsImg from "@/assets/fruits.jpg";
import dairyImg from "@/assets/dairy.jpg";
import oilsImg from "@/assets/oils.jpg";
import dryFruitsImg from "@/assets/dryfruits.jpg";
import honeyImg from "@/assets/honey.jpg";

const categories = [
  {
    id: "vegetables",
    name: "Vegetables",
    image: vegetablesImg,
    description: "Fresh organic vegetables from local farms",
  },
  {
    id: "fruits", 
    name: "Fruits",
    image: fruitsImg,
    description: "Seasonal and tropical fruits at their best",
  },
  {
    id: "dairy",
    name: "Dairy Products",
    image: dairyImg,
    description: "Fresh milk, cheese, and dairy products",
  },
  {
    id: "oils",
    name: "Oils",
    image: oilsImg,
    description: "Pure cooking oils and natural extracts",
  },
  {
    id: "dry-fruits",
    name: "Dry Fruits",
    image: dryFruitsImg,
    description: "Premium nuts and dried fruits",
  },
  {
    id: "honey",
    name: "Honey",
    image: honeyImg,
    description: "Pure organic honey from local beekeepers",
    isSpecial: true, // Special flow for honey
  },
];

const BuyerHomepage = () => {
  const navigate = useNavigate();

  const handleCategoryClick = (categoryId: string, isSpecial?: boolean) => {
    if (isSpecial) {
      // Special flow for honey - go directly to quantity selection
      navigate(`/product/honey-default/quantity`);
    } else {
      // Regular flow - go to category listing
      navigate(`/category/${categoryId}`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-success/5">
      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-brand-gradient mb-4">
            Welcome to ZERO GAP Marketplace
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover fresh, local produce from farmers in your area. Browse categories and find the best quality ingredients for your kitchen.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category) => (
            <Card 
              key={category.id}
              className="group hover:shadow-strong transition-all duration-300 cursor-pointer border-2 hover:border-primary/50 overflow-hidden"
              onClick={() => handleCategoryClick(category.id, category.isSpecial)}
            >
              <div className="aspect-video overflow-hidden">
                <img 
                  src={category.image} 
                  alt={category.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <CardHeader>
                <CardTitle className="text-xl font-bold group-hover:text-primary transition-colors">
                  {category.name}
                </CardTitle>
                <CardDescription className="text-muted-foreground">
                  {category.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <Button 
                  variant="brand" 
                  className="w-full group-hover:shadow-card transition-all"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCategoryClick(category.id, category.isSpecial);
                  }}
                >
                  Explore More
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Stats */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div className="p-6">
            <div className="text-3xl font-bold text-primary mb-2">500+</div>
            <div className="text-muted-foreground">Local Farmers</div>
          </div>
          <div className="p-6">
            <div className="text-3xl font-bold text-success mb-2">2000+</div>
            <div className="text-muted-foreground">Fresh Products</div>
          </div>
          <div className="p-6">
            <div className="text-3xl font-bold text-warning mb-2">10k+</div>
            <div className="text-muted-foreground">Happy Customers</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuyerHomepage;