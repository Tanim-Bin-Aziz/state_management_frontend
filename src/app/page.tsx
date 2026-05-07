import Category from "@/components/Category";
import FeaturedProperties from "@/components/FeatureProperties";
import LandingPage from "@/components/LandingPage";
import Navbar from "@/components/Navbar";

const Home = () => {
  return (
    <div className="">
      <Navbar />

      {/* <div className="flex-1 overflow-hidden"> */}

      <LandingPage />
      <FeaturedProperties />
      <Category />
    </div>
    // </div>
  );
};

export default Home;
