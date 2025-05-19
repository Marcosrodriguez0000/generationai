
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/lib/auth';
import { Button } from './ui/button';
import { Menu, X, Images, Text, Home } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-black/50 backdrop-blur-xl">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center text-white">
            <span className="text-xl md:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-neon-pink to-neon-blue">
              Generation.AI
            </span>
          </Link>

          {isMobile ? (
            <div className="flex items-center">
              <button
                onClick={toggleMenu}
                className="p-2 text-white hover:text-neon-blue transition-colors"
                aria-label="Toggle menu"
              >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          ) : (
            <nav className="flex items-center space-x-1">
              <Link
                to="/"
                className="px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/5 rounded-md transition-colors flex items-center"
              >
                <Home size={16} className="mr-1" />
                Inicio
              </Link>
              <Link
                to="/home"
                className="px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/5 rounded-md transition-colors flex items-center"
              >
                <Images size={16} className="mr-1" />
                Generador
              </Link>
              <Link
                to="/texto"
                className="px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/5 rounded-md transition-colors flex items-center"
              >
                <Text size={16} className="mr-1" />
                Textos
              </Link>
              <Link
                to="/creaciones"
                className="px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/5 rounded-md transition-colors"
              >
                Mis Creaciones
              </Link>
              {user ? (
                <Button variant="ghost" className="text-sm text-gray-300" onClick={handleLogout}>
                  Cerrar sesión
                </Button>
              ) : (
                <div className="flex items-center space-x-1">
                  <Link to="/login">
                    <Button variant="ghost" size="sm">
                      Iniciar sesión
                    </Button>
                  </Link>
                  <Link to="/registro">
                    <Button size="sm" className="bg-gradient-to-r from-neon-pink to-neon-blue text-white">
                      Registro
                    </Button>
                  </Link>
                </div>
              )}
            </nav>
          )}
        </div>

        {/* Mobile Menu */}
        {isMobile && isOpen && (
          <nav className="mt-3 py-2 bg-black/80 backdrop-blur-lg rounded-lg border border-white/10">
            <Link
              to="/"
              className="block px-4 py-2.5 text-gray-300 hover:bg-white/5 flex items-center"
              onClick={() => setIsOpen(false)}
            >
              <Home size={16} className="mr-2" />
              Inicio
            </Link>
            <Link
              to="/home"
              className="block px-4 py-2.5 text-gray-300 hover:bg-white/5 flex items-center"
              onClick={() => setIsOpen(false)}
            >
              <Images size={16} className="mr-2" />
              Generador
            </Link>
            <Link
              to="/texto"
              className="block px-4 py-2.5 text-gray-300 hover:bg-white/5 flex items-center"
              onClick={() => setIsOpen(false)}
            >
              <Text size={16} className="mr-2" />
              Textos
            </Link>
            <Link
              to="/creaciones"
              className="block px-4 py-2.5 text-gray-300 hover:bg-white/5"
              onClick={() => setIsOpen(false)}
            >
              Mis Creaciones
            </Link>
            {user ? (
              <Button
                variant="ghost"
                className="w-full justify-start text-left px-4 py-2.5 text-gray-300 hover:bg-white/5 rounded-none"
                onClick={() => {
                  handleLogout();
                  setIsOpen(false);
                }}
              >
                Cerrar sesión
              </Button>
            ) : (
              <>
                <Link
                  to="/login"
                  className="block px-4 py-2.5 text-gray-300 hover:bg-white/5"
                  onClick={() => setIsOpen(false)}
                >
                  Iniciar sesión
                </Link>
                <Link
                  to="/registro"
                  className="block px-4 py-2.5 text-gray-300 hover:bg-white/5"
                  onClick={() => setIsOpen(false)}
                >
                  Registro
                </Link>
              </>
            )}
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
