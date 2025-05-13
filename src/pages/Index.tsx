
import React, { useState } from 'react';
import { toast } from "sonner";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import PromptInput from "@/components/PromptInput";
import GenerationSettings from "@/components/GenerationSettings";
import CosmosBackground from "@/components/CosmosBackground";
import { Images } from "lucide-react";
import { generateImage, GenerationSettings as Settings } from "@/services/imageService";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface ImageItem {
  id: string;
  url: string;
  prompt: string;
}

// Ejemplos de imágenes IA con sus prompts
const exampleImages: ImageItem[] = [
  {
    id: "example1",
    url: "https://images.unsplash.com/photo-1582562124811-c09040d0a901",
    prompt: "Un gato majestuoso de color naranja y blanco recostado en una alfombra de lujo con iluminación cálida y ambiente dorado, estilo realista"
  },
  {
    id: "example2",
    url: "https://images.unsplash.com/photo-1486718448742-163732cd1544",
    prompt: "Patrón minimalista de líneas doradas y marrones onduladas sobre fondo negro, estilo abstracto elegante"
  },
  {
    id: "example3",
    url: "https://images.unsplash.com/photo-1482881497185-d4a9ddbe4151",
    prompt: "Paisaje de dunas de arena al atardecer con tonos dorados y marrones, sombras dramáticas y textura fina, estilo cinematográfico"
  },
  {
    id: "example4",
    url: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9",
    prompt: "Bodegón con frutas exóticas sobre una mesa de madera oscura, iluminación de estudio con ambiente cálido, tonos dorados y marrones, estilo fotográfico de alta definición"
  }
];

interface IndexProps {
  generatedImages: ImageItem[];
  setGeneratedImages: React.Dispatch<React.SetStateAction<ImageItem[]>>;
}

const Index = ({ generatedImages, setGeneratedImages }: IndexProps) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [settings, setSettings] = useState<Settings>({
    resolution: "512x512",
    quality: 7
  });

  const handleGenerate = async (prompt: string) => {
    setIsGenerating(true);

    try {
      toast("Generando imagen...", {
        description: "Esto puede tomar unos segundos.",
      });

      const imageUrl = await generateImage(prompt, settings);
      
      // Create new image object
      const newImage: ImageItem = {
        id: Date.now().toString(),
        url: imageUrl,
        prompt
      };

      // Add the new image to the beginning of the array
      setGeneratedImages(prev => [newImage, ...prev]);

      toast("¡Imagen generada exitosamente!", {
        description: "Tu imagen ha sido creada.",
      });
    } catch (error) {
      console.error("Error generating image:", error);
      toast("Error al generar la imagen", {
        description: "Ha ocurrido un error. Por favor intenta nuevamente.",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSettingsChange = (newSettings: Settings) => {
    setSettings(newSettings);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <CosmosBackground />
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="text-center mb-10 max-w-2xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gold-400 to-brown-600 mb-4">
            Luxury AI
          </h1>
          <p className="text-lg text-brown-800 dark:text-brown-300 mb-6">
            Describe lo que imaginas y deja que la IA lo convierta en realidad
          </p>
        </div>

        <PromptInput onGenerate={handleGenerate} isGenerating={isGenerating} />
        <GenerationSettings settings={settings} onSettingsChange={handleSettingsChange} />

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
        
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-center text-brown-800 dark:text-gold-300 mb-4">
            Ejemplos de Imágenes
          </h2>
          <p className="text-brown-600 dark:text-brown-400 mb-8 max-w-2xl mx-auto text-center">
            Inspírate con estos ejemplos creados con nuestra IA. Prueba usar estos prompts o crea tus propios diseños únicos.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-12">
            {exampleImages.map((example) => (
              <Card key={example.id} className="overflow-hidden border-gold-200 dark:border-gold-900 bg-white/50 dark:bg-black/50 backdrop-blur-sm hover:shadow-md transition-all duration-300">
                <div className="aspect-square overflow-hidden">
                  <img 
                    src={example.url} 
                    alt={example.prompt} 
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>
                <CardHeader className="py-3">
                  <CardTitle className="text-lg text-gold-700 dark:text-gold-400">Ejemplo de Prompt</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-brown-800 dark:text-brown-300">
                    {example.prompt}
                  </CardDescription>
                  <button 
                    onClick={() => handleGenerate(example.prompt)}
                    className="mt-4 px-4 py-2 bg-gradient-to-r from-gold-400 to-brown-600 text-white rounded-md hover:opacity-90 transition-opacity w-full"
                  >
                    Usar este prompt
                  </button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
      <footer className="py-6 text-center text-sm text-brown-500">
        <p>© 2025 Luxury AI</p>
      </footer>
    </div>
  );
};

export default Index;
