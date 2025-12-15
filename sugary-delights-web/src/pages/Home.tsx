import { Link } from "react-router-dom";
import { Star, Heart, Gift, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import HeroCarousel from "@/components/HeroCarousel";
import traditionalSweets from "@/assets/traditional-sweets.jpg";
import dryFruits from "@/assets/dry-fruits.jpg";
import giftPack from "@/assets/gift-pack.jpg";
import seasonalSpecial from "@/assets/seasonal-special.jpg";

const Home = () => {
  const testimonials = [
    {
      name: "Priya Sharma",
      rating: 5,
      text: "The best sweets I've ever tasted! Perfect for our Diwali celebrations. The quality and freshness are outstanding.",
    },
    {
      name: "Rajesh Kumar",
      rating: 5,
      text: "Absolutely delicious! The gift packs are beautifully presented. My family loved every single sweet.",
    },
    {
      name: "Anjali Patel",
      rating: 5,
      text: "Traditional taste with premium quality. Their customer service is excellent. Highly recommended!",
    },
  ];

  const features = [
    {
      icon: Heart,
      title: "Made with Love",
      description: "Every sweet is crafted with care and traditional recipes",
    },
    {
      icon: Gift,
      title: "Premium Packaging",
      description: "Elegant gift boxes perfect for every celebration",
    },
    {
      icon: Star,
      title: "Fresh Daily",
      description: "All sweets are made fresh every day with quality ingredients",
    },
    {
      icon: Clock,
      title: "Quick Delivery",
      description: "Fast and reliable delivery for all your festive needs",
    },
  ];

  const bestSellers = [
    {
      name: "Traditional Sweets",
      image: traditionalSweets,
      description: "Classic flavors that bring back childhood memories",
    },
    {
      name: "Premium Dry Fruits",
      image: dryFruits,
      description: "Hand-selected nuts and dried fruits",
    },
    {
      name: "Festive Gift Packs",
      image: giftPack,
      description: "Beautifully curated assortments for gifting",
    },
    {
      name: "Seasonal Specials",
      image: seasonalSpecial,
      description: "Limited edition sweets for special occasions",
    },
  ];

  return (
    <main>
      <HeroCarousel />

      {/* Features Section */}
      <section className="py-16 sm:py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="text-center hover:shadow-gold transition-all duration-300 hover:-translate-y-1 animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="pt-6">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full gradient-festive mb-4">
                    <feature.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Best Sellers Section */}
      <section className="py-16 sm:py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
              Our Best Sellers
            </h2>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
              Discover our most loved sweets and gift packs
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {bestSellers.map((product, index) => (
              <Card
                key={index}
                className="overflow-hidden hover:shadow-gold transition-all duration-300 hover:-translate-y-2 group animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="relative overflow-hidden aspect-square">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <CardContent className="p-4 sm:p-6">
                  <h3 className="text-lg sm:text-xl font-bold mb-2">
                    {product.name}
                  </h3>
                  <p className="text-sm sm:text-base text-muted-foreground mb-4">
                    {product.description}
                  </p>
                  <Button
                    variant="outline"
                    className="w-full hover:bg-primary hover:text-primary-foreground transition-colors"
                    asChild
                  >
                    <Link to="/products">View Details</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center mt-8 sm:mt-12">
            <Button
              size="lg"
              asChild
              className="gradient-festive hover:opacity-90 transition-opacity shadow-gold"
            >
              <Link to="/products">View All Products</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 sm:py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
              What Our Customers Say
            </h2>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
              Join thousands of happy customers who celebrate with us
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {testimonials.map((testimonial, index) => (
              <Card
                key={index}
                className="hover:shadow-gold transition-all duration-300 hover:-translate-y-1 animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-6">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-5 w-5 fill-secondary text-secondary"
                      />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-4 italic">
                    "{testimonial.text}"
                  </p>
                  <p className="font-bold">{testimonial.name}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-20 gradient-hero relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-20 h-20 bg-white rounded-full animate-float" />
          <div className="absolute bottom-20 right-20 w-32 h-32 bg-white rounded-full animate-float" style={{ animationDelay: "1s" }} />
          <div className="absolute top-40 right-40 w-16 h-16 bg-white rounded-full animate-float" style={{ animationDelay: "2s" }} />
        </div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6">
            Ready to Sweeten Your Celebration?
          </h2>
          <p className="text-lg sm:text-xl text-white/90 mb-6 sm:mb-8 max-w-2xl mx-auto">
            Order now and experience the authentic taste of tradition
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              asChild
              className="bg-white text-foreground hover:bg-white/90 transition-colors text-base sm:text-lg px-6 sm:px-8 py-4 sm:py-6"
            >
              <Link to="/contact">Order Now</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              asChild
              className="border-white text-white hover:bg-white hover:text-foreground transition-all text-base sm:text-lg px-6 sm:px-8 py-4 sm:py-6"
            >
              <Link to="/products">Browse Menu</Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;
