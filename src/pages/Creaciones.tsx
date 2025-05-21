
import React, { useEffect, useState } from 'react';
import Header from "@/components/Header";
import ImageGallery from "@/components/ImageGallery";
import CosmosBackground from "@/components/CosmosBackground";
import { Link } from 'react-router-dom';
import { ArrowLeft, LogIn, Loader2 } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useAuth } from '@/lib/auth';
import { getUserImages, UserImage } from '@/services/userImageService';
import Footer from "@/components/Footer";
import { ImageItem } from '@/types/image';

interface CreacionesProps {
  images: ImageItem[];
}

// Ejemplos de imágenes IA con sus prompts
const exampleImages: ImageItem[] = [
  {
    id: "example1",
    url: "/lovable-uploads/1beca87b-3afc-4311-90eb-d102237b51de.png",
    prompt: "Retrato en blanco y negro de hombre con barba, iluminación dramática de estudio"
  },
  {
    id: "example2",
    url: "/lovable-uploads/44077103-c1f1-439e-b79c-17facdc4b0a1.png",
    prompt: "Estatua griega con gafas de sol rosadas, auriculares y chicle, estilo moderno"
  },
  {
    id: "example3",
    url: "/lovable-uploads/ac16ab61-8c45-4060-87af-984af62b0b49.png",
    prompt: "Dragón dorado con ojos azules brillantes, detalle de escamas y textura realista"
  },
  {
    id: "example4",
    url: "/lovable-uploads/a2fe8353-b15a-4164-995a-de27a770bf92.png",
    prompt: "Calle lluviosa de Tokio por la noche, con luces de neón reflejadas en el pavimento mojado"
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
    <div className="min-h-screen flex flex-col bg-[#050510]">
      <CosmosBackground />
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="mb-6 flex items-center">
          <Link to="/">
            <Button className="bg-[#9333EA] hover:bg-[#7E22CE] text-white border-0 rounded-md px-6">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Volver al inicio
            </Button>
          </Link>
          <h1 className="text-3xl font-bold ml-4 text-white">
            Mis Creaciones
          </h1>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <Loader2 className="h-8 w-8 animate-spin mx-auto text-[#9333EA] mb-4" />
            <p className="text-white/80">Cargando tus imágenes...</p>
          </div>
        ) : !user && images.length === 0 ? (
          <div className="text-center py-12 glass-card rounded-xl max-w-xl mx-auto">
            <div className="mb-4 mx-auto w-16 h-16 rounded-full bg-white/5 flex items-center justify-center">
              <LogIn className="h-8 w-8 text-[#9333EA]" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">
              Inicia sesión para guardar tus creaciones
            </h2>
            <p className="text-white mb-6">
              Crea una cuenta para guardar todas tus imágenes generadas
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/login">
                <Button className="bg-[#9333EA] hover:bg-[#7E22CE] text-white border-0 rounded-md px-6">
                  <LogIn className="h-4 w-4 mr-2" />
                  Iniciar sesión
                </Button>
              </Link>
              <Link to="/registro">
                <Button className="bg-[#9333EA] hover:bg-[#7E22CE] text-white border-0 rounded-md px-6">
                  Crear cuenta
                </Button>
              </Link>
            </div>
          </div>
        ) : displayImages.length === 0 ? (
          <div className="text-center py-12 glass-card rounded-xl max-w-xl mx-auto">
            <div className="mb-4 mx-auto w-16 h-16 rounded-full bg-white/5 flex items-center justify-center">
              <ArrowLeft className="h-8 w-8 text-[#9333EA]" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">
              No tienes creaciones aún
            </h2>
            <p className="text-white mb-6">
              Regresa a la página principal y genera tu primera imagen
            </p>
            <Link to="/">
              <Button className="bg-[#9333EA] hover:bg-[#7E22CE] text-white border-0 rounded-md px-6">
                Crear primera imagen
              </Button>
            </Link>
          </div>
        ) : (
          <>
            <h2 className="text-2xl font-bold mb-6 text-white">Galería de inspiración</h2>
            <ImageGallery images={displayImages} columns={6} />
          </>
        )}
        
        <div className="max-w-3xl mx-auto mt-16 p-8 glass-card rounded-xl">
          <h3 className="text-2xl font-bold text-white mb-4">¿Tienes ideas para mejorar la app?</h3>
          <p className="text-white mb-6">
            Nos encantaría conocer tu opinión y sugerencias para hacer de Generation.AI una herramienta aún mejor para ti.
          </p>
          <div className="flex justify-center">
            <Button className="bg-[#9333EA] hover:bg-[#7E22CE] text-white border-0 rounded-md px-6">
              Enviar Feedback
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Creaciones;
