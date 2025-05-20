
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/lib/auth';
import { Button } from './ui/button';
import { Menu, X } from 'lucide-react';
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
    <header className="sticky top-0 z-50 border-b border-[#222222] bg-black backdrop-blur-xl">
      <div className="mx-auto w-full max-w-[1200px] px-10 py-3 flex flex-row justify-between items-center">
        <Link to="/" className="flex items-center text-white">
          <div className="flex items-center gap-2">
            <div className="bg-white rounded-md p-1">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 8L8 13L3 18" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M8 8L13 13L8 18" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M13 8L18 13L13 18" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <span className="text-xl md:text-2xl font-bold">
              GenerationAI
            </span>
          </div>
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
          <nav className="flex items-center space-x-8">
            <Link
              to="/"
              className="px-3 py-2 text-base text-gray-300 hover:text-white transition-colors"
            >
              Inicio
            </Link>
            <Link
              to="/home"
              className="px-3 py-2 text-base text-gray-300 hover:text-white transition-colors"
            >
              Generador
            </Link>
            <Link
              to="/creaciones"
              className="px-3 py-2 text-base text-gray-300 hover:text-white transition-colors"
            >
              Mis creaciones
            </Link>
            {user ? (
              <Button variant="ghost" className="text-base text-gray-300" onClick={handleLogout}>
                Cerrar sesión
              </Button>
            ) : (
              <Link to="/login">
                <Button size="sm" className="bg-[#9333EA] hover:bg-[#7E22CE] text-white border-0 rounded-md px-6">
                  Iniciar Sesión
                </Button>
              </Link>
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
