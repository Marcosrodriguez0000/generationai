
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BrainCircuit, Sparkles, ImageIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import ParallaxBackground from '@/components/ParallaxBackground';

const LandingPage = () => {
  const [currentSection, setCurrentSection] = useState(0);
  const [isIntroComplete, setIsIntroComplete] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const brainSections = [
    {
      title: "GENERATION.AI",
      subtitle: "Inteligencia Artificial para Creatividad Visual",
      description: "Una nueva forma de dar vida a tus ideas a través de imágenes generadas por IA"
    },
    {
      title: "INTELIGENCIA",
      subtitle: "Algoritmos neuronales avanzados",
      description: "Nuestro cerebro digital comprende contextos complejos y produce resultados sorprendentes"
    },
    {
      title: "CREATIVIDAD",
      subtitle: "Sin límites para tu imaginación",
      description: "Desde lo más realista hasta lo más surrealista, todo es posible con nuestro generador"
    },
    {
      title: "DETALLE",
      subtitle: "Precisión impresionante",
      description: "Cada imagen generada contiene detalles minuciosos que hacen brillar tu visión"
    }
  ];

  const handleScroll = () => {
    if (containerRef.current) {
      const scrollPosition = containerRef.current.scrollTop;
      const height = containerRef.current.clientHeight;
      const newSection = Math.floor(scrollPosition / height);
      
      if (newSection !== currentSection && newSection >= 0 && newSection < brainSections.length) {
        setCurrentSection(newSection);
      }
      
      if (scrollPosition > (brainSections.length - 0.5) * height && !isIntroComplete) {
        setIsIntroComplete(true);
      }
    }
  };

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
      return () => {
        container.removeEventListener('scroll', handleScroll);
      };
    }
  }, [currentSection]);

  return (
    <div 
      ref={containerRef}
      className="h-screen w-full overflow-auto snap-y snap-mandatory"
    >
      <ParallaxBackground />
      
      {brainSections.map((section, index) => (
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
          <motion.div 
            className="brain-section-content text-center max-w-2xl mx-auto glass-card p-6 md:p-8 rounded-xl backdrop-blur-lg"
            initial={{ opacity: 0, y: 30 }}
            animate={{ 
              opacity: currentSection === index ? 1 : 0,
              y: currentSection === index ? 0 : 30,
              transition: { delay: 0.3, duration: 0.8 }
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
              className="text-lg max-w-md text-center mx-auto text-gray-400"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              {section.description}
            </motion.p>
            
            {index < brainSections.length - 1 && (
              <motion.div 
                className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
              >
                <ArrowRight className="transform rotate-90" />
                <span className="sr-only">Desplázate hacia abajo</span>
              </motion.div>
            )}
          </motion.div>
        </motion.section>
      ))}
      
      {isIntroComplete && (
        <section className="h-screen w-full flex flex-col items-center justify-center snap-start px-6 relative">
          <motion.div 
            className="brain-final-section max-w-3xl mx-auto text-center glass-card p-8 rounded-xl backdrop-blur-lg"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <BrainCircuit className="w-20 h-20 mx-auto mb-6 text-neon-blue" />
            
            <motion.h2 
              className="text-4xl md:text-5xl font-bold mb-6 text-gradient"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              Generación de Imágenes Inteligente
            </motion.h2>
            
            <motion.p
              className="text-xl text-gray-300 mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              Describe lo que imaginas y deja que nuestra inteligencia artificial
              lo convierta en una imagen impresionante
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
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
          </motion.div>
        </section>
      )}
    </div>
  );
};

export default LandingPage;
