import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Priya Sharma",
    location: "Delhi",
    rating: 5,
    text: "The Kaju Katli from Gupta Sweets is absolutely divine! It melts in your mouth. I've been ordering from them for all our family celebrations for the past 10 years.",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop",
  },
  {
    id: 2,
    name: "Rajesh Agarwal",
    location: "Noida",
    rating: 5,
    text: "Best sweets in Delhi! The purity and taste remind me of my grandmother's homemade sweets. Their Diwali gift boxes are always a hit with our clients.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop",
  },
  {
    id: 3,
    name: "Anita Gupta",
    location: "Gurgaon",
    rating: 5,
    text: "I ordered sweets for my daughter's wedding from Gupta Sweets. The presentation was beautiful and guests couldn't stop praising the quality. Highly recommended!",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop",
  },
  {
    id: 4,
    name: "Vikram Singh",
    location: "Delhi",
    rating: 5,
    text: "The rasgullas here are unmatched! Soft, spongy, and perfectly sweet. My go-to place for all Bengali sweets. The service is always warm and welcoming.",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop",
  },
];

const TestimonialsSection = () => {
  const [current, setCurrent] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

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
                {[...Array(testimonials[current].rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-accent fill-accent" />
                ))}
              </div>

              {/* Text */}
              <p className="text-lg md:text-xl text-foreground/90 italic mb-8 leading-relaxed">
                "{testimonials[current].text}"
              </p>

              {/* Author */}
              <div className="flex items-center justify-center gap-4">
                <img
                  src={testimonials[current].avatar}
                  alt={testimonials[current].name}
                  className="w-14 h-14 rounded-full object-cover border-2 border-accent"
                />
                <div className="text-left">
                  <h4 className="font-semibold text-foreground">
                    {testimonials[current].name}
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {testimonials[current].location}
                  </p>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex justify-center gap-4 mt-8">
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
            </div>

            {/* Dots */}
            <div className="flex justify-center gap-2 mt-6">
              {testimonials.map((_, index) => (
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
