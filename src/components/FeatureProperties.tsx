"use client";

import Image from "next/image";
import { MapPin, Bed, Bath, Square } from "lucide-react";
import { motion } from "framer-motion";

const properties = [
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1776362355123-ca966d36e29c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    title: "Modern Penthouse",
    price: "$2,450,000",
    location: "Manhattan, New York",
    beds: 4,
    baths: 3,
    sqft: "3,200",
    tag: "Luxury",
  },
  {
    id: 2,
    image:
      "https://images.unsplash.com/photo-1762117360871-f11fbad00ee1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    title: "Luxury Villa with Pool",
    price: "$3,850,000",
    location: "Beverly Hills, CA",
    beds: 6,
    baths: 5,
    sqft: "5,800",
    tag: "For Sale",
  },
  {
    id: 3,
    image:
      "https://images.unsplash.com/photo-1775315078672-1751f2bb432a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    title: "City View Apartment",
    price: "$1,290,000",
    location: "Downtown, Miami",
    beds: 3,
    baths: 2,
    sqft: "2,100",
    tag: "New",
  },
  {
    id: 4,
    image:
      "https://images.unsplash.com/photo-1761347604632-944c4400093a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    title: "Grand Estate",
    price: "$5,200,000",
    location: "Hamptons, NY",
    beds: 8,
    baths: 7,
    sqft: "8,500",
    tag: "Luxury",
  },
];

const Badge = ({ children }: { children: React.ReactNode }) => {
  return (
    <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-medium text-white backdrop-blur-md">
      {children}
    </span>
  );
};

const FeaturedProperties = () => {
  return (
    <section id="properties" className="bg-black py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            Featured Properties
          </h2>

          <p className="text-lg text-white/60 max-w-2xl mx-auto">
            Handpicked selection of our most exclusive listings
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {properties.map((property, index) => (
            <motion.div
              key={property.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
              }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl transition-all duration-300 hover:scale-[1.02] hover:border-white/30">
                {/* Image */}
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={property.image}
                    alt={property.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />

                  <div className="absolute top-4 right-4">
                    <Badge>{property.tag}</Badge>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-white mb-2">
                    {property.title}
                  </h3>

                  <div className="text-2xl font-bold text-white mb-3">
                    {property.price}
                  </div>

                  <div className="flex items-center gap-1 text-sm text-white/60 mb-5">
                    <MapPin size={16} />
                    <span>{property.location}</span>
                  </div>

                  {/* Details */}
                  <div className="flex items-center justify-between border-t border-white/10 pt-4 text-sm text-white/70">
                    <div className="flex items-center gap-1">
                      <Bed size={16} />
                      <span>{property.beds}</span>
                    </div>

                    <div className="flex items-center gap-1">
                      <Bath size={16} />
                      <span>{property.baths}</span>
                    </div>

                    <div className="flex items-center gap-1">
                      <Square size={16} />
                      <span>{property.sqft}</span>
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
};

export default FeaturedProperties;
