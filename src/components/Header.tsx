
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from './ui/button';
import { useAuth } from '@/lib/auth';

const Header = () => {
  const location = useLocation();
  const { user, signOut } = useAuth();

  return (
    <header className="w-full py-4 px-5 z-10 relative backdrop-blur-md bg-black/20 border-b border-white/5">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <Link to="/" className="text-white text-xl font-bold">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-neon-pink to-neon-blue">
              Generation.AI
            </span>
          </Link>
          <nav className="ml-8 hidden md:flex gap-6">
            <Link to="/" className={`text-sm ${location.pathname === '/' ? 'text-white' : 'text-gray-400 hover:text-white'} transition-colors`}>
              Imágenes
            </Link>
            <Link to="/studio" className={`text-sm ${location.pathname === '/studio' ? 'text-white' : 'text-gray-400 hover:text-white'} transition-colors`}>
              Studio
            </Link>
            <Link to="/creaciones" className={`text-sm ${location.pathname === '/creaciones' ? 'text-white' : 'text-gray-400 hover:text-white'} transition-colors`}>
              Mis Creaciones
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          {user ? (
            <>
              <Button 
                onClick={signOut}
                variant="outline" 
                className="hidden sm:flex bg-transparent border-white/10 text-white hover:bg-white/10"
                size="sm"
              >
                Cerrar Sesión
              </Button>
            </>
          ) : (
            <>
              <Link to="/login">
                <Button 
                  variant="outline" 
                  className="bg-transparent border-white/10 text-white hover:bg-white/10"
                  size="sm"
                >
                  Iniciar Sesión
                </Button>
              </Link>
              <Link to="/registro">
                <Button 
                  className="bg-gradient-to-r from-neon-pink to-neon-blue text-white hover:opacity-90"
                  size="sm"
                >
                  Registrarse
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
