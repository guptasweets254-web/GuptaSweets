import { Helmet } from "react-helmet-async";
import Layout from "@/components/layout/Layout";
import HeroSection from "@/components/home/HeroSection";
import FeaturesSection from "@/components/home/FeaturesSection";
import CategoriesSection from "@/components/home/CategoriesSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import FestiveOfferSection from "@/components/home/FestiveOfferSection";
import { useSettings } from "@/contexts/SettingsContext";

const Index = () => {
  const bussinessDetails = useSettings().settings;
  return (
    <>
      <Helmet>
        <title>{`${bussinessDetails?.siteName} - ${bussinessDetails?.tagline}`}</title>
        <meta 
          name="description" 
          content={bussinessDetails?.description} 
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
