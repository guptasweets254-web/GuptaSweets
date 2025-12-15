import { useState } from "react";
import { Helmet } from "react-helmet-async";
import Layout from "@/components/layout/Layout";
import { X, ZoomIn } from "lucide-react";

const galleryCategories = ["All", "Sweets", "Gift Boxes", "Shop", "Events"];

const galleryImages = [
  { id: 1, src: "https://images.unsplash.com/photo-1589647363585-f4a7d3877b10?w=600&h=400&fit=crop", category: "Sweets", title: "Premium Barfi Collection" },
  { id: 2, src: "https://images.unsplash.com/photo-1599599810769-bcde5a160d32?w=600&h=400&fit=crop", category: "Sweets", title: "Kaju Katli" },
  { id: 3, src: "https://images.unsplash.com/photo-1605197161470-5c33f0e7908e?w=600&h=400&fit=crop", category: "Sweets", title: "Bengali Rasgulla" },
  { id: 4, src: "https://images.unsplash.com/photo-1627308595171-d1b5d67129c4?w=600&h=400&fit=crop", category: "Gift Boxes", title: "Festive Gift Hamper" },
  { id: 5, src: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=600&h=400&fit=crop", category: "Sweets", title: "Fresh Samosas" },
  { id: 6, src: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=600&h=400&fit=crop", category: "Sweets", title: "Celebration Cake" },
  { id: 7, src: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=600&h=400&fit=crop", category: "Shop", title: "Our Sweet Counter" },
  { id: 8, src: "https://images.unsplash.com/photo-1517433670267-08bbd4be890f?w=600&h=400&fit=crop", category: "Events", title: "Wedding Catering" },
  { id: 9, src: "https://images.unsplash.com/photo-1486427944299-d1955d23e34d?w=600&h=400&fit=crop", category: "Gift Boxes", title: "Diwali Special Box" },
  { id: 10, src: "https://images.unsplash.com/photo-1571167530149-c1105da4c2c7?w=600&h=400&fit=crop", category: "Sweets", title: "Motichoor Laddoo" },
  { id: 11, src: "https://images.unsplash.com/photo-1587314168485-3236d6710814?w=600&h=400&fit=crop", category: "Shop", title: "Our Heritage Store" },
  { id: 12, src: "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=600&h=400&fit=crop", category: "Events", title: "Corporate Event" },
];

const Gallery = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedImage, setSelectedImage] = useState<typeof galleryImages[0] | null>(null);

  const filteredImages = galleryImages.filter(
    (img) => activeCategory === "All" || img.category === activeCategory
  );

  return (
    <>
      <Helmet>
        <title>Gallery - Gupta Sweets | Sweet Moments Captured</title>
        <meta 
          name="description" 
          content="Explore our gallery of delicious Indian sweets, festive gift boxes, and special occasion moments at Gupta Sweets." 
        />
      </Helmet>
      <Layout>
        {/* Hero Section */}
        <section className="pt-32 pb-16 bg-gradient-hero relative overflow-hidden">
          <div className="absolute inset-0 indian-pattern opacity-5" />
          <div className="container mx-auto px-4 relative z-10 text-center">
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-primary-foreground mb-4">
              Our <span className="text-gradient-gold">Gallery</span>
            </h1>
            <p className="text-lg text-primary-foreground/80 max-w-2xl mx-auto">
              A visual feast of our handcrafted sweets and memorable moments
            </p>
          </div>
        </section>

        {/* Gallery Section */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            {/* Category Filter */}
            <div className="flex flex-wrap justify-center gap-2 mb-12">
              {galleryCategories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                    activeCategory === category
                      ? "bg-gradient-gold text-foreground shadow-lg"
                      : "bg-muted text-muted-foreground hover:bg-muted/80"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Gallery Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredImages.map((image) => (
                <div
                  key={image.id}
                  className="group relative aspect-square rounded-xl overflow-hidden cursor-pointer"
                  onClick={() => setSelectedImage(image)}
                >
                  <img
                    src={image.src}
                    alt={image.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/50 transition-colors flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity text-center">
                      <ZoomIn className="w-8 h-8 text-primary-foreground mx-auto mb-2" />
                      <p className="text-primary-foreground font-medium text-sm px-4">
                        {image.title}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Lightbox */}
        {selectedImage && (
          <div
            className="fixed inset-0 z-50 bg-foreground/90 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <button
              className="absolute top-6 right-6 text-primary-foreground hover:text-accent transition-colors"
              onClick={() => setSelectedImage(null)}
            >
              <X className="w-8 h-8" />
            </button>
            <div className="max-w-4xl max-h-[80vh] relative" onClick={(e) => e.stopPropagation()}>
              <img
                src={selectedImage.src}
                alt={selectedImage.title}
                className="w-full h-full object-contain rounded-lg"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-foreground/80 to-transparent p-6 rounded-b-lg">
                <h3 className="font-serif text-xl font-semibold text-primary-foreground">
                  {selectedImage.title}
                </h3>
                <p className="text-primary-foreground/70 text-sm">{selectedImage.category}</p>
              </div>
            </div>
          </div>
        )}
      </Layout>
    </>
  );
};

export default Gallery;
