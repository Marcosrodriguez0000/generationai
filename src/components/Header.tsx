
import React from 'react';
import { Sparkles, Images, LogIn, LogOut, User, Home, Plus, BookOpen, Clock } from 'lucide-react';
import { Button } from './ui/button';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/lib/auth';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { toast } from 'sonner';

const Header = () => {
  const location = useLocation();
  const { user, signOut } = useAuth();
  
  const handleSignOut = async () => {
    await signOut();
    toast("Sesión cerrada", {
      description: "Has cerrado sesión correctamente"
    });
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  return (
    <header className="flex justify-between items-center py-5 px-6 md:px-10 z-10 backdrop-blur-md bg-black/20">
      <div className="flex items-center gap-2">
        <Link to="/" className="flex items-center">
          <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-neon-pink to-neon-blue">
            Generation.AI
          </span>
        </Link>
      </div>

      {/* Navegación principal, estilo similar a la imagen de referencia */}
      <nav className="hidden md:flex items-center gap-8">
        <Link to="/" className={`text-sm ${isActive('/') ? 'text-white' : 'text-gray-400 hover:text-white'} transition-colors`}>
          inicio
        </Link>
        <Link to="/creaciones" className={`text-sm ${isActive('/creaciones') ? 'text-white' : 'text-gray-400 hover:text-white'} transition-colors`}>
          galería
        </Link>
        <Link to="/about" className={`text-sm ${isActive('/about') ? 'text-white' : 'text-gray-400 hover:text-white'} transition-colors`}>
          sobre nosotros
        </Link>
        <div className="relative group">
          <button className="text-sm text-gray-400 hover:text-white transition-colors flex items-center gap-1">
            más
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-down w-4 h-4">
              <path d="m6 9 6 6 6-6"/>
            </svg>
          </button>
          <div className="absolute top-full left-0 mt-2 w-40 invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all duration-300 bg-[#0f0f19] border border-white/10 rounded-md shadow-lg overflow-hidden">
            <Link to="/ayuda" className="block px-4 py-2 text-sm text-gray-400 hover:text-white hover:bg-white/5">
              Ayuda
            </Link>
            <Link to="/contacto" className="block px-4 py-2 text-sm text-gray-400 hover:text-white hover:bg-white/5">
              Contacto
            </Link>
          </div>
        </div>
      </nav>

      <div className="flex items-center gap-3">
        {/* Enlace a creaciones en versión móvil */}
        <Link to="/creaciones" className="md:hidden">
          <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
            <Images className="h-5 w-5" />
          </Button>
        </Link>
        
        {user ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="border border-white/10 bg-white/5 hover:bg-white/10 rounded-full w-9 h-9 p-0">
                <span className="sr-only">Perfil</span>
                <User className="h-5 w-5 text-white" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 bg-[#0f0f19] border-white/10">
              <DropdownMenuItem className="text-white">
                <User className="mr-2 h-4 w-4" />
                <span className="truncate">{user.email}</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-white/10" />
              <DropdownMenuItem 
                className="text-gray-300 hover:text-white cursor-pointer"
                onClick={handleSignOut}
              >
                <LogOut className="mr-2 h-4 w-4" />
                <span>Cerrar sesión</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Link to="/login">
            <Button variant="ghost" size="sm" className="border border-white/10 bg-white/5 hover:bg-white/10 text-white">
              <LogIn className="h-4 w-4 mr-2" />
              <span>Iniciar Sesión</span>
            </Button>
          </Link>
        )}

        <Link to="/">
          <Button className="bg-white text-[#0f0f19] hover:bg-white/90 flex items-center gap-1.5">
            <Plus className="h-4 w-4" />
            <span>Crear</span>
          </Button>
        </Link>
      </div>
    </header>
  );
};

export default Header;
