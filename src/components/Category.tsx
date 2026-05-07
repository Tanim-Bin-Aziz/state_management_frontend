"use client";

import { Home, Building2, Castle, Building } from "lucide-react";
import { motion } from "framer-motion";

const categories = [
  { icon: Home, label: "Houses", count: "450+" },
  { icon: Building2, label: "Apartments", count: "320+" },
  { icon: Castle, label: "Villas", count: "180+" },
  { icon: Building, label: "Penthouses", count: "95+" },
];

const Category = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-black to-neutral-950">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            Browse by Category
          </h2>
          <p className="text-lg text-white/60">
            Find properties that match your lifestyle
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {categories.map((category, index) => {
            const Icon = category.icon;
            return (
              <motion.button
                key={category.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                }}
                viewport={{ once: true }}
                whileHover={{
                  scale: 1,
                  transition: {
                    duration: 0.35,
                    ease: "easeOut",
                  },
                }}
                whileTap={{
                  scale: 0.97,
                  transition: {
                    duration: 0.2,
                  },
                }}
                className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-8 hover:bg-white/10 hover:border-white/30 transition-all duration-500 group"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mb-4 group-hover:bg-white/20 transition-colors">
                    <Icon size={32} className="text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">
                    {category.label}
                  </h3>
                  <p className="text-sm text-white/60">{category.count}</p>
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>
    </section>
  );
};
export default Category;
