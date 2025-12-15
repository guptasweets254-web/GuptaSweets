import { Helmet } from "react-helmet-async";
import Layout from "@/components/layout/Layout";
import HeroSection from "@/components/home/HeroSection";
import FeaturesSection from "@/components/home/FeaturesSection";
import CategoriesSection from "@/components/home/CategoriesSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import FestiveOfferSection from "@/components/home/FestiveOfferSection";

const Index = () => {
  return (
    <>
      <Helmet>
        <title>Gupta Sweets - Premium Indian Sweets | Traditional Mithai Since 1975</title>
        <meta 
          name="description" 
          content="Experience authentic Indian sweets made with pure desi ghee at Gupta Sweets. Order Kaju Katli, Rasgulla, Barfi & more. Trusted by families for 50+ years in Delhi." 
        />
        <meta name="keywords" content="Indian sweets, mithai, Kaju Katli, Rasgulla, Delhi sweets, wedding sweets, Diwali sweets" />
      </Helmet>
      <Layout>
        <HeroSection />
        <FeaturesSection />
        <CategoriesSection />
        <FestiveOfferSection />
        <TestimonialsSection />
      </Layout>
    </>
  );
};

export default Index;
