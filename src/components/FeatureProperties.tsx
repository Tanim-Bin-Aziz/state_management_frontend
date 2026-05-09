"use client";

import Image from "next/image";
import { MapPin, Bed, Bath, Square } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import getProperties, { Property } from "@/lib/api";

const Badge = ({ children }: { children: React.ReactNode }) => (
  <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-medium text-white backdrop-blur-md">
    {children}
  </span>
);

export default function FeaturedProperties() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await getProperties();

        // safety + limit 4
        setProperties(Array.isArray(data) ? data.slice(0, 4) : []);
      } catch (err) {
        console.error("Failed to load properties:", err);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  if (loading) {
    return <div className="text-white text-center py-20">Loading...</div>;
  }

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-3">
            Featured Properties
          </h2>
          <p className="text-white/60">Handpicked premium listings</p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {properties.map((p, index) => (
            <motion.div
              key={p._id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="rounded-2xl overflow-hidden border border-white/10 bg-white/5 hover:scale-[1.02] transition">
                {/* Image */}
                <div className="relative h-48">
                  <Image
                    src={p.plotDetails?.plotPhoto as string}
                    alt={p.title}
                    fill
                    className="object-cover group-hover:scale-110 transition"
                  />

                  <div className="absolute top-3 right-3">
                    <Badge>{p.tag || "Property"}</Badge>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 text-white">
                  <h3 className="font-semibold text-lg">{p.title}</h3>

                  <div className="flex items-center gap-1 text-white/60 text-sm mt-1">
                    <MapPin size={14} />
                    {p.location}
                  </div>

                  {/* Stats */}
                  <div className="flex justify-between mt-4 text-sm text-white/70">
                    <div className="flex items-center gap-1">
                      <Bed size={14} /> {p.beds ?? 0}
                    </div>

                    <div className="flex items-center gap-1">
                      <Bath size={14} /> {p.baths ?? 0}
                    </div>

                    <div className="flex items-center gap-1">
                      <Square size={14} /> {p.sqft ?? "N/A"}
                    </div>
                  </div>

                  {/* Extra Info */}
                  <div className="mt-4 text-xs text-white/60 space-y-1">
                    <div>
                      Price/sqft:{" "}
                      <span className="text-white">
                        {p.flatDetails?.pricePerSqFt
                          ? `৳ ${Number(
                              p.flatDetails.pricePerSqFt,
                            ).toLocaleString("en-BD")}`
                          : "N/A"}
                      </span>
                    </div>

                    <div>
                      Available flats:{" "}
                      <span className="text-white">
                        {p.salesInformation?.totalFlats != null &&
                        p.salesInformation?.soldFlats != null
                          ? Number(p.salesInformation.totalFlats) -
                            Number(p.salesInformation.soldFlats)
                          : "N/A"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
