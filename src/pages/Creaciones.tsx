
import React from 'react';
import Header from "@/components/Header";
import ImageGallery from "@/components/ImageGallery";
import CosmosBackground from "@/components/CosmosBackground";
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from "@/components/ui/button";

interface ImageItem {
  id: string;
  url: string;
  prompt: string;
}

interface CreacionesProps {
  images: ImageItem[];
}

const Creaciones = ({ images }: CreacionesProps) => {
  return (
    <div className="min-h-screen flex flex-col bg-black">
      <CosmosBackground />
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="mb-6 flex items-center">
          <Link to="/">
            <Button variant="outline" className="border-gold-400/20 bg-gold-500/10 text-gold-400 hover:bg-gold-500/20">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Volver al inicio
            </Button>
          </Link>
          <h1 className="text-3xl font-bold ml-4 bg-clip-text text-transparent bg-gradient-to-r from-gold-400 to-brown-600">
            Mis Creaciones
          </h1>
        </div>

        {images.length === 0 ? (
          <div className="text-center py-12 bg-black/40 backdrop-blur-md rounded-xl border border-gold-500/10 max-w-xl mx-auto">
            <div className="mb-4 mx-auto w-16 h-16 rounded-full bg-gold-500/10 flex items-center justify-center">
              <ArrowLeft className="h-8 w-8 text-gold-400" />
            </div>
            <h2 className="text-2xl font-bold text-gold-300 mb-2">
              No tienes creaciones aún
            </h2>
            <p className="text-gold-100/80 mb-6">
              Regresa a la página principal y genera tu primera imagen
            </p>
            <Link to="/">
              <Button className="bg-gradient-to-r from-gold-400 to-brown-600 text-white hover:opacity-90">
                Crear primera imagen
              </Button>
            </Link>
          </div>
        ) : (
          <ImageGallery images={images} />
        )}
        
        <div className="max-w-3xl mx-auto mt-16 p-8 bg-black/40 backdrop-blur-md rounded-xl border border-gold-500/10">
          <h3 className="text-2xl font-bold text-gold-400 mb-4">¿Quieres guardar tus creaciones?</h3>
          <p className="text-gold-100/80 mb-6">
            Crea una cuenta para guardar todas tus imágenes generadas de forma permanente y acceder a ellas desde cualquier dispositivo.
          </p>
          <div className="flex justify-center">
            <Button className="bg-gradient-to-r from-gold-400 to-brown-600 text-white py-6 px-8 hover:opacity-90 rounded-xl">
              Crear Cuenta
            </Button>
          </div>
        </div>
      </main>
      <footer className="py-6 text-center text-sm text-gold-500/50">
        <p>© 2025 Luxury AI</p>
      </footer>
    </div>
  );
};

export default Creaciones;
