import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Instagram, Facebook, Clock } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-maroon text-primary-foreground relative overflow-hidden">
      {/* Decorative Pattern */}
      <div className="absolute inset-0 indian-pattern opacity-10" />
      
      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-gradient-gold flex items-center justify-center">
                <span className="font-serif text-xl font-bold text-foreground">G</span>
              </div>
              <div>
                <h3 className="font-serif text-xl font-bold">Gupta Sweets</h3>
                <p className="text-sm opacity-80">Since 1975</p>
              </div>
            </div>
            <p className="text-sm opacity-80 leading-relaxed mb-4">
              Crafting moments of sweetness with pure ingredients and traditional recipes 
              passed down through generations.
            </p>
            <div className="flex gap-3">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center hover:bg-accent hover:text-foreground transition-all"
              >
                <Instagram size={18} />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center hover:bg-accent hover:text-foreground transition-all"
              >
                <Facebook size={18} />
              </a>
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
                <span>123 Sweet Lane, Chandni Chowk, Old Delhi, Delhi 110006</span>
              </li>
              <li className="flex items-center gap-3 text-sm opacity-80">
                <Phone size={18} className="flex-shrink-0" />
                <a href="tel:+919876543210" className="hover:text-accent transition-colors">
                  +91 98765 43210
                </a>
              </li>
              <li className="flex items-center gap-3 text-sm opacity-80">
                <Mail size={18} className="flex-shrink-0" />
                <a href="mailto:info@guptasweets.com" className="hover:text-accent transition-colors">
                  info@guptasweets.com
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
                  <p>Monday - Saturday</p>
                  <p className="text-accent">8:00 AM - 9:00 PM</p>
                </div>
              </li>
              <li className="flex items-center gap-3 text-sm opacity-80">
                <Clock size={18} className="flex-shrink-0" />
                <div>
                  <p>Sunday</p>
                  <p className="text-accent">9:00 AM - 8:00 PM</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-accent/20 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm opacity-60">
            © {new Date().getFullYear()} Gupta Sweets. All rights reserved.
          </p>
          <p className="text-sm opacity-60">
            Made with ❤️ for sweet lovers
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
