
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
          <div className="flex items-center">
            <img src="/lovable-uploads/48157cfc-e17c-48ae-b114-17d8de9c9469.png" alt="GenerationAI Logo" className="h-10" />
          </div>
        </Link>

        {isMobile ? (
          <div className="flex items-center">
            <button
              onClick={toggleMenu}
              className="p-2 text-white hover:text-white transition-colors"
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        ) : (
          <nav className="flex items-center space-x-2">
            <a
              href="https://generationia.framer.website/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-1.5 py-1 text-xs text-white hover:text-white transition-colors"
            >
              Inicio
            </a>
            <Link
              to="/home"
              className="px-1.5 py-1 text-xs text-white hover:text-white transition-colors"
            >
              Generador
            </Link>
            <Link
              to="/pixar"
              className="px-1.5 py-1 text-xs text-white hover:text-white transition-colors"
            >
              Pixar
            </Link>
            <Link
              to="/creaciones"
              className="px-1.5 py-1 text-xs text-white hover:text-white transition-colors"
            >
              Mis creaciones
            </Link>
            {user ? (
              <Button variant="ghost" className="text-xs text-white px-1.5 py-0.5 h-6" onClick={handleLogout}>
                Cerrar sesión
              </Button>
            ) : (
              <Link to="/login">
                <Button size="sm" className="bg-[#9333EA] hover:bg-[#7E22CE] text-white border-0 rounded-md px-3 py-0.5 h-6 text-xs">
                  Iniciar Sesión
                </Button>
              </Link>
            )}
          </nav>
        )}

        {/* Mobile Menu */}
        {isMobile && isOpen && (
          <nav className="mt-3 py-2 bg-black/90 backdrop-blur-lg rounded-lg border border-white/10 absolute top-full left-4 right-4">
            <a
              href="https://generationia.framer.website/"
              target="_blank"
              rel="noopener noreferrer"
              className="block px-4 py-2 text-xs text-white hover:bg-white/5 flex items-center"
              onClick={() => setIsOpen(false)}
            >
              Inicio
            </a>
            <Link
              to="/home"
              className="block px-4 py-2 text-xs text-white hover:bg-white/5 flex items-center"
              onClick={() => setIsOpen(false)}
            >
              Generador
            </Link>
            <Link
              to="/pixar"
              className="block px-4 py-2 text-xs text-white hover:bg-white/5 flex items-center"
              onClick={() => setIsOpen(false)}
            >
              Pixar
            </Link>
            <Link
              to="/creaciones"
              className="block px-4 py-2 text-xs text-white hover:bg-white/5"
              onClick={() => setIsOpen(false)}
            >
              Mis Creaciones
            </Link>
            {user ? (
              <Button
                variant="ghost"
                className="w-full justify-start text-left px-4 py-2 text-xs text-white hover:bg-white/5 rounded-none"
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
                  className="block px-4 py-2 text-xs text-white hover:bg-white/5"
                  onClick={() => setIsOpen(false)}
                >
                  Iniciar sesión
                </Link>
                <Link
                  to="/registro"
                  className="block px-4 py-2 text-xs text-white hover:bg-white/5"
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
