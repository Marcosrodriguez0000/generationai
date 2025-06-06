
import React from 'react';
import { toast } from "sonner";
import Header from "@/components/Header";
import CosmosBackground from "@/components/CosmosBackground";
import { generateImage } from "@/services/imageService";
import { saveUserImage } from "@/services/userImageService";
import { useAuth } from '@/lib/auth';
import LastGeneratedImage from '@/components/LastGeneratedImage';
import CreationsCallToAction from '@/components/CreationsCallToAction';
import Footer from '@/components/Footer';
import { ImageItem } from '@/types/image';
import ExamplesSection from '@/components/ExamplesSection';
import HeroHeader from '@/components/HeroHeader';
import PromptGenerator from '@/components/PromptGenerator';

// Ejemplos de imágenes IA con sus prompts y badges
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
    url: "/lovable-uploads/67c20ac8-f57f-4415-9e95-ab013380ea69.png",
    prompt: "Casa moderna de diseño minimalista con fachada de cristal curvada"
  },
  {
    id: "example5",
    url: "/lovable-uploads/734f2359-a7ce-4a38-87a5-b1da0be658dd.png",
    prompt: "Pareja bailando bajo un cielo estrellado con la Vía Láctea visible"
  },
  {
    id: "example6",
    url: "/lovable-uploads/d39c38e0-84e5-4d33-808f-89c51a0a571b.png",
    prompt: "Frasco de perfume de lujo con etiqueta azul y dorada"
  },
  {
    id: "example7",
    url: "/lovable-uploads/320d93c4-bd61-47d1-895b-3aae110db3f2.png",
    prompt: "Retrato hiperrealista de un hombre mayor con expresión pensativa"
  },
  {
    id: "example8",
    url: "/lovable-uploads/81ebe13b-f3e0-4241-ad7f-a8171be4d604.png",
    prompt: "Reloj de lujo con esfera negra y detalles dorados"
  },
  {
    id: "example9",
    url: "/lovable-uploads/960f4a5e-5cbc-4422-b617-a6e3243cf080.png",
    prompt: "Taza de café con leche con espuma cremosa y caramelo"
  },
  {
    id: "example10",
    url: "/lovable-uploads/933918f5-51fe-44d5-a927-ff1f83961b9c.png",
    prompt: "Paisaje de montañas con lago cristalino reflejo al atardecer"
  },
  {
    id: "example11",
    url: "/lovable-uploads/5397d569-8d3a-4c33-bc04-ba917f7dc3a1.png",
    prompt: "Anillo de compromiso con diamante brillante sobre terciopelo negro"
  },
  {
    id: "example12",
    url: "/lovable-uploads/7170fe0d-9fa1-475e-ae85-387d309f32e9.png",
    prompt: "Automóvil deportivo rojo brillante en carretera costera curva"
  },
  {
    id: "example13",
    url: "/lovable-uploads/a2fe8353-b15a-4164-995a-de27a770bf92.png",
    prompt: "Calle lluviosa de Tokio por la noche, con luces de neón reflejadas en el pavimento mojado"
  }
];

interface HomeProps {
  generatedImages: ImageItem[];
  setGeneratedImages: React.Dispatch<React.SetStateAction<ImageItem[]>>;
}

const Home = ({ generatedImages, setGeneratedImages }: HomeProps) => {
  const [isGenerating, setIsGenerating] = React.useState(false);
  const [lastGeneratedImage, setLastGeneratedImage] = React.useState<ImageItem | null>(null);
  const { user } = useAuth();

  const handleGenerate = async (prompt: string) => {
    if (!prompt.trim() || isGenerating) return;
    
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
        <div className="max-w-3xl mx-auto mb-12 mt-8">
          <HeroHeader />
          
          {/* Barra para escribir prompts con estilo moderno */}
          <PromptGenerator 
            onGenerate={handleGenerate} 
            isGenerating={isGenerating} 
            lastGeneratedImage={lastGeneratedImage}
          />
          
          {/* Ya no necesitamos mostrar la última imagen generada aquí pues se muestra debajo del PromptGenerator */}
          {/* <LastGeneratedImage image={lastGeneratedImage} onSave={handleSaveImage} /> */}
          
          {/* Ver mis creaciones */}
          <CreationsCallToAction count={generatedImages.length} />
        </div>
        
        {/* Sección de ejemplos */}
        <ExamplesSection exampleImages={exampleImages} />
      </main>
      <Footer />
    </div>
  );
};

export default Home;
