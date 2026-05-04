import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Instagram, Facebook, Clock, Twitter, Youtube, Heart} from "lucide-react";
import { useSettings } from "@/contexts/SettingsContext";

const Footer = () => {
  const bussinessDetails = useSettings();
  return (
    <footer className="bg-maroon text-primary-foreground relative overflow-hidden">
      {/* Decorative Pattern */}
      <div className="absolute inset-0 indian-pattern opacity-10" />
      
      <div className="container mx-auto px-4 py-4 relative z-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-gradient-gold flex items-center justify-center">
                {bussinessDetails.settings?.logoUrl ? (
              <img src={bussinessDetails.settings?.logoUrl} alt="Logo" className="w-full h-full object-cover rounded-full" />
              ) : (
              <span className="font-serif text-xl font-bold text-foreground">{bussinessDetails.settings?.siteName[0]}</span>
              )}
              </div>
              <div>
                <h3 className="font-serif text-xl font-bold">{bussinessDetails.settings?.siteName}</h3>
                <p className="text-sm opacity-80">Since 1993</p>
              </div>
            </div>
            <p className="text-sm opacity-80 leading-relaxed mb-4">
              {bussinessDetails.settings?.tagline || 'Authentic Indian sweets made with pure desi ghee and traditional recipes.'}
            </p>
            <div className="flex gap-3">
              {
                bussinessDetails.settings?.instagram ? 
                <>
              <a
                href={bussinessDetails.settings?.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center hover:bg-accent hover:text-foreground transition-all"
              >
                <Instagram size={18} />
              </a>
              </> : null
            }
            {
                bussinessDetails.settings?.facebook ? 
                <>
              <a
                href={bussinessDetails.settings?.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center hover:bg-accent hover:text-foreground transition-all"
              >
                <Facebook size={18} />
              </a>
              </> : null
            }
            {
                bussinessDetails.settings?.twitter ? 
                <>
              <a
                href={bussinessDetails.settings?.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center hover:bg-accent hover:text-foreground transition-all"
              >
                <Twitter size={18} />
              </a>
              </> : null
            }
            {
                bussinessDetails.settings?.youtube ? 
                <>
              <a
                href={bussinessDetails.settings?.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center hover:bg-accent hover:text-foreground transition-all"
              >
                <Youtube size={18} />
              </a>
              </> : null
            }
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-serif text-lg font-semibold mb-4 text-accent">Quick Links</h4>
            <ul className="space-y-2">
              {["Home", "Menu", "Gallery", "About", "Contact"].map((item) => (
                <li key={item}>
                  <Link
                    to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                    className="text-sm opacity-80 hover:opacity-100 hover:text-accent transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-serif text-lg font-semibold mb-4 text-accent">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-sm opacity-80">
                <MapPin size={18} className="flex-shrink-0 mt-0.5" />
                <span><a className="hover:text-accent transition-colors" href={"https://maps.app.goo.gl/5sKCXdZE2V2jU8bs9"} target="_blank">{bussinessDetails.settings?.address}</a></span>
              </li>
              <li className="flex items-center gap-3 text-sm opacity-80">
                <Phone size={18} className="flex-shrink-0" />
                <a href={`tel:+91${bussinessDetails.settings?.phone?.replace(/\D/g, '')}`} className="hover:text-accent transition-colors">
                  +91 {bussinessDetails.settings?.phone}
                </a>
              </li>
              <li className="flex items-center gap-3 text-sm opacity-80">
                <Mail size={18} className="flex-shrink-0" />
                <a href={`mailto:${bussinessDetails.settings?.email}`} className="hover:text-accent transition-colors">
                  {bussinessDetails.settings?.email}
                </a>
              </li>
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h4 className="font-serif text-lg font-semibold mb-4 text-accent">Business Hours</h4>
            <ul className="space-y-2">
              <li className="flex items-center gap-3 text-sm opacity-80">
                <Clock size={18} className="flex-shrink-0" />
                <div>
                  {bussinessDetails.settings?.businessHours}
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-4 pt-4 border-t border-accent/20 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm opacity-60">
            © {new Date().getFullYear()} {bussinessDetails.settings?.siteName}. All rights reserved.
          </p>
          <p className="text-center md:text-right flex items-center justify-center gap-1 md:justify-end">
            Crafted with Love
            <Heart className="h-3 w-3 text-red-500 fill-red-500 animate-pulse" />
            by{" "}
            <a
              href="https://datetechsolution.store"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-primary hover:underline"
            >
              Datetech Solution
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
