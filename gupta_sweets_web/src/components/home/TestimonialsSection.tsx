import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react";

import { getTestimonials } from "@/lib/api";

const testimonials = [];

const useTestimonials = () => {
  const [items, setItems] = useState<any[]>([]);
  useEffect(() => {
    (async () => {
      try {
        const data = await getTestimonials();
        setItems(data);
      } catch (err) {
        console.error('Failed to load testimonials', err);
      }
    })();
  }, []);
  return items;
};

const TestimonialsSection = () => {
  const items = useTestimonials();
  const [current, setCurrent] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % Math.max(1, items.length));
    }, 5000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, items.length]);

  const next = () => {
    setIsAutoPlaying(false);
    setCurrent((prev) => (prev + 1) % testimonials.length);
  };

  const prev = () => {
    setIsAutoPlaying(false);
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="py-20 bg-gradient-warm relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-10 left-10 w-32 h-32 bg-accent/10 rounded-full blur-3xl" />
      <div className="absolute bottom-10 right-10 w-40 h-40 bg-primary/10 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-14">
          <span className="inline-block text-primary font-medium mb-2">Testimonials</span>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            What Our <span className="text-gradient-gold">Customers Say</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Don't just take our word for it - hear from our beloved customers
          </p>
        </div>

        {/* Testimonial Carousel */}
        <div className="max-w-4xl mx-auto">
          <div className="relative bg-card rounded-2xl p-8 md:p-12 shadow-lg border border-border/50">
            {/* Quote Icon */}
            <Quote className="absolute top-6 left-6 w-12 h-12 text-accent/20" />

            {/* Testimonial Content */}
            <div className="text-center">
              {/* Stars */}
              <div className="flex justify-center gap-1 mb-6">
                {[...Array(items[current]?.rating || 0)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-accent fill-accent" />
                ))}
              </div>

              {/* Text */}
              <p className="text-lg md:text-xl text-foreground/90 italic mb-8 leading-relaxed">
                "{items[current]?.text || ''}"
              </p>

              {/* Author */}
              <div className="flex items-center justify-center gap-4">
                {items[current]?.avatarThumbUrl ? (
                  <img
                    src={items[current]?.avatarThumbUrl}
                    alt={items[current]?.name || 'testimonial'}
                    className="w-14 h-14 rounded-full object-cover border-2 border-accent"
                  />
                ) : (
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-saffron/10 text-lg font-semibold text-saffron">
                      {items[current]?.name.charAt(0)}
                  </div>
                )}
                <div className="text-left">
                  <h4 className="font-semibold text-foreground">
                    {items[current]?.name}
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {items[current]?.location}
                  </p>
                </div>
              </div>
            </div>

            {/* Navigation */}
            {/* <div className="flex justify-center gap-4 mt-8">
              <button
                onClick={prev}
                className="w-10 h-10 rounded-full bg-muted flex items-center justify-center hover:bg-accent hover:text-foreground transition-colors"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={next}
                className="w-10 h-10 rounded-full bg-muted flex items-center justify-center hover:bg-accent hover:text-foreground transition-colors"
                aria-label="Next testimonial"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div> */}

            {/* Dots */}
            <div className="flex justify-center gap-2 mt-6">
              {items.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setIsAutoPlaying(false);
                    setCurrent(index);
                  }}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === current ? "bg-accent w-6" : "bg-muted-foreground/30"
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
