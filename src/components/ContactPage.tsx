"use client";

import Link from "next/link";
import { Mail, Phone, MapPin, Send, Building2 } from "lucide-react";
import { motion } from "framer-motion";
import { FaFacebook, FaInstagram } from "react-icons/fa";

const ContactPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#111827] to-[#1e293b] text-white overflow-hidden relative">
      {/* Background Glow */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-emerald-500/20 blur-[120px] rounded-full" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-500/20 blur-[120px] rounded-full" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-24">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-xl mb-6">
            <Building2 size={18} className="text-emerald-400" />
            <span className="text-sm text-white/80 tracking-wide">
              Premium Real Estate Support
            </span>
          </div>

          <h1 className="text-5xl md:text-6xl font-bold leading-tight">
            Contact <span className="text-emerald-400">Our Agent</span>
          </h1>

          <p className="text-white/60 mt-6 max-w-2xl mx-auto text-lg leading-relaxed">
            Looking for your dream apartment or investment property? Our expert
            real estate agents are ready to help you with premium support and
            guidance.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-10 items-start">
          {/* Left Side */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-2xl p-8 shadow-2xl"
          >
            <h2 className="text-3xl font-semibold mb-8">Get In Touch</h2>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 flex items-center justify-center border border-emerald-500/20">
                  <Phone className="text-emerald-400" />
                </div>

                <div>
                  <h3 className="font-semibold text-lg">Phone</h3>
                  <p className="text-white/60 mt-1">+880 1700-000000</p>
                  <p className="text-white/40 text-sm mt-1">
                    Available 24/7 for property inquiries
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-2xl bg-cyan-500/20 flex items-center justify-center border border-cyan-500/20">
                  <Mail className="text-cyan-400" />
                </div>

                <div>
                  <h3 className="font-semibold text-lg">Email</h3>
                  <p className="text-white/60 mt-1">contact@royalhouse.com</p>
                  <p className="text-white/40 text-sm mt-1">
                    Send us your property requirements anytime
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-2xl bg-pink-500/20 flex items-center justify-center border border-pink-500/20">
                  <MapPin className="text-pink-400" />
                </div>

                <div>
                  <h3 className="font-semibold text-lg">Office Address</h3>
                  <p className="text-white/60 mt-1">Rajshahi, Bangladesh</p>
                  <p className="text-white/40 text-sm mt-1">
                    Visit our office for direct consultation
                  </p>
                </div>
              </div>
            </div>

            {/* Social */}
            <div className="mt-10 pt-8 border-t border-white/10 flex items-center gap-4">
              <button className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition flex items-center justify-center">
                <FaFacebook size={20} />
              </button>

              <button className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition flex items-center justify-center">
                <FaInstagram size={20} />
              </button>
            </div>
          </motion.div>

          {/* Right Side */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-2xl p-8 shadow-2xl"
          >
            <h2 className="text-3xl font-semibold mb-8">Send Message</h2>

            <form className="space-y-5">
              <div>
                <label className="block text-sm text-white/70 mb-2">
                  Full Name
                </label>

                <input
                  type="text"
                  placeholder="Enter your name"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 outline-none focus:border-emerald-400 transition placeholder:text-white/30"
                />
              </div>

              <div>
                <label className="block text-sm text-white/70 mb-2">
                  Email Address
                </label>

                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 outline-none focus:border-emerald-400 transition placeholder:text-white/30"
                />
              </div>

              <div>
                <label className="block text-sm text-white/70 mb-2">
                  Phone Number
                </label>

                <input
                  type="text"
                  placeholder="Enter your number"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 outline-none focus:border-emerald-400 transition placeholder:text-white/30"
                />
              </div>

              <div>
                <label className="block text-sm text-white/70 mb-2">
                  Message
                </label>

                <textarea
                  rows={5}
                  placeholder="Tell us about your dream property..."
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 outline-none focus:border-emerald-400 transition placeholder:text-white/30 resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-emerald-500 hover:bg-emerald-600 active:scale-[0.98] transition-all duration-200 py-4 rounded-2xl font-semibold flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20"
              >
                <Send size={18} />
                Send Message
              </button>
            </form>
          </motion.div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mt-20 text-center rounded-3xl border border-white/10 bg-white/5 backdrop-blur-2xl p-10"
        >
          <h2 className="text-4xl font-bold">Find Your Perfect Home Today</h2>

          <p className="text-white/60 mt-4 max-w-2xl mx-auto leading-relaxed">
            Explore premium apartments, luxury flats, and modern real estate
            opportunities with trusted agents.
          </p>

          <Link href="/hero">
            <button className="mt-8 px-8 py-4 rounded-2xl bg-white text-black font-semibold hover:scale-105 transition duration-300 shadow-xl">
              Explore Properties
            </button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default ContactPage;
