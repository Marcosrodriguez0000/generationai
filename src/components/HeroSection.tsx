
import React from 'react';
import { Sparkles } from 'lucide-react';

const HeroSection = () => {
  return (
    <div className="text-center mb-10 max-w-2xl mx-auto">
      <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-neon-pink to-neon-blue mb-4">
        Generation.AI <Sparkles className="inline h-8 w-8" />
      </h1>
      <p className="text-lg text-gray-300 mb-6">
        Describe lo que imaginas y deja que la inteligencia artificial lo convierta en realidad
      </p>
    </div>
  );
};

export default HeroSection;
