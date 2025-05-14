
import React, { useState } from 'react';
import { toast } from "sonner";
import Header from "@/components/Header";
import PromptInput from "@/components/PromptInput";
import CosmosBackground from "@/components/CosmosBackground";
import { generateImage } from "@/services/imageService";
import { saveUserImage } from "@/services/userImageService";
import { useAuth } from '@/lib/auth';
import LastGeneratedImage from '@/components/LastGeneratedImage';
import CreationsCallToAction from '@/components/CreationsCallToAction';
import Footer from '@/components/Footer';
import { ImageItem } from '@/types/image';

// Ejemplos de imágenes IA con sus prompts y badges
const exampleImages: ImageItem[] = [
  {
    id: "example1",
    url: "/lovable-uploads/67c20ac8-f57f-4415-9e95-ab013380ea69.png",
    prompt: "Casa moderna de diseño minimalista con fachada de cristal curvada",
    badge: "NEW"
  },
  {
    id: "example2",
    url: "/lovable-uploads/734f2359-a7ce-4a38-87a5-b1da0be658dd.png",
    prompt: "Pareja bailando bajo un cielo estrellado con la Vía Láctea visible",
  },
  {
    id: "example3",
    url: "/lovable-uploads/d39c38e0-84e5-4d33-808f-89c51a0a571b.png",
    prompt: "Frasco de perfume de lujo con etiqueta azul y dorada",
    badge: "UPDATE"
  },
  {
    id: "example4",
    url: "/lovable-uploads/320d93c4-bd61-47d1-895b-3aae110db3f2.png",
    prompt: "Retrato hiperrealista de un hombre mayor con expresión pensativa",
  },
  {
    id: "example5",
    url: "/lovable-uploads/81ebe13b-f3e0-4241-ad7f-a8171be4d604.png",
    prompt: "Reloj de lujo con esfera negra y detalles dorados",
  },
  {
    id: "example6",
    url: "/lovable-uploads/960f4a5e-5cbc-4422-b617-a6e3243cf080.png",
    prompt: "Taza de café con leche con espuma cremosa y caramelo",
    badge: "NEW"
  },
];

interface IndexProps {
  generatedImages: ImageItem[];
  setGeneratedImages: React.Dispatch<React.SetStateAction<ImageItem[]>>;
}

const Index = ({ generatedImages, setGeneratedImages }: IndexProps) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [lastGeneratedImage, setLastGeneratedImage] = useState<ImageItem | null>(null);
  const { user } = useAuth();

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
        prompt,
        badge: "NEW"
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
      toast("Imagen guardada", {
        description: "La imagen se ha guardado en tu colección",
      });
    } catch (error) {
      console.error("Error saving image:", error);
      toast("Error al guardar", {
        description: "No se pudo guardar la imagen",
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#050510]">
      <CosmosBackground />
      <Header />
      
      <main className="flex-1 container mx-auto px-5 py-10">
        {/* Sección de información personal o descripción */}
        <div className="max-w-3xl mx-auto mb-12 mt-8">
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-neon-pink to-neon-blue mb-6">
              Generation.AI
            </h1>
            <p className="text-gray-300 text-lg mb-8">
              Describe lo que imaginas y deja que la inteligencia artificial lo convierta en realidad
            </p>
          </div>
          
          {/* Barra para escribir prompts con estilo moderno */}
          <div className="relative mb-12 glass-card p-6 rounded-xl backdrop-blur-lg bg-black/20 border border-white/5">
            <PromptInput 
              onGenerate={handleGenerate} 
              isGenerating={isGenerating} 
            />
          </div>
          
          {/* Sección de la última imagen generada */}
          <LastGeneratedImage image={lastGeneratedImage} onSave={handleSaveImage} />
          
          {/* Ver mis creaciones */}
          <CreationsCallToAction count={generatedImages.length} />
        </div>
        
        {/* Sección de proyectos destacados */}
        <div className="mt-24 mb-12">
          <h2 className="text-2xl font-semibold text-white mb-2">PROYECTOS DESTACADOS</h2>
          <p className="text-gray-400 mb-8">Imágenes generadas por IA con distintos estilos y temáticas</p>
          
          {/* Grid de ejemplos con el estilo de la imagen de referencia */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {exampleImages.slice(0, 6).map((image) => (
              <div key={image.id} className="relative group overflow-hidden rounded-lg">
                {/* Badge condicional */}
                {image.badge && (
                  <div className={`absolute top-3 left-3 z-10 py-1 px-2 text-xs font-medium rounded-full
                    ${image.badge === 'NEW' ? 'bg-neon-blue text-white' : 'bg-neon-pink text-white'}`}>
                    {image.badge}
                  </div>
                )}
                
                {/* Imagen */}
                <div className="aspect-square bg-[#13131e] overflow-hidden relative">
                  <img 
                    src={image.url} 
                    alt={image.prompt} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                
                {/* Texto inferior */}
                <div className="p-4 bg-[#13131e]">
                  <h3 className="text-white font-medium mb-1 truncate">
                    {image.prompt.split(' ').slice(0, 3).join(' ')}...
                  </h3>
                  <p className="text-gray-400 text-sm">
                    {image.prompt.length > 50 ? `${image.prompt.substring(0, 50)}...` : image.prompt}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
