
import React, { useEffect, useState } from 'react';
import Header from "@/components/Header";
import ImageGallery from "@/components/ImageGallery";
import CosmosBackground from "@/components/CosmosBackground";
import { Link } from 'react-router-dom';
import { ArrowLeft, LogIn, Loader2 } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useAuth } from '@/lib/auth';
import { getUserImages, UserImage } from '@/services/userImageService';

interface ImageItem {
  id: string;
  url: string;
  prompt: string;
}

interface CreacionesProps {
  images: ImageItem[];
}

// Ejemplos de imágenes IA con sus prompts
const exampleImages: ImageItem[] = [
  {
    id: "example1",
    url: "/lovable-uploads/fecfd663-f992-4ed7-94d2-9e13e26eb0e3.png",
    prompt: "Dragón azul brillante posado sobre una montaña nevada, con amplias alas desplegadas contra un cielo celeste"
  },
  {
    id: "example2",
    url: "/lovable-uploads/5397d569-8d3a-4c33-bc04-ba917f7dc3a1.png",
    prompt: "Elefante africano caminando en la sabana al atardecer, con cielo anaranjado y siluetas de árboles de acacia"
  },
  {
    id: "example3",
    url: "/lovable-uploads/a2fe8353-b15a-4164-995a-de27a770bf92.png",
    prompt: "Calle lluviosa de Tokio por la noche, con personas caminando con paraguas y luces de neón reflejadas en el pavimento mojado"
  },
  {
    id: "example4",
    url: "/lovable-uploads/7170fe0d-9fa1-475e-ae85-387d309f32e9.png",
    prompt: "Escena futurista con nave espacial y astronauta observando dos lunas sobre un planeta distante"
  }
];

const Creaciones = ({ images }: CreacionesProps) => {
  const { user } = useAuth();
  const [userImages, setUserImages] = useState<UserImage[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUserImages = async () => {
      if (user) {
        setLoading(true);
        try {
          const fetchedImages = await getUserImages();
          setUserImages(fetchedImages);
        } catch (error) {
          console.error("Error fetching user images:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchUserImages();
  }, [user]);

  // Combine temporary images from state with saved user images
  const displayImages = user 
    ? userImages.map(img => ({
        id: img.id,
        url: img.url,
        prompt: img.prompt
      }))
    : images.length > 0 ? images : exampleImages;

  const handleDeleteImage = (id: string) => {
    setUserImages(prev => prev.filter(img => img.id !== id));
  };

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

        {loading ? (
          <div className="text-center py-12">
            <Loader2 className="h-8 w-8 animate-spin mx-auto text-gold-400 mb-4" />
            <p className="text-gold-300">Cargando tus imágenes...</p>
          </div>
        ) : !user && images.length === 0 ? (
          <div className="text-center py-12 bg-black/40 backdrop-blur-md rounded-xl border border-gold-500/10 max-w-xl mx-auto">
            <div className="mb-4 mx-auto w-16 h-16 rounded-full bg-gold-500/10 flex items-center justify-center">
              <LogIn className="h-8 w-8 text-gold-400" />
            </div>
            <h2 className="text-2xl font-bold text-gold-300 mb-2">
              Inicia sesión para guardar tus creaciones
            </h2>
            <p className="text-gold-100/80 mb-6">
              Crea una cuenta para guardar todas tus imágenes generadas
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/login">
                <Button className="bg-gradient-to-r from-gold-400 to-brown-600 text-white hover:opacity-90">
                  <LogIn className="h-4 w-4 mr-2" />
                  Iniciar sesión
                </Button>
              </Link>
              <Link to="/registro">
                <Button variant="outline" className="border-gold-400/20 bg-gold-500/10 text-gold-400 hover:bg-gold-500/20">
                  Crear cuenta
                </Button>
              </Link>
            </div>
          </div>
        ) : displayImages.length === 0 ? (
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
          <>
            <h2 className="text-2xl font-bold mb-6 text-gold-300">Galería de inspiración</h2>
            <ImageGallery images={displayImages} columns={4} />
          </>
        )}
        
        <div className="max-w-3xl mx-auto mt-16 p-8 bg-black/40 backdrop-blur-md rounded-xl border border-gold-500/10">
          <h3 className="text-2xl font-bold text-gold-400 mb-4">¿Tienes ideas para mejorar la app?</h3>
          <p className="text-gold-100/80 mb-6">
            Nos encantaría conocer tu opinión y sugerencias para hacer de Generation.AI una herramienta aún mejor para ti.
          </p>
          <div className="flex justify-center">
            <Button className="bg-gradient-to-r from-gold-400 to-brown-600 text-white py-6 px-8 hover:opacity-90 rounded-xl">
              Enviar Feedback
            </Button>
          </div>
        </div>
      </main>
      <footer className="py-6 text-center text-sm text-gold-500/50">
        <p>© 2025 Generation.AI</p>
      </footer>
    </div>
  );
};

export default Creaciones;
