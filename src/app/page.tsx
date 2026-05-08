import Category from "@/components/Category";
import FeaturedProperties from "@/components/FeatureProperties";
import Footer from "@/components/Footer";
import LandingPage from "@/components/LandingPage";
import Navbar from "@/components/Navbar";
import Testimonials from "@/components/Testimonials";
import { WhyChooseUs } from "@/components/WhyChooseUs";

const Home = () => {
  return (
    <div className="">
      <Navbar />

      {/* <div className="flex-1 overflow-hidden"> */}

      <LandingPage />
      <FeaturedProperties />
      <Category />
      <WhyChooseUs />
      <Testimonials />
      <Footer />
    </div>
    // </div>
  );
};

export default Home;
