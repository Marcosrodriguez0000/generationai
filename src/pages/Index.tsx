
import React, { useState } from 'react';
import { toast } from "sonner";
import Header from "@/components/Header";
import PromptInput from "@/components/PromptInput";
import CosmosBackground from "@/components/CosmosBackground";
import { generateImage } from "@/services/imageService";
import { saveUserImage } from "@/services/userImageService";
import { useAuth } from '@/lib/auth';
import HeroSection from '@/components/HeroSection';
import LastGeneratedImage from '@/components/LastGeneratedImage';
import CreationsCallToAction from '@/components/CreationsCallToAction';
import ExamplesSection from '@/components/ExamplesSection';
import InfoSection from '@/components/InfoSection';
import Footer from '@/components/Footer';
import { ImageItem } from '@/types/image';

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
  },
  // Las 4 nuevas imágenes que has enviado
  {
    id: "example9",
    url: "/lovable-uploads/fecfd663-f992-4ed7-94d2-9e13e26eb0e3.png",
    prompt: "Dragón azul brillante posado sobre una montaña nevada, con amplias alas desplegadas contra un cielo celeste"
  },
  {
    id: "example10",
    url: "/lovable-uploads/5397d569-8d3a-4c33-bc04-ba917f7dc3a1.png",
    prompt: "Elefante africano caminando en la sabana al atardecer, con cielo anaranjado y siluetas de árboles de acacia"
  },
  {
    id: "example11",
    url: "/lovable-uploads/a2fe8353-b15a-4164-995a-de27a770bf92.png",
    prompt: "Calle lluviosa de Tokio por la noche, con personas caminando con paraguas y luces de neón reflejadas en el pavimento mojado"
  },
  {
    id: "example12",
    url: "/lovable-uploads/7170fe0d-9fa1-475e-ae85-387d309f32e9.png",
    prompt: "Escena futurista con nave espacial y astronauta observando dos lunas sobre un planeta distante"
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
        <HeroSection />
        
        {/* Barra para escribir prompts */}
        <PromptInput onGenerate={handleGenerate} isGenerating={isGenerating} />
        
        {/* Sección de la última imagen generada */}
        <LastGeneratedImage image={lastGeneratedImage} onSave={handleSaveImage} />
        
        {/* Ver mis creaciones */}
        <CreationsCallToAction count={generatedImages.length} />
        
        {/* Sección de ejemplos */}
        <ExamplesSection exampleImages={exampleImages} />
        
        <InfoSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
