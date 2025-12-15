import { useState } from "react";
import { Helmet } from "react-helmet-async";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { MessageCircle, Search } from "lucide-react";

const menuCategories = [
  { id: "all", name: "All Items" },
  { id: "milk-sweets", name: "Milk Sweets" },
  { id: "dry-fruit", name: "Dry Fruit Sweets" },
  { id: "laddoos", name: "Laddoos & Mithai" },
  { id: "bengali", name: "Bengali Sweets" },
  { id: "namkeen", name: "Namkeen & Savories" },
  { id: "cakes", name: "Cakes & Pastries" },
];

const menuItems = [
  // Milk Sweets
  { id: 1, name: "Milk Barfi", category: "milk-sweets", price: "₹400/kg", description: "Classic milk-based barfi with cardamom", image: "https://images.unsplash.com/photo-1589647363585-f4a7d3877b10?w=300&h=200&fit=crop" },
  { id: 2, name: "Khoya Peda", category: "milk-sweets", price: "₹450/kg", description: "Soft khoya pedas with saffron", image: "https://images.unsplash.com/photo-1599599810769-bcde5a160d32?w=300&h=200&fit=crop" },
  { id: 3, name: "Kalakand", category: "milk-sweets", price: "₹500/kg", description: "Grainy milk cake with cardamom", image: "https://images.unsplash.com/photo-1605197161470-5c33f0e7908e?w=300&h=200&fit=crop" },
  
  // Dry Fruit Sweets
  { id: 4, name: "Kaju Katli", category: "dry-fruit", price: "₹800/kg", description: "Premium cashew diamond cuts", image: "https://images.unsplash.com/photo-1599599810769-bcde5a160d32?w=300&h=200&fit=crop" },
  { id: 5, name: "Badam Barfi", category: "dry-fruit", price: "₹750/kg", description: "Rich almond barfi with silver foil", image: "https://images.unsplash.com/photo-1589647363585-f4a7d3877b10?w=300&h=200&fit=crop" },
  { id: 6, name: "Pista Roll", category: "dry-fruit", price: "₹900/kg", description: "Rolled pistachio delight", image: "https://images.unsplash.com/photo-1627308595171-d1b5d67129c4?w=300&h=200&fit=crop" },
  { id: 7, name: "Anjeer Barfi", category: "dry-fruit", price: "₹700/kg", description: "Fig and dry fruit barfi", image: "https://images.unsplash.com/photo-1605197161470-5c33f0e7908e?w=300&h=200&fit=crop" },
  
  // Laddoos
  { id: 8, name: "Motichoor Laddoo", category: "laddoos", price: "₹500/kg", description: "Traditional boondi laddoos", image: "https://images.unsplash.com/photo-1627308595171-d1b5d67129c4?w=300&h=200&fit=crop" },
  { id: 9, name: "Besan Laddoo", category: "laddoos", price: "₹450/kg", description: "Ghee-roasted gram flour laddoos", image: "https://images.unsplash.com/photo-1599599810769-bcde5a160d32?w=300&h=200&fit=crop" },
  { id: 10, name: "Coconut Laddoo", category: "laddoos", price: "₹400/kg", description: "Fresh coconut laddoos", image: "https://images.unsplash.com/photo-1589647363585-f4a7d3877b10?w=300&h=200&fit=crop" },
  
  // Bengali Sweets
  { id: 11, name: "Rasgulla", category: "bengali", price: "₹350/kg", description: "Soft spongy cottage cheese balls", image: "https://images.unsplash.com/photo-1605197161470-5c33f0e7908e?w=300&h=200&fit=crop" },
  { id: 12, name: "Rasmalai", category: "bengali", price: "₹500/kg", description: "Creamy milk-soaked patties", image: "https://images.unsplash.com/photo-1589647363585-f4a7d3877b10?w=300&h=200&fit=crop" },
  { id: 13, name: "Sandesh", category: "bengali", price: "₹450/kg", description: "Delicate Bengali cottage cheese sweet", image: "https://images.unsplash.com/photo-1599599810769-bcde5a160d32?w=300&h=200&fit=crop" },
  { id: 14, name: "Chomchom", category: "bengali", price: "₹400/kg", description: "Cylindrical Bengali sweet", image: "https://images.unsplash.com/photo-1627308595171-d1b5d67129c4?w=300&h=200&fit=crop" },
  
  // Namkeen
  { id: 15, name: "Samosa", category: "namkeen", price: "₹20/pc", description: "Crispy potato-filled triangles", image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=300&h=200&fit=crop" },
  { id: 16, name: "Kachori", category: "namkeen", price: "₹25/pc", description: "Spiced lentil-filled crispy balls", image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=300&h=200&fit=crop" },
  { id: 17, name: "Namak Pare", category: "namkeen", price: "₹200/kg", description: "Crunchy salted diamond snacks", image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=300&h=200&fit=crop" },
  
  // Cakes
  { id: 18, name: "Chocolate Truffle", category: "cakes", price: "₹800/kg", description: "Rich chocolate layered cake", image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=300&h=200&fit=crop" },
  { id: 19, name: "Black Forest", category: "cakes", price: "₹750/kg", description: "Classic cherry chocolate cake", image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=300&h=200&fit=crop" },
  { id: 20, name: "Pineapple Cake", category: "cakes", price: "₹650/kg", description: "Fresh pineapple cream cake", image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=300&h=200&fit=crop" },
];

const Menu = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredItems = menuItems.filter((item) => {
    const matchesCategory = activeCategory === "all" || item.category === activeCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleWhatsAppOrder = (itemName: string) => {
    const message = encodeURIComponent(`Hello! I would like to order ${itemName} from Gupta Sweets.`);
    window.open(`https://wa.me/919876543210?text=${message}`, "_blank");
  };

  return (
    <>
      <Helmet>
        <title>Menu - Gupta Sweets | Indian Sweets, Namkeen & Cakes</title>
        <meta 
          name="description" 
          content="Explore our delicious menu of traditional Indian sweets, Bengali mishti, dry fruit sweets, namkeen and cakes. Order on WhatsApp for quick delivery." 
        />
      </Helmet>
      <Layout>
        {/* Hero Section */}
        <section className="pt-32 pb-16 bg-gradient-hero relative overflow-hidden">
          <div className="absolute inset-0 indian-pattern opacity-5" />
          <div className="container mx-auto px-4 relative z-10 text-center">
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-primary-foreground mb-4">
              Our <span className="text-gradient-gold">Menu</span>
            </h1>
            <p className="text-lg text-primary-foreground/80 max-w-2xl mx-auto">
              Discover our handcrafted sweets made with love and pure ingredients
            </p>
          </div>
        </section>

        {/* Menu Section */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            {/* Search Bar */}
            <div className="max-w-md mx-auto mb-8">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search sweets..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 rounded-full border border-border bg-card focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </div>
            </div>

            {/* Category Tabs */}
            <div className="flex flex-wrap justify-center gap-2 mb-12">
              {menuCategories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    activeCategory === category.id
                      ? "bg-gradient-gold text-foreground shadow-lg"
                      : "bg-muted text-muted-foreground hover:bg-muted/80"
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>

            {/* Menu Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredItems.map((item) => (
                <div
                  key={item.id}
                  className="card-festive group transition-all duration-300 hover:-translate-y-1"
                >
                  {/* Image */}
                  <div className="relative h-40 overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute top-3 right-3 bg-accent text-foreground text-sm font-semibold px-3 py-1 rounded-full">
                      {item.price}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-4">
                    <h3 className="font-serif text-lg font-semibold text-foreground mb-1">
                      {item.name}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      {item.description}
                    </p>
                    <Button
                      variant="whatsapp"
                      size="sm"
                      className="w-full gap-2"
                      onClick={() => handleWhatsAppOrder(item.name)}
                    >
                      <MessageCircle className="w-4 h-4" />
                      Order on WhatsApp
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            {filteredItems.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No items found matching your search.</p>
              </div>
            )}
          </div>
        </section>
      </Layout>
    </>
  );
};

export default Menu;
