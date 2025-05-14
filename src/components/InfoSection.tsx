
import React from 'react';
import { Link } from "react-router-dom";
import { Images } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from '@/lib/auth';

const InfoSection = () => {
  const { user } = useAuth();

  return (
    <div className="max-w-3xl mx-auto mt-16 p-8 bg-black/40 backdrop-blur-md rounded-xl border border-gold-500/10">
      {!user ? (
        <>
          <h3 className="text-2xl font-bold text-gold-400 mb-4">Crea tu cuenta para guardar tus creaciones</h3>
          <p className="text-gold-100/80 mb-6">
            Regístrate para guardar todas tus imágenes generadas y acceder a ellas en cualquier momento desde cualquier dispositivo.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/login">
              <Button className="bg-gradient-to-r from-gold-400 to-brown-600 text-white hover:opacity-90">
                Iniciar sesión
              </Button>
            </Link>
            <Link to="/registro">
              <Button variant="outline" className="border-gold-400/20 bg-gold-500/10 text-gold-400 hover:bg-gold-500/20">
                Crear cuenta
              </Button>
            </Link>
          </div>
        </>
      ) : (
        <>
          <h3 className="text-2xl font-bold text-gold-400 mb-4">¡Gracias por unirte a Generation.AI!</h3>
          <p className="text-gold-100/80 mb-6">
            Ahora puedes guardar todas tus creaciones y acceder a ellas desde cualquier dispositivo.
          </p>
          <div className="flex justify-center">
            <Link to="/creaciones">
              <Button className="bg-gradient-to-r from-gold-400 to-brown-600 text-white hover:opacity-90">
                <Images className="h-4 w-4 mr-2" />
                Ver mis creaciones
              </Button>
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default InfoSection;
