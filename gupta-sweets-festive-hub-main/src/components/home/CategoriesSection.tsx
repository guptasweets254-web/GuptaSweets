import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const categories = [
  {
    id: 1,
    name: "Traditional Sweets",
    description: "Classic Indian mithai made with pure ghee",
    image: "https://images.unsplash.com/photo-1589647363585-f4a7d3877b10?w=400&h=300&fit=crop",
    items: ["Barfi", "Peda", "Halwa"],
  },
  {
    id: 2,
    name: "Bengali Sweets",
    description: "Authentic Mishti from Bengal",
    image: "https://images.unsplash.com/photo-1605197161470-5c33f0e7908e?w=400&h=300&fit=crop",
    items: ["Rasgulla", "Rasmalai", "Sandesh"],
  },
  {
    id: 3,
    name: "Dry Fruit Sweets",
    description: "Premium sweets with rich dry fruits",
    image: "https://images.unsplash.com/photo-1599599810769-bcde5a160d32?w=400&h=300&fit=crop",
    items: ["Kaju Katli", "Badam Barfi", "Pista Roll"],
  },
  {
    id: 4,
    name: "Namkeen & Snacks",
    description: "Crispy savories for every occasion",
    image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400&h=300&fit=crop",
    items: ["Samosa", "Kachori", "Namak Pare"],
  },
  {
    id: 5,
    name: "Cakes & Desserts",
    description: "Modern fusion desserts",
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=300&fit=crop",
    items: ["Chocolate Cake", "Pastries", "Brownies"],
  },
  {
    id: 6,
    name: "Festive Specials",
    description: "Seasonal delights for celebrations",
    image: "https://images.unsplash.com/photo-1627308595171-d1b5d67129c4?w=400&h=300&fit=crop",
    items: ["Diwali Box", "Wedding Tray", "Gift Hampers"],
  },
];

const CategoriesSection = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-14">
          <span className="inline-block text-primary font-medium mb-2">Our Collection</span>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Explore Our <span className="text-gradient-gold">Sweet Categories</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            From traditional Indian mithai to modern desserts, discover our handcrafted 
            sweets made with love and pure ingredients
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category, index) => (
            <Link
              key={category.id}
              to="/menu"
              className="group card-festive transition-all duration-300 hover:-translate-y-2"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="font-serif text-xl font-semibold text-primary-foreground">
                    {category.name}
                  </h3>
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <p className="text-muted-foreground text-sm mb-3">
                  {category.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {category.items.map((item) => (
                    <span
                      key={item}
                      className="text-xs px-2 py-1 bg-accent/10 text-accent-foreground rounded-full"
                    >
                      {item}
                    </span>
                  ))}
                </div>
                <div className="flex items-center text-primary font-medium text-sm group-hover:gap-2 transition-all">
                  View Menu
                  <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;
