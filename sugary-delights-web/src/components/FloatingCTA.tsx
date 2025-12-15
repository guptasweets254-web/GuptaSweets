import { Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const FloatingCTA = () => {
  return (
    <Link to="/contact" className="fixed bottom-6 right-6 z-40 md:hidden">
      <Button
        size="lg"
        className="h-14 w-14 rounded-full gradient-festive shadow-gold hover:opacity-90 transition-all animate-float"
        aria-label="Order Now"
      >
        <Phone className="h-6 w-6" />
      </Button>
    </Link>
  );
};

export default FloatingCTA;
