"use client";

import Image from "next/image";
import { Star } from "lucide-react";
import { motion } from "framer-motion";

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Property Investor",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400",
    content:
      "Outstanding service! They helped me find the perfect investment property in Manhattan. The team was professional, knowledgeable, and always available.",
    rating: 5,
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Homeowner",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
    content:
      "From start to finish, the experience was seamless. They understood exactly what we were looking for and delivered beyond our expectations.",
    rating: 5,
  },
  {
    id: 3,
    name: "Emma Williams",
    role: "Real Estate Developer",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400",
    content:
      "The market insights and data-driven approach made all the difference. I highly recommend their services for anyone serious about luxury real estate.",
    rating: 5,
  },
];

const Testimonials = () => {
  return (
    <section className="bg-gradient-to-b from-neutral-950 to-black py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            Client Testimonials
          </h2>

          <p className="text-lg text-white/60">
            Hear what our satisfied clients have to say
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 1,
                delay: index * 0.1,
              }}
              viewport={{ once: true }}
              whileHover={{
                y: -6,
                transition: {
                  duration: 0.3,
                },
              }}
              className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 transition-all duration-500 hover:border-white/30 hover:bg-white/10"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-6">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} size={18} className="fill-white text-white" />
                ))}
              </div>

              {/* Content */}
              <p className="text-white/80 leading-relaxed mb-8">
                {testimonial.content}
              </p>

              {/* User */}
              <div className="flex items-center gap-4">
                <div className="relative w-12 h-12 overflow-hidden rounded-full border border-white/20">
                  <Image
                    src={testimonial.image}
                    alt={testimonial.name}
                    fill
                    className="object-cover"
                  />
                </div>

                <div>
                  <h4 className="font-semibold text-white">
                    {testimonial.name}
                  </h4>

                  <p className="text-sm text-white/60">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
