
import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const ParallaxBackground = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.6, 0]);

  return (
    <div ref={containerRef} className="fixed inset-0 w-full h-full z-0 overflow-hidden">
      <motion.div 
        className="absolute inset-0 w-full h-full z-0"
        style={{ 
          opacity,
          backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(31, 29, 43, 0.8) 0%, rgba(5, 5, 16, 1) 100%)',
        }}
      />
      
      <motion.div 
        className="stars-small absolute inset-0" 
        style={{ y: backgroundY, scale: 1.2 }} 
      />
      
      <motion.div 
        className="stars-medium absolute inset-0" 
        style={{ y: useTransform(scrollYProgress, [0, 1], ['0%', '70%']), scale: 1.1 }} 
      />
      
      <motion.div 
        className="stars-large absolute inset-0" 
        style={{ y: useTransform(scrollYProgress, [0, 1], ['0%', '40%']) }} 
      />
    </div>
  );
};

export default ParallaxBackground;
