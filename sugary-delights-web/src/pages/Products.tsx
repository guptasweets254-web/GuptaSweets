import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import traditionalSweets from "@/assets/traditional-sweets.jpg";
import dryFruits from "@/assets/dry-fruits.jpg";
import giftPack from "@/assets/gift-pack.jpg";
import seasonalSpecial from "@/assets/seasonal-special.jpg";

const Products = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = [
    { id: "all", name: "All Products" },
    { id: "traditional", name: "Traditional Sweets" },
    { id: "dry-fruits", name: "Dry Fruits" },
    { id: "gift-packs", name: "Gift Packs" },
    { id: "seasonal", name: "Seasonal Special" },
  ];

  const products = [
    {
      id: 1,
      name: "Gulab Jamun",
      category: "traditional",
      image: traditionalSweets,
      description: "Soft, syrup-soaked milk solids",
      price: "$12.99",
    },
    {
      id: 2,
      name: "Kaju Katli",
      category: "traditional",
      image: traditionalSweets,
      description: "Diamond-shaped cashew fudge",
      price: "$18.99",
    },
    {
      id: 3,
      name: "Rasgulla",
      category: "traditional",
      image: traditionalSweets,
      description: "Spongy cottage cheese balls in syrup",
      price: "$10.99",
    },
    {
      id: 4,
      name: "Barfi Assortment",
      category: "traditional",
      image: traditionalSweets,
      description: "Variety of milk-based fudge",
      price: "$15.99",
    },
    {
      id: 5,
      name: "Premium Almonds",
      category: "dry-fruits",
      image: dryFruits,
      description: "California almonds",
      price: "$22.99",
    },
    {
      id: 6,
      name: "Cashew Nuts",
      category: "dry-fruits",
      image: dryFruits,
      description: "Whole roasted cashews",
      price: "$24.99",
    },
    {
      id: 7,
      name: "Pistachio Pack",
      category: "dry-fruits",
      image: dryFruits,
      description: "Premium Iranian pistachios",
      price: "$28.99",
    },
    {
      id: 8,
      name: "Mixed Dry Fruits",
      category: "dry-fruits",
      image: dryFruits,
      description: "Assorted nuts and dried fruits",
      price: "$32.99",
    },
    {
      id: 9,
      name: "Festive Deluxe Box",
      category: "gift-packs",
      image: giftPack,
      description: "Premium assortment for celebrations",
      price: "$49.99",
    },
    {
      id: 10,
      name: "Traditional Gift Set",
      category: "gift-packs",
      image: giftPack,
      description: "Classic sweets beautifully packaged",
      price: "$39.99",
    },
    {
      id: 11,
      name: "Premium Gift Hamper",
      category: "gift-packs",
      image: giftPack,
      description: "Luxurious gift box with dry fruits",
      price: "$59.99",
    },
    {
      id: 12,
      name: "Corporate Gift Pack",
      category: "gift-packs",
      image: giftPack,
      description: "Elegant packaging for business gifting",
      price: "$79.99",
    },
    {
      id: 13,
      name: "Diwali Special Combo",
      category: "seasonal",
      image: seasonalSpecial,
      description: "Limited edition festive assortment",
      price: "$44.99",
    },
    {
      id: 14,
      name: "Holi Special Mix",
      category: "seasonal",
      image: seasonalSpecial,
      description: "Colorful celebration sweets",
      price: "$34.99",
    },
    {
      id: 15,
      name: "Wedding Special Pack",
      category: "seasonal",
      image: seasonalSpecial,
      description: "Elegant selection for weddings",
      price: "$69.99",
    },
    {
      id: 16,
      name: "Rakhi Special Box",
      category: "seasonal",
      image: seasonalSpecial,
      description: "Perfect for sibling celebrations",
      price: "$29.99",
    },
  ];

  const filteredProducts =
    selectedCategory === "all"
      ? products
      : products.filter((p) => p.category === selectedCategory);

  return (
    <main className="pt-20">
      {/* Hero Section */}
      <section className="py-16 sm:py-20 bg-gradient-to-b from-muted/30 to-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto animate-fade-in">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
              Our Premium Selection
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground">
              Discover authentic traditional sweets, premium dry fruits, and beautifully curated gift packs
            </p>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-16 sm:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Tabs defaultValue="all" className="w-full" onValueChange={setSelectedCategory}>
            <TabsList className="grid w-full grid-cols-2 lg:grid-cols-5 mb-12 h-auto">
              {categories.map((category) => (
                <TabsTrigger
                  key={category.id}
                  value={category.id}
                  className="text-sm sm:text-base py-3 data-[state=active]:gradient-festive data-[state=active]:text-white"
                >
                  {category.name}
                </TabsTrigger>
              ))}
            </TabsList>

            {categories.map((category) => (
              <TabsContent key={category.id} value={category.id} className="mt-0">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
                  {filteredProducts.map((product, index) => (
                    <Card
                      key={product.id}
                      className="overflow-hidden hover:shadow-gold transition-all duration-300 hover:-translate-y-2 group animate-fade-in"
                      style={{ animationDelay: `${index * 0.05}s` }}
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
                        <p className="text-sm sm:text-base text-muted-foreground mb-3">
                          {product.description}
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="text-xl sm:text-2xl font-bold text-primary">
                            {product.price}
                          </span>
                          <Button
                            size="sm"
                            className="gradient-festive hover:opacity-90 transition-opacity"
                          >
                            Enquire
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-20 gradient-hero relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-20 h-20 bg-white rounded-full animate-float" />
          <div className="absolute bottom-20 right-20 w-32 h-32 bg-white rounded-full animate-float" style={{ animationDelay: "1s" }} />
        </div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6">
            Can't Find What You're Looking For?
          </h2>
          <p className="text-lg sm:text-xl text-white/90 mb-6 sm:mb-8 max-w-2xl mx-auto">
            Contact us for custom orders and special requests
          </p>
          <Button
            size="lg"
            asChild
            className="bg-white text-foreground hover:bg-white/90 transition-colors text-base sm:text-lg px-6 sm:px-8 py-4 sm:py-6"
          >
            <a href="/contact">Get in Touch</a>
          </Button>
        </div>
      </section>
    </main>
  );
};

export default Products;
