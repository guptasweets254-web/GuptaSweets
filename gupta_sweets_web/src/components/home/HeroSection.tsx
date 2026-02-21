import { Phone, MessageCircle, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSettings } from "@/contexts/SettingsContext";
import { bussinessAge } from "@/lib/utils";

const HeroSection = () => {
  const bussinessDetails = useSettings();
  const phoneNumber = bussinessDetails.settings?.whatsapp;
  const message = encodeURIComponent(`Hello! I would like to order sweets from ${bussinessDetails.settings?.siteName}.`);
  const whatsappUrl = `https://wa.me/+91${phoneNumber}?text=${message}`;

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-hero" />
      
      {/* Decorative Elements */}
      <div className="absolute inset-0 indian-pattern opacity-5" />
      
      {/* Floating Decorations */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-accent/20 rounded-full blur-2xl animate-float" />
      <div className="absolute bottom-32 right-16 w-32 h-32 bg-primary/20 rounded-full blur-3xl animate-float" style={{ animationDelay: "2s" }} />
      <div className="absolute top-1/3 right-1/4 w-16 h-16 bg-accent/30 rounded-full blur-xl animate-float" style={{ animationDelay: "4s" }} />
      
      {/* Sparkle Decorations */}
      <Sparkles className="absolute top-36 md:top-34 right-2 md:right-20 w-8 h-8 text-accent/60 animate-sparkle" />
      <Sparkles className="absolute bottom-40 left-20 w-6 h-6 text-accent/40 animate-sparkle" style={{ animationDelay: "0.5s" }} />
      <Sparkles className="absolute top-1/2 left-1/4 w-5 h-5 text-accent/50 animate-sparkle" style={{ animationDelay: "1s" }} />

      {/* Content */}
      <div className="container mx-auto px-4 py-16 md:py-0 relative z-10 text-center">
        {/* Festive Badge */}
        <div className="hidden md:inline-flex items-center gap-2 bg-accent/20 backdrop-blur-sm rounded-full px-4 py-2 mb-8 animate-fade-in border border-accent/30">
          <Sparkles className="w-4 h-4 text-accent" />
          <span className="text-sm font-medium text-accent">Crafting Timeless Flavours for Memorable Celebrations Since 1993 </span>
          <Sparkles className="w-4 h-4 text-accent" />
        </div>

        {/* Main Heading */}
        <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl font-bold text-primary-foreground mb-6 leading-tight animate-fade-in" style={{ animationDelay: "0.2s" }}>
          Welcome to
          <span className="text-gradient-gold"> Gupta Sweets And Gupta Caterers</span>
          <br />
          for Pure Taste & Tradition
        </h1>

        {/* Subheading */}
        <p className="text-lg md:text-xl text-primary-foreground/80 max-w-2xl mx-auto mb-10 animate-fade-in" style={{ animationDelay: "0.4s" }}>
          Experience the authentic taste of handcrafted Indian Sweets made with{" "}
          a name synonymous with premium quality sweets in Bareilly, and Gupta Caterers, your trusted <span className="text-accent font-medium">partner for Luxury Catering </span>  services for events and weddings.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in" style={{ animationDelay: "0.6s" }}>
          <a href={`tel:+91${bussinessDetails.settings?.phone}`}>
            <Button variant="hero" size="xl" className="gap-3 min-w-[200px]">
              <Phone className="w-5 h-5" />
              Order on Call
            </Button>
          </a>
          <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
            <Button variant="whatsapp" size="xl" className="gap-3 min-w-[200px]">
              <MessageCircle className="w-5 h-5" />
              Order on WhatsApp
            </Button>
          </a>
        </div>

        {/* Trust Badges */}
        <div className="flex flex-wrap justify-center gap-6 mt-12 animate-fade-in" style={{ animationDelay: "0.8s" }}>
          {[
            "100% Pure Desi Ghee",
            "Handcrafted Daily",
            `${bussinessAge}+ Years Legacy`,
          ].map((badge) => (
            <div
              key={badge}
              className="flex items-center gap-2 text-primary-foreground/70 text-sm"
            >
              <div className="w-1.5 h-1.5 bg-accent rounded-full" />
              {badge}
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full"
        >
          <path
            d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
            fill="hsl(35 50% 97%)"
          />
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;
