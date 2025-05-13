
import React from 'react';
import { Sparkles } from 'lucide-react';
import { Button } from './ui/button';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const location = useLocation();
  
  return (
    <header className="flex justify-between items-center py-6 px-4 md:px-8 bg-transparent">
      <div className="flex items-center gap-2">
        <Sparkles className="h-6 w-6 text-cosmos-purple" />
        <Link to="/">
          <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cosmos-purple to-cosmos-pink">
            Generation AI
          </h1>
        </Link>
      </div>
      <div className="flex items-center gap-3">
        <Link to="/" className={location.pathname === "/" ? "font-medium text-cosmos-purple" : "text-foreground/80 hover:text-cosmos-purple transition-colors"}>
          Imágenes
        </Link>
        <Link to="/voice-cloner" className={location.pathname === "/voice-cloner" ? "font-medium text-cosmos-purple" : "text-foreground/80 hover:text-cosmos-purple transition-colors"}>
          Clonador de Voz
        </Link>
        <Button className="bg-gradient-to-r from-cosmos-purple to-cosmos-pink text-white hover:opacity-90">
          <Sparkles className="h-4 w-4 mr-2" />
          <span>Crear</span>
        </Button>
      </div>
    </header>
  );
};

export default Header;
