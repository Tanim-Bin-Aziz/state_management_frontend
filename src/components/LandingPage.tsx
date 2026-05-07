"use client";
import { Search, MapPin, DollarSign, Home } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";

const LandingPage = () => {
  return (
    <section className="relative min-h-screen flex bg-black overflow-hidden pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-20 lg:py-0">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Left Side */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="space-y-5">
              <h1 className="text-4xl sm:text-5xl lg:text-5xl xl:text-7xl font-bold text-white leading-tight">
                Find Your
                <br />
                <span className="text-white/60">Dream Home</span>
              </h1>
              <p className="text-base sm:text-lg lg:text-xl text-white/70 max-w-lg">
                Discover luxury properties in prime locations. Your perfect home
                awaits with our expert guidance.
              </p>
            </div>
            <button className="group inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 py-3 text-sm sm:text-base font-medium text-white backdrop-blur-md transition-all duration-300 hover:border-white/50 hover:bg-white hover:text-black hover:shadow-[0_0_30px_rgba(255,255,255,0.15)]">
              View All Properties
              <span className="transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </button>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 sm:gap-6">
              {[
                { label: "Properties", value: "1,200+" },
                { label: "Clients", value: "850+" },
                { label: "Cities", value: "45+" },
              ].map((stat) => (
                <div key={stat.label} className="space-y-1">
                  <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-white">
                    {stat.value}
                  </div>
                  <div className="text-xs sm:text-sm text-white/60">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right Side */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative h-[420px] sm:h-[500px] lg:h-[700px] mt-6 lg:mt-0 "
          >
            <div className="relative z-20 h-full flex flex-col justify-center space-y-6 p-4 sm:p-6">
              {" "}
              {/* Card 1 */}
              <div className="ml-60 transition-all duration-500 hover:scale-105 hover:-translate-y-2 cursor-pointer">
                {" "}
                <Image
                  src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c"
                  height={300}
                  width={300}
                  className="w-full h-28 object-cover rounded-lg mb-2"
                  alt={""}
                />
                <div className="text-white font-semibold text-sm">
                  Modern Penthouse
                </div>
                <div className="text-white/60 text-xs">Manhattan, NY</div>
                <div className="text-white font-bold text-sm">$2.45M</div>
              </div>
              {/* Card 2 */}
              <div className="mr-60 transition-all duration-500 hover:scale-105 hover:-translate-y-2 cursor-pointer">
                {" "}
                <Image
                  src="https://images.unsplash.com/photo-1600585154526-990dced4db0d"
                  height={300}
                  width={300}
                  className="w-full h-28 object-cover rounded-lg mb-2"
                  alt={""}
                />
                <div className="text-white font-semibold text-sm">
                  Luxury Villa
                </div>
                <div className="text-white/60 text-xs">Beverly Hills, CA</div>
                <div className="text-white font-bold text-sm">$3.85M</div>
              </div>
              {/* Card 3 */}
              <div className="ml-60 transition-all duration-500 hover:scale-105 hover:-translate-y-2 cursor-pointer">
                {" "}
                <Image
                  src="https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6"
                  height={300}
                  width={300}
                  className="w-full h-28 object-cover rounded-lg mb-2"
                  alt={""}
                />
                <div className="text-white font-semibold text-sm">
                  City Apartment
                </div>
                <div className="text-white/60 text-xs">Miami, FL</div>
                <div className="text-white font-bold text-sm">$1.29M</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
export default LandingPage;
