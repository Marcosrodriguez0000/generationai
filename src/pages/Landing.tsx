
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion, useScroll, useTransform } from 'framer-motion';
import HeroSection from '@/components/HeroSection';
import InfoSection from '@/components/InfoSection';

const LandingPage = () => {
  const [currentSection, setCurrentSection] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start", "end"]
  });

  // Background parallax effect
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);
  const backgroundOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [1, 0.8, 0.4, 0]);
  const videoScale = useTransform(scrollYProgress, [0.1, 0.3], [0.8, 1]);
  const videoOpacity = useTransform(scrollYProgress, [0.1, 0.2, 0.7, 0.8], [0, 1, 1, 0]);

  const sections = [
    {
      title: "GENERATION.AI",
      subtitle: "El generador de imágenes definitivo",
      description: "Creatividad visual sin límites al alcance de todos"
    },
    {
      title: "IMÁGENES REALISTAS",
      subtitle: "Convierte tus ideas en imágenes impactantes",
      description: "Describe lo que imaginas y nuestra IA lo hará realidad"
    },
    {
      title: "ESTILOS ÚNICOS",
      subtitle: "Personaliza el estilo artístico de tus creaciones",
      description: "Desde fotografía realista hasta arte abstracto o ilustraciones"
    },
    {
      title: "EDICIÓN INTUITIVA",
      subtitle: "Refina tus creaciones con facilidad",
      description: "Modifica y perfecciona tus imágenes con instrucciones simples"
    }
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        const scrollPosition = containerRef.current.scrollTop;
        const height = containerRef.current.clientHeight;
        const newSection = Math.min(
          sections.length - 1,
          Math.floor((scrollPosition / (height * sections.length)) * sections.length)
        );
        
        if (newSection !== currentSection && newSection >= 0 && newSection < sections.length) {
          setCurrentSection(newSection);
        }
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
      return () => container.removeEventListener('scroll', handleScroll);
    }
  }, [currentSection, sections.length]);

  return (
    <div 
      ref={containerRef}
      className="h-screen w-full overflow-auto snap-y snap-mandatory bg-black text-white"
    >
      {/* Background gradient that moves on scroll */}
      <motion.div 
        className="fixed inset-0 z-0" 
        style={{ 
          y: backgroundY,
          opacity: backgroundOpacity,
          background: "radial-gradient(circle at 50% 50%, rgba(100, 100, 255, 0.15) 0%, rgba(100, 0, 100, 0.1) 25%, rgba(10, 10, 30, 1) 100%)"
        }}
      />

      {/* Fixed background with stars effect */}
      <div className="fixed inset-0 z-[-1]">
        <div className="stars-small" style={{ ['--x' as any]: '0.3', ['--y' as any]: '0.7' }}></div>
        <div className="stars-medium" style={{ ['--x' as any]: '0.5', ['--y' as any]: '0.2' }}></div>
        <div className="stars-large" style={{ ['--x' as any]: '0.8', ['--y' as any]: '0.5' }}></div>
      </div>

      {/* Section 1: Hero */}
      <section className="h-screen w-full flex flex-col items-center justify-center snap-start px-6 relative">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center max-w-3xl"
        >
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 text-gradient">
            {sections[0].title}
          </h1>
          <p className="text-xl md:text-2xl mb-4 text-gray-300">
            {sections[0].subtitle}
          </p>
          <p className="text-lg max-w-md mx-auto text-gray-400">
            {sections[0].description}
          </p>
          <div className="mt-8">
            <Link to="/home">
              <Button 
                variant="neon"
                size="xl"
                className="animate-glow"
              >
                Comenzar ahora <ArrowRight className="ml-2" />
              </Button>
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Video showcase section */}
      <section className="h-screen w-full flex flex-col items-center justify-center snap-start px-6 relative overflow-hidden">
        <motion.div 
          className="absolute inset-0 flex items-center justify-center z-0"
          style={{ 
            scale: videoScale,
            opacity: videoOpacity
          }}
        >
          <video 
            ref={videoRef}
            autoPlay 
            loop 
            muted 
            playsInline
            className="w-full h-full object-cover opacity-60"
          >
            <source src="/videos/sample-code.mp4" type="video/mp4" />
          </video>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="relative z-10 text-center max-w-2xl p-8 bg-black/50 backdrop-blur-xl rounded-xl"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-gradient">
            {sections[1].title}
          </h2>
          <p className="text-xl mb-4 text-gray-300">
            {sections[1].subtitle}
          </p>
          <p className="text-lg text-gray-400">
            {sections[1].description}
          </p>
        </motion.div>
      </section>

      {/* Feature sections */}
      {sections.slice(2).map((section, index) => (
        <section 
          key={index + 2} 
          className="h-screen w-full flex flex-col items-center justify-center snap-start px-6 relative"
        >
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl"
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-6 text-gradient">
              {section.title}
            </h2>
            <p className="text-xl mb-4 text-gray-300">
              {section.subtitle}
            </p>
            <p className="text-lg max-w-md mx-auto text-gray-400">
              {section.description}
            </p>
          </motion.div>
        </section>
      ))}

      {/* Final CTA section */}
      <section className="h-screen w-full flex flex-col items-center justify-center snap-start px-6 relative">
        <div className="text-center">
          <motion.h2 
            className="text-4xl md:text-6xl font-bold mb-8 text-gradient"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            Tu imaginación visual es el límite
          </motion.h2>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <Link to="/home">
              <Button 
                variant="neon"
                size="xl"
                className="animate-glow"
              >
                Generar imágenes ahora <ArrowRight className="ml-2" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Info section at the bottom with account info */}
      <section className="min-h-screen w-full flex flex-col items-center justify-center snap-start px-6 relative py-20">
        <InfoSection />
      </section>
    </div>
  );
};

export default LandingPage;
