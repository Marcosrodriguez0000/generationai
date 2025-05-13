
import React from 'react';
import { Sparkles, Images, LogIn, LogOut, User } from 'lucide-react';
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
        
        {user ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="bg-gold-500/10 border-gold-400/20 text-gold-400 hover:bg-gold-500/20">
                <User className="h-4 w-4 mr-2" />
                <span className="hidden md:inline truncate max-w-[120px]">
                  {user.email?.split('@')[0]}
                </span>
                <span className="md:hidden">
                  Perfil
                </span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 bg-black/90 border-gold-500/20">
              <DropdownMenuItem className="text-gold-300">
                <User className="mr-2 h-4 w-4" />
                <span className="truncate">{user.email}</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-gold-500/20" />
              <DropdownMenuItem 
                className="text-gold-300 hover:text-white cursor-pointer"
                onClick={handleSignOut}
              >
                <LogOut className="mr-2 h-4 w-4" />
                <span>Cerrar sesión</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Link to="/login">
            <Button variant="outline" className="bg-gold-500/10 border-gold-400/20 text-gold-400 hover:bg-gold-500/20">
              <LogIn className="h-4 w-4 mr-2" />
              <span>Iniciar Sesión</span>
            </Button>
          </Link>
        )}
        
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
