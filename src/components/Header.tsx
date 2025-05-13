
import React from 'react';
import { Sparkles } from 'lucide-react';
import { Button } from './ui/button';

const Header = () => {
  return (
    <header className="flex justify-between items-center py-6 px-4 md:px-8">
      <div className="flex items-center gap-2">
        <Sparkles className="h-6 w-6 text-cosmos-purple" />
        <h1 className="text-2xl font-bold bg-clip-text text-transparent cosmos-gradient">
          CosmosAI
        </h1>
      </div>
      <div className="flex items-center gap-3">
        <Button variant="outline" className="hidden sm:flex">
          Galería
        </Button>
        <Button className="cosmos-gradient text-white">
          <Sparkles className="h-4 w-4 mr-2" />
          <span>Crear</span>
        </Button>
      </div>
    </header>
  );
};

export default Header;
