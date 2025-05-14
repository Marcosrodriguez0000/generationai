
import React, { useState } from 'react';
import { toast } from "sonner";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import PromptInput from "@/components/PromptInput";
import CosmosBackground from "@/components/CosmosBackground";
import { Images, Save } from "lucide-react";
import { generateImage } from "@/services/imageService";
import { saveUserImage } from "@/services/userImageService";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { useAuth } from '@/lib/auth';
import ImageGallery from '@/components/ImageGallery';
import { useIsMobile } from '@/hooks/use-mobile';

interface ImageItem {
  id: string;
  url: string;
  prompt: string;
}

// Ejemplos de imágenes IA con sus prompts
const exampleImages: ImageItem[] = [
  {
    id: "example1",
    url: "/lovable-uploads/67c20ac8-f57f-4415-9e95-ab013380ea69.png",
    prompt: "Casa moderna de diseño minimalista con fachada de cristal curvada, rodeada de árboles, iluminación cálida interior al atardecer, estilo arquitectónico contemporáneo futurista"
  },
  {
    id: "example2",
    url: "/lovable-uploads/734f2359-a7ce-4a38-87a5-b1da0be658dd.png",
    prompt: "Pareja bailando bajo un cielo estrellado con la Vía Láctea visible, en un camino pavimentado rodeado de árboles, fotografía nocturna romántica con iluminación natural"
  },
  {
    id: "example3",
    url: "/lovable-uploads/d39c38e0-84e5-4d33-808f-89c51a0a571b.png",
    prompt: "Frasco de perfume de lujo con etiqueta azul y dorada, sobre fondo negro, fotografía de producto de alta definición con iluminación profesional, transparencia y reflejos"
  },
  {
    id: "example4",
    url: "/lovable-uploads/320d93c4-bd61-47d1-895b-3aae110db3f2.png",
    prompt: "Retrato hiperrealista de un hombre mayor con expresión pensativa, arrugas detalladas, iluminación dramática lateral, fotografía en primer plano con enfoque en la textura de la piel"
  },
  // Nuevas imágenes añadidas
  {
    id: "example5",
    url: "/lovable-uploads/81ebe13b-f3e0-4241-ad7f-a8171be4d604.png",
    prompt: "Reloj de lujo con esfera negra y detalles dorados sobre fondo negro aterciopelado, fotografía de producto de alta calidad, iluminación premium"
  },
  {
    id: "example6",
    url: "/lovable-uploads/960f4a5e-5cbc-4422-b617-a6e3243cf080.png",
    prompt: "Taza de café con leche con espuma cremosa y caramelo sobre mesa de madera rústica, fotografía gastronómica con enfoque selectivo, iluminación cálida"
  },
  {
    id: "example7",
    url: "/lovable-uploads/a5178690-a147-4f3b-a9ea-6930e431c878.png",
    prompt: "Hamburguesa gourmet flotante con queso cheddar derretido, lechuga fresca y tomate sobre fondo oscuro difuminado, fotografía publicitaria de alimentos"
  },
  {
    id: "example8",
    url: "/lovable-uploads/933918f5-51fe-44d5-a927-ff1f83961b9c.png",
    prompt: "Oficina en casa minimalista con escritorio de madera, silla ergonómica, ordenador Mac, plantas decorativas y arte en la pared, estilo escandinavo, luz natural"
  }
];

interface IndexProps {
  generatedImages: ImageItem[];
  setGeneratedImages: React.Dispatch<React.SetStateAction<ImageItem[]>>;
}

const Index = ({ generatedImages, setGeneratedImages }: IndexProps) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [lastGeneratedImage, setLastGeneratedImage] = useState<ImageItem | null>(null);
  const { user } = useAuth();
  const isMobile = useIsMobile();

  const handleGenerate = async (prompt: string) => {
    setIsGenerating(true);

    try {
      toast("Generando imagen...", {
        description: "Esto puede tomar unos segundos.",
      });

      // Use default settings
      const imageUrl = await generateImage(prompt, { resolution: "512x512", quality: 7 });
      
      // Create new image object
      const newImage: ImageItem = {
        id: Date.now().toString(),
        url: imageUrl,
        prompt
      };

      // Store the last generated image
      setLastGeneratedImage(newImage);
      
      // Add the new image to the beginning of the array
      setGeneratedImages(prev => [newImage, ...prev]);

      toast("¡Imagen generada exitosamente!", {
        description: "Tu imagen ha sido creada.",
      });
      
      // If user is logged in, save the image automatically
      if (user) {
        try {
          await saveUserImage(imageUrl, prompt);
        } catch (error) {
          console.error("Error saving image to user account:", error);
        }
      }
    } catch (error) {
      console.error("Error generating image:", error);
      toast("Error al generar la imagen", {
        description: "Ha ocurrido un error. Por favor intenta nuevamente.",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSaveImage = async () => {
    if (!lastGeneratedImage || !user) return;
    
    try {
      await saveUserImage(lastGeneratedImage.url, lastGeneratedImage.prompt);
    } catch (error) {
      console.error("Error saving image:", error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-black">
      <CosmosBackground />
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="text-center mb-10 max-w-2xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gold-400 to-brown-600 mb-4">
            Generation.AI
          </h1>
          <p className="text-lg text-gold-300 mb-6">
            Describe lo que imaginas y deja que la IA lo convierta en realidad
          </p>
        </div>

        <PromptInput onGenerate={handleGenerate} isGenerating={isGenerating} />

        {lastGeneratedImage && (
          <div className="my-8 max-w-md mx-auto">
            <Card className="overflow-hidden border-gold-200/20 bg-black/50 backdrop-blur-sm">
              <AspectRatio ratio={1/1}>
                <img 
                  src={lastGeneratedImage.url} 
                  alt={lastGeneratedImage.prompt} 
                  className="w-full h-full object-cover"
                />
              </AspectRatio>
              <CardHeader className="py-3">
                <CardTitle className="text-lg text-gold-400">Última creación</CardTitle>
              </CardHeader>
              <CardContent className="pb-4">
                <CardDescription className="text-gold-100/80 mb-4">
                  {lastGeneratedImage.prompt}
                </CardDescription>
                <div className="flex gap-3 justify-center">
                  {user && (
                    <Button 
                      onClick={handleSaveImage}
                      className="bg-gradient-to-r from-gold-400 to-brown-600 text-white hover:opacity-90"
                    >
                      <Save className="h-4 w-4 mr-2" />
                      Guardar en mi colección
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {generatedImages.length > 0 && (
          <div className="text-center mt-8">
            <Link to="/creaciones">
              <Button variant="outline" className="bg-gold-500/10 border-gold-400/20 text-gold-400 hover:bg-gold-500/20">
                <Images className="h-4 w-4 mr-2" />
                Ver mis creaciones ({generatedImages.length})
              </Button>
            </Link>
          </div>
        )}
        
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-center text-gold-300 mb-4">
            El Poder de la IA en Tus Manos
          </h2>
          <p className="text-gold-100/80 mb-8 max-w-3xl mx-auto text-center">
            Nuestra tecnología de inteligencia artificial puede generar imágenes impresionantes a partir de tus descripciones. Inspírate con estos ejemplos creados por nuestra IA.
          </p>
          
          <ImageGallery images={exampleImages} columns={4} />
          
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
        </div>
      </main>
      <footer className="py-6 text-center text-sm text-gold-500/50">
        <p>© 2025 Generation.AI</p>
      </footer>
    </div>
  );
};

export default Index;
