
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
  
  // Transformaciones para el objeto flotante (imagen AI)
  const imageX = useTransform(scrollYProgress, [0, 0.3, 0.6, 1], ['0%', '10%', '-10%', '-30%']);
  const imageY = useTransform(scrollYProgress, [0, 0.3, 0.6, 1], ['0%', '-25%', '-50%', '-75%']);
  const imageRotate = useTransform(scrollYProgress, [0, 0.3, 0.6, 1], [0, -5, 5, 10]);
  const imageScale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.2, 0.9]);

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

      {/* Objeto flotante que sigue el scroll */}
      <motion.div
        className="absolute w-full h-full pointer-events-none flex items-center justify-center z-10"
        style={{ 
          x: imageX, 
          y: imageY, 
          rotate: imageRotate, 
          scale: imageScale,
        }}
      >
        <div className="relative w-96 h-96 md:w-[500px] md:h-[500px]">
          <div className="absolute inset-0 bg-gradient-to-r from-neon-pink/30 to-neon-blue/30 rounded-full blur-3xl opacity-50"></div>
          <motion.div 
            className="ai-image-object"
            animate={{ y: [0, -15, 0] }}
            transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
          >
            <svg viewBox="0 0 200 200" className="w-full h-full">
              <defs>
                <radialGradient id="imageGlow" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                  <stop offset="0%" stopColor="rgba(255, 113, 154, 0.8)" />
                  <stop offset="100%" stopColor="rgba(0, 194, 255, 0.5)" />
                </radialGradient>
              </defs>
              <circle cx="100" cy="100" r="80" fill="url(#imageGlow)" />
              {/* AI generative art representation */}
              <g className="opacity-80">
                <path d="M70,70 Q100,40 130,70 T180,100 T130,130 T80,160 T30,130 T20,80 T70,70" 
                      fill="none" stroke="white" strokeWidth="2" />
                <path d="M80,60 Q120,90 150,60" 
                      fill="none" stroke="rgba(255,255,255,0.8)" strokeWidth="1.5" />
                <path d="M60,100 Q100,150 140,100" 
                      fill="none" stroke="rgba(255,255,255,0.8)" strokeWidth="1.5" />
                <circle cx="70" cy="90" r="8" fill="rgba(255,255,255,0.9)" />
                <circle cx="130" cy="90" r="8" fill="rgba(255,255,255,0.9)" />
              </g>
            </svg>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default ParallaxBackground;
