import { Helmet } from "react-helmet-async";
import Layout from "@/components/layout/Layout";
import { Award, Sparkles, Flame, ShieldCheck, Truck } from "lucide-react";
import { bussinessAge } from "@/lib/utils";

const milestones = [
  { year: "", title: "Freshness", description: "Fresh, premium-quality ingredients" },
  { year: "", title: "Authenticity", description: "Authentic flavours with elegant presentation" },
  { year: "", title: "Modernization", description: "Upgraded to modern kitchen while preserving traditional recipes" },
  { year: "", title: "Delightfullness", description: "Irresistible taste that turns every celebration into a sweet memory." },
];

const values = [
  {
    icon: Flame,
    title: "Premium Quality",
    description: "Premium ingredients & refined taste for an unforgettable sweet experience",
  },
  {
    icon: Award,
    title: `${bussinessAge}+ Years Legacy`,
    description: "Three generations of sweet-making expertise and tradition",
  },
  {
    icon: ShieldCheck,
    title: "Hygienic Process",
    description: "Modern kitchen with strict hygiene standards and quality control",
  },
  {
    icon: Truck,
    title: "Trusted Catering",
    description: "Trusted name in Bareilly catering services",
  },
];

const About = () => {
  return (
    <>
      <Helmet>
        <title>About Us - Gupta Sweets | Our Heritage Story Since 1993</title>
        <meta 
          name="description" 
          content="Discover the heritage of Gupta Sweets - three generations of sweet-making excellence. Learn about our commitment to purity, tradition, and taste." 
        />
      </Helmet>
      <Layout>
        {/* Hero Section */}
        <section className="pt-32 pb-16 bg-gradient-hero relative overflow-hidden">
          <div className="absolute inset-0 indian-pattern opacity-5" />
          <Sparkles className="absolute top-20 right-20 w-8 h-8 text-accent/50 animate-sparkle" />
          <Sparkles className="absolute bottom-20 left-20 w-6 h-6 text-accent/40 animate-sparkle" style={{ animationDelay: "1s" }} />
          <div className="container mx-auto px-4 relative z-10 text-center">
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-primary-foreground mb-4">
              Our <span className="text-gradient-gold">Story</span>
            </h1>
            <p className="text-lg text-primary-foreground/80 max-w-2xl mx-auto">
              Three generations of sweet-making excellence, one commitment to purity
            </p>
          </div>
        </section>

        {/* Story Section */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Image */}
              <div className="relative">
                <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-xl">
                  <img
                    src="https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=800&h=600&fit=crop"
                    alt="Gupta Sweets Shop"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-gradient-gold rounded-2xl flex items-center justify-center shadow-lg">
                  <div className="text-center text-foreground">
                    <span className="block text-3xl font-bold font-serif">{bussinessAge}+</span>
                    <span className="text-sm">Years</span>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div>
                <span className="text-primary font-medium">Est. 1993</span>
                <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mt-2 mb-6">
                  A Legacy of{" "}
                  <span className="text-gradient-gold">Sweet Traditions</span>
                </h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    Gupta Sweets is one of the most trusted sweet shops in Bareilly, known for quality, authenticity, and hygienic preparation. From classic Indian sweets to modern desserts, every creation reflects our passion for excellence.
                  </p>
                  <p>
                    Building on this legacy, <strong className="text-foreground">Gupta Caterers</strong> delivers premium catering services for weddings, corporate events, and special celebrations—where taste, presentation, and precision matter most.
                  </p>
                  <p>
                    Led by Mohit Gupta, we blend tradition with innovation to create memorable food experiences.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Timeline Section */}
        <section className="py-20 bg-muted/50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-14">
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground">
                Our <span className="text-gradient-gold">Promises</span>
              </h2>
            </div>

            <div className="max-w-3xl mx-auto">
              {milestones.map((milestone, index) => (
                <div key={milestone.year} className="flex gap-6 mb-8 last:mb-0">
                  <div className="flex flex-col items-center">
                    <div className="w-16 h-16 rounded-full bg-gradient-gold flex items-center justify-center text-foreground font-bold shadow-lg">
                      {milestone.year}
                    </div>
                    {index < milestones.length - 1 && (
                      <div className="w-0.5 flex-1 bg-accent/30 mt-2" />
                    )}
                  </div>
                  <div className="pt-3 pb-8">
                    <h3 className="font-serif text-xl font-semibold text-foreground mb-2">
                      {milestone.title}
                    </h3>
                    <p className="text-muted-foreground">{milestone.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-14">
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">
                What Sets Us <span className="text-gradient-gold">Apart</span>
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Our commitment to excellence goes beyond just making sweets
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value) => (
                <div key={value.title} className="card-festive p-6 text-center">
                  <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-gradient-gold flex items-center justify-center">
                    <value.icon className="w-7 h-7 text-foreground" />
                  </div>
                  <h3 className="font-serif text-lg font-semibold text-foreground mb-2">
                    {value.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
};

export default About;
