
import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { BrainCircuit } from 'lucide-react';

const ParallaxBackground = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.6, 0]);
  
  // Brain rotation transformations based on scroll
  const brainRotateX = useTransform(scrollYProgress, [0, 0.2, 0.4, 0.6, 0.8, 1], [0, -15, -30, -45, -60, -75]);
  const brainRotateY = useTransform(scrollYProgress, [0, 0.2, 0.4, 0.6, 0.8, 1], [0, 60, 120, 180, 240, 300]);
  const brainScale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.2, 0.9]);

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

      {/* Brain model that rotates with scroll */}
      <motion.div
        className="absolute w-full h-full pointer-events-none flex items-center justify-center z-10"
        style={{ 
          rotateX: brainRotateX, 
          rotateY: brainRotateY, 
          scale: brainScale,
        }}
      >
        <div className="relative w-96 h-96 md:w-[500px] md:h-[500px]">
          <div className="absolute inset-0 bg-gradient-to-r from-neon-pink/30 to-neon-blue/30 rounded-full blur-3xl opacity-50"></div>
          <motion.div 
            className="brain-model"
            animate={{ y: [0, -15, 0] }}
            transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
          >
            <div className="w-full h-full relative">
              {/* Brain SVG representation with glowing effect */}
              <svg viewBox="0 0 200 200" className="w-full h-full filter drop-shadow-glow">
                <defs>
                  <radialGradient id="brainGlow" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                    <stop offset="0%" stopColor="rgba(255, 113, 154, 0.8)" />
                    <stop offset="100%" stopColor="rgba(0, 194, 255, 0.5)" />
                  </radialGradient>
                  <filter id="glow">
                    <feGaussianBlur stdDeviation="3.5" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>
                
                {/* Brain base shape */}
                <ellipse cx="100" cy="100" rx="75" ry="65" fill="url(#brainGlow)" opacity="0.7" />
                
                {/* Brain lobes and details */}
                <path d="M70,70 Q90,50 110,70 T150,90 T120,130 T80,140 T40,110 T70,70" 
                      fill="none" stroke="rgba(255,255,255,0.9)" strokeWidth="2.5" filter="url(#glow)" />
                <path d="M60,80 Q80,70 100,80 T140,80" 
                      fill="none" stroke="rgba(255,255,255,0.8)" strokeWidth="2" filter="url(#glow)" />
                <path d="M65,100 Q85,130 130,100" 
                      fill="none" stroke="rgba(255,255,255,0.8)" strokeWidth="2" filter="url(#glow)" />
                <path d="M60,90 Q80,110 100,90 T140,90" 
                      fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="1.5" filter="url(#glow)" />
                
                {/* Neural connections */}
                <g className="neural-connections" opacity="0.6">
                  <path d="M80,75 Q100,90 120,75" stroke="rgba(255,113,154,0.8)" fill="none" strokeWidth="1" />
                  <path d="M70,100 Q100,110 130,100" stroke="rgba(0,194,255,0.8)" fill="none" strokeWidth="1" />
                  <path d="M75,120 Q100,135 125,120" stroke="rgba(255,255,255,0.6)" fill="none" strokeWidth="1" />
                </g>
                
                {/* Neural nodes */}
                <circle cx="75" cy="85" r="3" fill="rgba(255,255,255,0.9)" filter="url(#glow)" />
                <circle cx="125" cy="85" r="3" fill="rgba(255,255,255,0.9)" filter="url(#glow)" />
                <circle cx="95" cy="115" r="2" fill="rgba(255,255,255,0.8)" filter="url(#glow)" />
                <circle cx="105" cy="115" r="2" fill="rgba(255,255,255,0.8)" filter="url(#glow)" />
              </svg>
              
              {/* Additional brain circuit icon overlay */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-70">
                <BrainCircuit className="w-24 h-24 text-neon-blue filter drop-shadow-glow" />
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default ParallaxBackground;
