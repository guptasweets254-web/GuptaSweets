import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useLocation } from 'react-router-dom';
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { MessageCircle, Search } from "lucide-react";
import { getProducts, getCategories } from "@/lib/api";
import { useSettings } from "@/contexts/SettingsContext";

const Menu = () => {
  const bussinessDetails = useSettings();
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [categories, setCategories] = useState<any[]>([]);
  const [items, setItems] = useState<any[]>([]);

  const location = useLocation();

  useEffect(() => {
    (async () => {
      try {
        const cats = await getCategories();
        setCategories([{ id: 'all', name: 'All Items', slug: 'all' }, ...cats]);
        const prods = await getProducts();
        // Normalize products for UI
        setItems(prods.map((p: any) => ({
          id: p.id,
          name: p.name,
          category: p.category?.slug || null,
          price: p.price,
          description: p.description,
          image: p.imageThumb || p.imageUrl,
        })));

        // check url for ?category=slug
        const qp = new URLSearchParams(location.search).get('category');
        if (qp) setActiveCategory(qp);
      } catch (err) {
        console.error('Failed to load menu', err);
      }
    })();
  }, [location.search]);

  const filteredItems = items.filter((item) => {
    const matchesCategory = activeCategory === "all" || item.category === activeCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleWhatsAppOrder = (itemName: string) => {
    const message = encodeURIComponent(`Hello! I would like to order ${itemName} from Gupta Sweets.`);
    window.open(`https://wa.me/+91${bussinessDetails.settings?.whatsapp}?text=${message}`, "_blank");
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
              A refined selection of traditional and modern mithai—crafted fresh daily using premium ghee, dry fruits, and high-quality ingredients.
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
              {categories.map((category) => (
                <button
                  key={category.slug || category.id}
                  onClick={() => setActiveCategory(category.slug || category.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    activeCategory === (category.slug || category.id)
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
                      ₹{item.price}
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
                    <div className="flex w-full gap-2 items-center">
                      <Button
                        variant="whatsapp"
                        size="sm"
                        className="w-2/3 gap-2 py-6"
                        onClick={() => handleWhatsAppOrder(item.name)}
                      >
                        <MessageCircle className="w-4 h-4" />
                        Order on WhatsApp
                      </Button>

                      <div className="flex w-1/3 gap-2">
                        {bussinessDetails.settings?.zomato && (
                          <Button asChild size="icon" className="p-0 bg-[#FF3B30] hover:bg-[#e0342a] text-white" >
                            <a href={bussinessDetails.settings.zomato} target="_blank" rel="noopener noreferrer" title="Order on Zomato" aria-label="Order on Zomato">
                              <img src="/images/Icon.png" alt="order with zomato"/>
                            </a>
                          </Button>
                        )}

                        {bussinessDetails.settings?.swiggy && (
                          <Button asChild size="icon" className="p-0 bg-[#fc8019] hover:bg-[#e26b00] text-white" >
                            <a href={bussinessDetails.settings.swiggy} target="_blank" rel="noopener noreferrer" title="Order on Swiggy" aria-label="Order on Swiggy">
                              <img src="/images/SwiggyIcon.jpeg" alt="order with swiggy"/>
                            </a>
                          </Button>
                        )}
                      </div>
                    </div>
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
