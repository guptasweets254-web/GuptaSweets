import { Gift, Sparkles, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSettings } from "@/contexts/SettingsContext";

const FestiveOfferSection = () => {
  const bussinessDetails = useSettings();
  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-festive" />
      <div className="absolute inset-0 indian-pattern opacity-10" />

      {/* Floating Sparkles */}
      <Sparkles className="absolute top-10 left-[10%] w-6 h-6 text-accent/60 animate-sparkle" />
      <Sparkles className="absolute top-20 right-[15%] w-8 h-8 text-accent/50 animate-sparkle" style={{ animationDelay: "0.5s" }} />
      <Sparkles className="absolute bottom-20 left-[20%] w-5 h-5 text-accent/40 animate-sparkle" style={{ animationDelay: "1s" }} />
      <Sparkles className="absolute bottom-10 right-[25%] w-7 h-7 text-accent/50 animate-sparkle" style={{ animationDelay: "1.5s" }} />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-accent/20 backdrop-blur-sm rounded-full px-4 py-2 mb-6 border border-accent/30">
            <Gift className="w-4 h-4 text-accent" />
            <span className="text-sm font-medium text-accent">Special Festival Offer</span>
          </div>

          {/* Heading */}
          <h2 className="font-serif text-3xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-6">
            Celebrate This{" "}
            <span className="text-gradient-gold">Festive Season</span>
            <br />
            with {bussinessDetails.settings?.siteName}
          </h2>

          {/* Description */}
          <p className="text-lg text-primary-foreground/80 max-w-2xl mx-auto mb-8">
            Make your celebrations sweeter with our exclusive festive gift boxes, 
            perfect for Diwali, weddings, and special occasions. 
            <span className="font-semibold text-accent"> Get 15% off on bulk orders!</span>
          </p>

          {/* Features */}
          <div className="flex flex-wrap justify-center gap-6 mb-10">
            {[
              "Premium Gift Packaging",
              "Bulk Order Discounts",
              "Free Delivery Above ₹1000",
            ].map((feature) => (
              <div
                key={feature}
                className="flex items-center gap-2 text-primary-foreground/90"
              >
                <div className="w-2 h-2 bg-accent rounded-full" />
                <span className="text-sm font-medium">{feature}</span>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href={`tel:+91${bussinessDetails.settings?.phone}`}>
              <Button variant="hero" size="xl" className="gap-2">
                <Phone className="w-5 h-5" />
                Book Your Order Now
              </Button>
            </a>
          </div>
        </div>
      </div>

      {/* Decorative diyas */}
      <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-gold opacity-50" />
    </section>
  );
};

export default FestiveOfferSection;
