import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";

const Home = () => {
  return (
    <div className="h-screen overflow-hidden flex flex-col">
      <div className="h-16 shrink-0">
        <Navbar />
      </div>
      <div className="flex-1 overflow-hidden">
        <Hero />
      </div>
    </div>
  );
};

export default Home;
