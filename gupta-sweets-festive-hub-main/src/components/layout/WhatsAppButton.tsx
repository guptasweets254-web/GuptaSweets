import { MessageCircle } from "lucide-react";

const WhatsAppButton = () => {
  const phoneNumber = "919876543210";
  const message = encodeURIComponent("Hello! I would like to order sweets from Gupta Sweets.");
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 group"
      aria-label="Chat on WhatsApp"
    >
      <div className="relative">
        {/* Pulse Animation */}
        <div className="absolute inset-0 bg-[#25D366] rounded-full animate-ping opacity-30" />
        
        {/* Button */}
        <div className="relative w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300">
          <MessageCircle className="w-7 h-7 text-white" fill="white" />
        </div>

        {/* Tooltip */}
        <div className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-foreground text-background px-3 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity shadow-lg">
          Order on WhatsApp
        </div>
      </div>
    </a>
  );
};

export default WhatsAppButton;
