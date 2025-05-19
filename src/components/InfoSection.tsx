
import React from 'react';
import { Link } from "react-router-dom";
import { Images, Save, BrainCircuit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from '@/lib/auth';

const InfoSection = () => {
  const { user } = useAuth();

  return (
    <div className="max-w-3xl mx-auto mt-16 p-8 bg-black/40 backdrop-blur-md rounded-xl border border-neon-blue/10">
      {!user ? (
        <>
          <div className="flex items-center justify-center mb-4">
            <BrainCircuit className="h-8 w-8 text-neon-blue mr-3" />
            <h3 className="text-2xl font-bold text-neon-blue">Crea tu cuenta para guardar tus creaciones</h3>
          </div>
          <p className="text-gray-300/80 mb-6">
            Regístrate para guardar todas tus imágenes generadas y acceder a ellas en cualquier momento desde cualquier dispositivo.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/login">
              <Button className="bg-gradient-to-r from-neon-pink to-neon-blue text-white hover:opacity-90">
                Iniciar sesión
              </Button>
            </Link>
            <Link to="/registro">
              <Button variant="outline" className="border-neon-blue/20 bg-neon-blue/10 text-neon-blue hover:bg-neon-blue/20">
                Crear cuenta
              </Button>
            </Link>
          </div>
        </>
      ) : (
        <>
          <div className="flex items-center justify-center mb-4">
            <BrainCircuit className="h-8 w-8 text-neon-blue mr-3" />
            <h3 className="text-2xl font-bold text-neon-blue">¡Gracias por unirte a Generation.AI!</h3>
          </div>
          <p className="text-gray-300/80 mb-6">
            Ahora puedes guardar todas tus creaciones y acceder a ellas desde cualquier dispositivo.
          </p>
          <div className="flex justify-center">
            <Link to="/creaciones">
              <Button className="bg-gradient-to-r from-neon-pink to-neon-blue text-white hover:opacity-90">
                <Save className="h-4 w-4 mr-2" />
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
