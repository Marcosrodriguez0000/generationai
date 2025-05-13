
import React from 'react';
import { Sparkles, Images } from 'lucide-react';
import { Button } from './ui/button';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const location = useLocation();
  
  return (
    <header className="flex justify-between items-center py-6 px-4 md:px-8 bg-transparent z-10 border-b border-gold-500/10 backdrop-blur-sm">
      <div className="flex items-center gap-2">
        <Sparkles className="h-6 w-6 text-gold-400" />
        <Link to="/">
          <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gold-400 to-brown-600">
            Luxury AI
          </h1>
        </Link>
      </div>
      <div className="flex items-center gap-3">
        <Link to="/creaciones">
          <Button variant="outline" className="bg-gold-500/10 border-gold-400/20 text-gold-400 hover:bg-gold-500/20">
            <Images className="h-4 w-4 mr-2" />
            <span className="hidden md:inline">Mis Creaciones</span>
            <span className="md:hidden">Galería</span>
          </Button>
        </Link>
        <Link to="/">
          <Button className="bg-gradient-to-r from-gold-400 to-brown-600 text-white hover:opacity-90">
            <Sparkles className="h-4 w-4 mr-2" />
            <span>Crear</span>
          </Button>
        </Link>
      </div>
    </header>
  );
};

export default Header;
