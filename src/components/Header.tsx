
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/lib/auth';
import { Button } from './ui/button';
import { Menu, X, Images, Home } from 'lucide-react';
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
    <header className="sticky top-0 z-50 border-b border-[#222222] bg-black/80 backdrop-blur-xl">
      <div className="mx-auto w-full max-w-[1200px] px-4 py-3 flex flex-row justify-between items-center">
        <Link to="/" className="flex items-center text-white">
          <span className="text-xl md:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-500 via-blue-500 to-indigo-500">
            Generation.AI
          </span>
        </Link>

        {isMobile ? (
          <div className="flex items-center">
            <button
              onClick={toggleMenu}
              className="p-2 text-white hover:text-blue-400 transition-colors"
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        ) : (
          <nav className="flex items-center space-x-2">
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
              <div className="flex items-center space-x-2">
                <Link to="/login">
                  <Button variant="ghost" size="sm" className="text-gray-300 hover:text-white hover:bg-white/5">
                    Iniciar sesión
                  </Button>
                </Link>
                <Link to="/registro">
                  <Button size="sm" className="bg-gradient-to-r from-purple-500 to-blue-600 hover:from-purple-600 hover:to-blue-700 text-white border-0">
                    Registro
                  </Button>
                </Link>
              </div>
            )}
          </nav>
        )}

        {/* Mobile Menu */}
        {isMobile && isOpen && (
          <nav className="mt-3 py-2 bg-black/90 backdrop-blur-lg rounded-lg border border-white/10 absolute top-full left-4 right-4">
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
