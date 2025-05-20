
import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const CosmosBackground = () => {
  const backgroundRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!backgroundRef.current) return;
      
      const { clientX, clientY } = e;
      const x = (clientX / window.innerWidth) - 0.5;
      const y = (clientY / window.innerHeight) - 0.5;
      
      // Subtle parallax effect
      const elements = backgroundRef.current.querySelectorAll('.parallax-element');
      elements.forEach((el) => {
        const speed = parseFloat((el as HTMLElement).dataset.speed || '0.05');
        const moveX = x * 100 * speed;
        const moveY = y * 100 * speed;
        (el as HTMLElement).style.transform = `translate(${moveX}px, ${moveY}px)`;
      });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    // Create star field with different depths
    if (backgroundRef.current) {
      createStars(backgroundRef.current, 150);
    }
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);
  
  const createStars = (container: HTMLElement, count: number) => {
    // Clear existing stars
    const existingStars = container.querySelectorAll('.star');
    existingStars.forEach(el => el.remove());
    
    // Create new stars
    for (let i = 0; i < count; i++) {
      const star = document.createElement('div');
      star.className = 'star parallax-element';
      star.dataset.speed = (0.01 + Math.random() * 0.1).toString();
      
      // Random position
      const x = Math.random() * 100;
      const y = Math.random() * 100;
      
      // Random size
      const size = Math.random() * 2;
      const opacity = Math.random() * 0.7 + 0.3;
      
      // Apply styles
      star.style.cssText = `
        position: absolute;
        top: ${y}%;
        left: ${x}%;
        width: ${size}px;
        height: ${size}px;
        background: white;
        opacity: ${opacity};
        border-radius: 50%;
        box-shadow: 0 0 ${size * 2}px ${size}px rgba(255,255,255,0.5);
        animation: pulse-star ${Math.random() * 3 + 2}s infinite alternate ease-in-out;
      `;
      
      container.appendChild(star);
    }
  };

  return (
    <div ref={backgroundRef} className="fixed inset-0 -z-10 overflow-hidden">
      {/* Main gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#050510] via-[#0f0f19] to-[#1a1a2e]"></div>
      
      {/* Animated gradient orbs */}
      <motion.div 
        className="parallax-element absolute top-1/4 -left-[300px] w-[600px] h-[600px] rounded-full bg-gradient-to-r from-neon-purple/40 to-neon-pink/30 blur-3xl"
        animate={{ 
          x: [0, 50, 0], 
          y: [0, -50, 0],
          scale: [1, 1.1, 1]
        }}
        transition={{ 
          duration: 20, 
          repeat: Infinity,
          repeatType: "reverse" 
        }}
        data-speed="0.03"
      />
      
      <motion.div 
        className="parallax-element absolute bottom-1/3 right-1/4 w-[400px] h-[400px] rounded-full bg-gradient-to-r from-neon-blue/20 to-neon-purple/20 blur-3xl"
        animate={{ 
          x: [0, -70, 0], 
          y: [0, 50, 0],
          scale: [1, 1.15, 1]
        }}
        transition={{ 
          duration: 25, 
          repeat: Infinity,
          repeatType: "reverse" 
        }}
        data-speed="0.05"
      />
      
      {/* Subtle grid lines */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAgTSAwIDIwIEwgNDAgMjAgTSAyMCAwIEwgMjAgNDAgTSAwIDMwIEwgNDAgMzAgTSAzMCAwIEwgMzAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI2ZmZmZmZiIgc3Ryb2tlLXdpZHRoPSIwLjMiIG9wYWNpdHk9IjAuMDUiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-20"></div>
      
      {/* Horizontal line accent */}
      <div className="absolute top-[70px] left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
      
      {/* Additional gradient highlights */}
      <div className="absolute top-0 left-0 right-0 h-[300px] bg-gradient-to-b from-neon-purple/20 to-transparent"></div>
      <div className="absolute bottom-0 left-0 right-0 h-[250px] bg-gradient-to-t from-neon-blue/10 to-transparent"></div>
    </div>
  );
};

export default CosmosBackground;
