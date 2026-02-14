import { bussinessAge } from "@/lib/utils";
import { Flame, Award, ShieldCheck, Truck } from "lucide-react";

const features = [
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

const FeaturesSection = () => {
  return (
    <section className="py-16 bg-muted/50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="text-center group"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-gold flex items-center justify-center shadow-lg group-hover:animate-glow-pulse transition-all">
                <feature.icon className="w-7 h-7 text-foreground" />
              </div>
              <h3 className="font-serif text-lg font-semibold text-foreground mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
