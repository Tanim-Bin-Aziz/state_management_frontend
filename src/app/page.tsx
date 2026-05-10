import Category from "@/components/Category";
import FeaturedProperties from "@/components/FeatureProperties";
import Footer from "@/components/Footer";
import LandingPage from "@/components/LandingPage";
import Navbar from "@/components/Navbar";
import Testimonials from "@/components/Testimonials";
import { WhyChooseUs } from "@/components/WhyChooseUs";

const Home = () => {
  return (
    <>
      <Navbar />
      <LandingPage />
      <Category />
      <FeaturedProperties />
      <WhyChooseUs />
      <Testimonials />
      <Footer />
    </>
  );
};

export default Home;
