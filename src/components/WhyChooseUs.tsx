import { Shield, Users, Award, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";

const features = [
  {
    icon: Shield,
    title: "Trusted Service",
    description:
      "Over 15 years of experience in luxury real estate with proven track record.",
  },
  {
    icon: Users,
    title: "Expert Agents",
    description:
      "Professional team dedicated to finding your perfect property match.",
  },
  {
    icon: Award,
    title: "Premium Listings",
    description:
      "Exclusive access to the most sought-after properties in prime locations.",
  },
  {
    icon: TrendingUp,
    title: "Market Insights",
    description:
      "Data-driven analysis and market trends to make informed decisions.",
  },
];

export function WhyChooseUs() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-neutral-950">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            Why Choose Us
          </h2>
          <p className="text-lg text-white/60 max-w-2xl mx-auto">
            We provide exceptional service and expertise in luxury real estate
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-8 hover:bg-white/10 hover:border-white/30 transition-all duration-300 group"
              >
                <div className="w-14 h-14 rounded-xl bg-white/10 flex items-center justify-center mb-6 group-hover:bg-white/20 transition-colors">
                  <Icon size={28} className="text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-white/60 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
