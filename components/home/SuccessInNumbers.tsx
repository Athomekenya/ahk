"use client";

import React from "react";
import { motion } from "framer-motion";
import { Users, Home, ShieldCheck, MapPin } from "lucide-react";

const stats = [
  {
    icon: Users,
    value: "1,000+",
    label: "Families served",
    description: "Kenyan families and diaspora clients who trust us with their loved ones.",
  },
  {
    icon: Home,
    value: "800+",
    label: "Home visits completed",
    description: "Professional care visits delivered safely and compassionately.",
  },
  {
    icon: ShieldCheck,
    value: "100+",
    label: "Verified caregivers",
    description: "Background-checked, credential-verified nursing and care professionals.",
  },
  {
    icon: MapPin,
    value: "Kenya-wide",
    label: "Distributed Team",
    description: "Providing home care coordination and equipment delivery across Kenya.",
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

export default function SuccessInNumbers() {
  return (
    <section
      className="bg-[#222222] py-20 px-4 sm:px-6 lg:px-8"
      aria-labelledby="stats-heading"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <span className="inline-block text-xs font-sans font-semibold uppercase tracking-widest text-gold mb-4">
            Our impact
          </span>
          <h2
            id="stats-heading"
            className="font-display text-white"
            style={{ fontSize: "var(--text-h1)" }}
          >
            Trusted by hundreds of families
          </h2>
        </div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={i}
                variants={itemVariants}
                className="flex flex-col items-center text-center gap-3 p-8 rounded-card bg-white/5 border border-white/10"
              >
                <div className="flex items-center justify-center w-14 h-14 rounded-full bg-sage/20 border border-sage/30 mb-2">
                  <Icon className="h-7 w-7 text-sage-light" strokeWidth={1.5} />
                </div>
                <span
                  className="font-display text-white"
                  style={{ fontSize: "var(--text-h1)" }}
                >
                  {stat.value}
                </span>
                <span className="font-sans font-semibold text-gold text-sm uppercase tracking-wider">
                  {stat.label}
                </span>
                <p className="text-white/55 font-sans text-sm leading-relaxed">
                  {stat.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
