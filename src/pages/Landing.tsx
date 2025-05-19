
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, ImageIcon, Camera, WandSparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import ParallaxBackground from '@/components/ParallaxBackground';

const LandingPage = () => {
  const [currentSection, setCurrentSection] = useState(0);
  const [isIntroComplete, setIsIntroComplete] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const sections = [
    {
      title: "GENERATION.AI",
      subtitle: "Creación de imágenes con inteligencia artificial",
      description: "Transforma tus ideas en impresionantes visuales con solo describirlas"
    },
    {
      title: "IMAGINACIÓN",
      subtitle: "Dale vida a tus ideas más creativas",
      description: "Desde paisajes de fantasía hasta diseños futuristas, todo está a tu alcance"
    },
    {
      title: "PRECISIÓN",
      subtitle: "Control total sobre tus creaciones",
      description: "Ajusta cada detalle hasta lograr exactamente lo que imaginas"
    },
    {
      title: "RAPIDEZ",
      subtitle: "Resultados sorprendentes en segundos",
      description: "Obtén creaciones profesionales sin esperas largas"
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
      className="h-screen w-full overflow-auto snap-y snap-mandatory"
      onScroll={handleScroll}
    >
      <ParallaxBackground />
      
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
                  Crear imágenes <ArrowRight className="ml-2" />
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
          <div className="max-w-5xl mx-auto text-center glass-card p-8 rounded-xl">
            <motion.h2 
              className="text-4xl md:text-6xl font-bold mb-8 text-gradient"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              Generador de imágenes AI
            </motion.h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 my-12">
              <motion.div 
                className="glass-card p-6 rounded-xl image-feature"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
              >
                <div className="bg-neon-pink/20 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <ImageIcon className="w-8 h-8 text-neon-pink" />
                </div>
                <h3 className="text-xl font-bold mb-2">Calidad excepcional</h3>
                <p className="text-gray-300">Genera imágenes con un nivel de detalle y realismo sorprendente</p>
              </motion.div>
              
              <motion.div 
                className="glass-card p-6 rounded-xl image-feature"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
              >
                <div className="bg-neon-blue/20 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <WandSparkles className="w-8 h-8 text-neon-blue" />
                </div>
                <h3 className="text-xl font-bold mb-2">Fácil de usar</h3>
                <p className="text-gray-300">Interfaz intuitiva que no requiere conocimientos técnicos</p>
              </motion.div>
              
              <motion.div 
                className="glass-card p-6 rounded-xl image-feature"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.8 }}
              >
                <div className="bg-neon-green/20 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Camera className="w-8 h-8 text-neon-green" />
                </div>
                <h3 className="text-xl font-bold mb-2">Personalizable</h3>
                <p className="text-gray-300">Ajustes avanzados para crear exactamente lo que necesitas</p>
              </motion.div>
            </div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.8 }}
              className="mt-8"
            >
              <Link to="/home">
                <Button 
                  variant="neon"
                  size="xl"
                  className="animate-glow"
                >
                  Comenzar ahora <Sparkles className="ml-2" />
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
