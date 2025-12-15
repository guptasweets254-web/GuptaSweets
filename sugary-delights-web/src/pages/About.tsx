import { Award, Users, Clock, Heart } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import aboutStory from "@/assets/about-story.jpg";

const About = () => {
  const milestones = [
    { year: "1985", title: "Our Beginning", description: "Started as a small family shop" },
    { year: "1995", title: "Expansion", description: "Opened multiple locations" },
    { year: "2005", title: "Recognition", description: "Won Best Sweet Shop Award" },
    { year: "2015", title: "Going Digital", description: "Launched online ordering" },
    { year: "2025", title: "Today", description: "Serving thousands of happy customers" },
  ];

  const values = [
    {
      icon: Heart,
      title: "Quality First",
      description: "We use only the finest ingredients and traditional recipes",
    },
    {
      icon: Users,
      title: "Customer Satisfaction",
      description: "Your happiness is our success and motivation",
    },
    {
      icon: Clock,
      title: "Timeless Tradition",
      description: "Preserving authentic flavors for generations",
    },
    {
      icon: Award,
      title: "Excellence",
      description: "Committed to delivering the best in every bite",
    },
  ];

  return (
    <main className="pt-20">
      {/* Hero Section */}
      <section className="py-16 sm:py-20 bg-gradient-to-b from-muted/30 to-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto animate-fade-in">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
              Our Sweet Story
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground">
              Four decades of spreading joy through traditional sweets and authentic flavors
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 sm:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in">
              <img
                src={aboutStory}
                alt="Our Story"
                className="rounded-2xl shadow-gold w-full h-auto"
              />
            </div>
            <div className="space-y-6 animate-fade-in" style={{ animationDelay: "0.2s" }}>
              <h2 className="text-3xl sm:text-4xl font-bold">
                A Legacy of Sweetness Since 1985
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                What started as a small family business with a simple dream has blossomed into
                one of the most beloved sweet shops in the region. Our founder, inspired by
                his grandmother's recipes, set out to share authentic traditional sweets with
                the world.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Today, we continue to honor those time-tested recipes while embracing modern
                techniques to ensure every sweet maintains the perfect balance of tradition
                and quality. Each piece is crafted with the same love and care that started
                our journey four decades ago.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                From intimate family gatherings to grand celebrations, we've been privileged
                to be part of countless special moments. Our commitment remains unchanged: to
                bring joy to every celebration with sweets made from the heart.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-16 sm:py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Our Journey</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Milestones that shaped our story
            </p>
          </div>
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-festive hidden md:block" />
              
              {milestones.map((milestone, index) => (
                <div
                  key={index}
                  className={`relative mb-12 animate-fade-in ${
                    index % 2 === 0 ? "md:text-right" : "md:text-left"
                  }`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className={`md:w-1/2 ${index % 2 === 0 ? "md:pr-12" : "md:ml-auto md:pl-12"}`}>
                    <Card className="hover:shadow-gold transition-shadow">
                      <CardContent className="p-6">
                        <div className="text-3xl font-bold text-primary mb-2">
                          {milestone.year}
                        </div>
                        <h3 className="text-xl font-bold mb-2">{milestone.title}</h3>
                        <p className="text-muted-foreground">{milestone.description}</p>
                      </CardContent>
                    </Card>
                  </div>
                  {/* Timeline Dot */}
                  <div className="absolute left-1/2 top-6 transform -translate-x-1/2 w-4 h-4 rounded-full bg-secondary hidden md:block shadow-gold" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 sm:py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Our Values</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card
                key={index}
                className="text-center hover:shadow-gold transition-all duration-300 hover:-translate-y-1 animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="pt-6">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full gradient-festive mb-4">
                    <value.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{value.title}</h3>
                  <p className="text-muted-foreground">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 sm:py-20 gradient-hero relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-20 h-20 bg-white rounded-full animate-float" />
          <div className="absolute bottom-20 right-20 w-32 h-32 bg-white rounded-full animate-float" style={{ animationDelay: "1s" }} />
        </div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
            <div className="animate-fade-in">
              <div className="text-4xl sm:text-5xl font-bold mb-2">40+</div>
              <div className="text-lg sm:text-xl opacity-90">Years</div>
            </div>
            <div className="animate-fade-in" style={{ animationDelay: "0.1s" }}>
              <div className="text-4xl sm:text-5xl font-bold mb-2">50K+</div>
              <div className="text-lg sm:text-xl opacity-90">Happy Customers</div>
            </div>
            <div className="animate-fade-in" style={{ animationDelay: "0.2s" }}>
              <div className="text-4xl sm:text-5xl font-bold mb-2">100+</div>
              <div className="text-lg sm:text-xl opacity-90">Sweet Varieties</div>
            </div>
            <div className="animate-fade-in" style={{ animationDelay: "0.3s" }}>
              <div className="text-4xl sm:text-5xl font-bold mb-2">15+</div>
              <div className="text-lg sm:text-xl opacity-90">Awards Won</div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default About;
