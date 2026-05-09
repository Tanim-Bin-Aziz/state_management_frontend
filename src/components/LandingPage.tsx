"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import api from "@/lib/axios";
import { Property } from "@/lib/api";

const LandingPage = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const res = await api.get("/properties");
        setProperties(res.data.data.slice(0, 3)); // only 3 cards
      } catch (err) {
        console.error("Failed to load properties:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  return (
    <section className="relative min-h-screen items-center flex overflow-hidden ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-20 lg:py-0">
        <div className="grid grid-cols-1 ml-8 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* LEFT SIDE */}
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
                Discover luxury properties in prime locations.
              </p>
            </div>

            <button className="group inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 py-3 text-white backdrop-blur-md hover:bg-white hover:text-black transition">
              View All Properties →
            </button>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <div className="text-2xl font-bold text-white">1,200+</div>
                <div className="text-white/60 text-sm">Properties</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-white">850+</div>
                <div className="text-white/60 text-sm">Clients</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-white">45+</div>
                <div className="text-white/60 text-sm">Cities</div>
              </div>
            </div>
          </motion.div>

          {/* RIGHT SIDE (DYNAMIC CARDS) */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative h-[420px] sm:h-[500px] lg:h-[700px]"
          >
            <div className="relative z-20 h-full flex flex-col justify-center space-y-6 p-4 sm:p-6">
              {loading ? (
                <div className="text-white">Loading...</div>
              ) : (
                properties.map((property, index) => {
                  const isLeft = index % 2 === 0;

                  return (
                    <div
                      key={property._id}
                      className={`transition-all border border-white/20 p-2 rounded-xl duration-500 hover:scale-105 hover:-translate-y-2 cursor-pointer
                        ${isLeft ? "ml-60" : "mr-60"}`}
                    >
                      <Image
                        src={
                          typeof property.plotDetails?.plotPhoto === "string" &&
                          property.plotDetails.plotPhoto
                            ? property.plotDetails.plotPhoto
                            : "https://via.placeholder.com/300"
                        }
                        height={300}
                        width={300}
                        className="w-full h-28 object-cover rounded-lg mb-2"
                        alt={property.title}
                      />

                      <div className="text-white font-semibold text-sm">
                        {property.title}
                      </div>

                      <div className="text-white/60 text-xs">
                        {typeof property.plotDetails?.address === "string"
                          ? property.plotDetails.address
                          : "No address"}
                      </div>

                      <div className="text-white font-bold text-sm">
                        ৳{" "}
                        {property?.flatDetails?.pricePerSqFt != null
                          ? Number(
                              property.flatDetails.pricePerSqFt,
                            ).toLocaleString("en-IN")
                          : "N/A"}
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default LandingPage;
