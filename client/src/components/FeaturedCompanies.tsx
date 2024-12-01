import React from "react";
import { motion } from "framer-motion";

const companies = ["Bloomberg", "CoinDesk", "Decrypt", "Forbes", "TechCrunch"];

export const FeaturedCompanies = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <p className="text-center text-cream-100/60 mb-6 font-display">
        Featured In
      </p>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-8 items-center justify-items-center">
        {companies.map((company, index) => (
          <motion.div
            key={company}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{
              scale: 1.1,
              filter: "brightness(1.5)",
              textShadow: "0 0 8px rgb(255, 255, 255)",
            }}
            className="text-xl font-bold text-cream-100/40 hover:text-cream-100 transition-colors cursor-pointer"
          >
            {company}
          </motion.div>
        ))}
      </div>
    </div>
  );
};
