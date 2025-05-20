
import React from 'react';
import { motion } from 'framer-motion';

const HeroSection = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="text-center mb-10 max-w-3xl mx-auto"
    >
      <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-indigo-500 mb-6">
        Generation.AI
      </h1>
      <p className="text-xl text-gray-300 mb-6 max-w-2xl mx-auto">
        Convierte tus ideas en imágenes impactantes con la mejor IA generativa
      </p>
    </motion.div>
  );
};

export default HeroSection;
