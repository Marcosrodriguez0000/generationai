
import React from 'react';
import { Sparkles } from 'lucide-react';
import { Button } from './ui/button';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const location = useLocation();
  
  return (
    <header className="flex justify-between items-center py-6 px-4 md:px-8 bg-transparent">
      <div className="flex items-center gap-2">
        <Sparkles className="h-6 w-6 text-gold-400" />
        <Link to="/">
          <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gold-400 to-gold-600">
            Luxury AI
          </h1>
        </Link>
      </div>
      <div className="flex items-center gap-3">
        <Button className="bg-gradient-to-r from-gold-400 to-brown-600 text-white hover:opacity-90">
          <Sparkles className="h-4 w-4 mr-2" />
          <span>Crear</span>
        </Button>
      </div>
    </header>
  );
};

export default Header;
