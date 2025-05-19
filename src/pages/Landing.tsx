
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

const LandingPage = () => {
  const [currentSection, setCurrentSection] = useState(0);
  const [isIntroComplete, setIsIntroComplete] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const sections = [
    {
      title: "GENERATION.AI",
      subtitle: "La nueva era de la creación con inteligencia artificial",
      description: "Creatividad sin límites al alcance de todos"
    },
    {
      title: "IMÁGENES",
      subtitle: "Convierte tus ideas en imágenes impactantes",
      description: "Describe lo que imaginas y déjanos hacer el resto"
    },
    {
      title: "TEXTOS",
      subtitle: "Potencia tu creatividad escrita",
      description: "Genera contenido persuasivo en segundos"
    },
    {
      title: "VIDEO",
      subtitle: "Da vida a tus ideas",
      description: "Crea videos impactantes con inteligencia artificial"
    }
  ];

  useEffect(() => {
    if (currentSection < sections.length - 1) {
      const timer = setTimeout(() => {
        setCurrentSection(prev => prev + 1);
      }, 3000);
      return () => clearTimeout(timer);
    } else if (currentSection === sections.length - 1 && !isIntroComplete) {
      const timer = setTimeout(() => {
        setIsIntroComplete(true);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [currentSection, sections.length, isIntroComplete]);

  const handleScroll = () => {
    if (containerRef.current) {
      const scrollPosition = containerRef.current.scrollTop;
      const height = containerRef.current.clientHeight;
      const newSection = Math.floor(scrollPosition / height);
      
      if (newSection !== currentSection && newSection >= 0 && newSection < sections.length) {
        setCurrentSection(newSection);
      }
      
      if (scrollPosition > (sections.length - 0.5) * height && !isIntroComplete) {
        setIsIntroComplete(true);
      }
    }
  };

  return (
    <div 
      ref={containerRef}
      className="h-screen w-full overflow-auto snap-y snap-mandatory bg-black text-white"
      onScroll={handleScroll}
    >
      {sections.map((section, index) => (
        <motion.section 
          key={index}
          className={`h-screen w-full flex flex-col items-center justify-center snap-start px-6 relative ${
            currentSection === index ? 'opacity-100' : 'opacity-0'
          }`}
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: currentSection === index ? 1 : 0,
            transition: { duration: 1 }
          }}
        >
          <div className="absolute inset-0 pointer-events-none">
            <div className="stars-small" style={{ '--x': '0.3', '--y': '0.7' } as React.CSSProperties}></div>
            <div className="stars-medium" style={{ '--x': '0.5', '--y': '0.2' } as React.CSSProperties}></div>
            <div className="stars-large" style={{ '--x': '0.8', '--y': '0.5' } as React.CSSProperties}></div>
          </div>

          <motion.h1 
            className="text-5xl md:text-7xl font-bold mb-4 text-gradient"
            initial={{ y: 50 }}
            animate={{ y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            {section.title}
          </motion.h1>
          
          <motion.h2 
            className="text-xl md:text-3xl mb-6 text-gray-300"
            initial={{ y: 50 }}
            animate={{ y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            {section.subtitle}
          </motion.h2>
          
          <motion.p 
            className="text-lg max-w-md text-center text-gray-400"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            {section.description}
          </motion.p>
          
          {index === sections.length - 1 && isIntroComplete && (
            <motion.div 
              className="mt-12"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8, duration: 0.5 }}
            >
              <Link to="/home">
                <Button 
                  variant="neon"
                  size="xl"
                  className="animate-glow"
                >
                  Comenzar ahora <ArrowRight className="ml-2" />
                </Button>
              </Link>
            </motion.div>
          )}
          
          {index < sections.length - 1 && (
            <motion.div 
              className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              <ArrowRight className="transform rotate-90" />
              <span className="sr-only">Scroll down</span>
            </motion.div>
          )}
        </motion.section>
      ))}
      
      {isIntroComplete && (
        <section className="h-screen w-full flex flex-col items-center justify-center snap-start px-6 relative">
          <div className="text-center">
            <motion.h2 
              className="text-4xl md:text-6xl font-bold mb-8 text-gradient"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              Tu imaginación es el límite
            </motion.h2>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              <Link to="/home">
                <Button 
                  variant="neon"
                  size="xl"
                  className="animate-glow"
                >
                  Comenzar ahora <ArrowRight className="ml-2" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </section>
      )}
    </div>
  );
};

export default LandingPage;
