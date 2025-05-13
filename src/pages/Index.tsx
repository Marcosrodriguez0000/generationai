
import React, { useState } from 'react';
import { toast } from "sonner";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import PromptInput from "@/components/PromptInput";
import CosmosBackground from "@/components/CosmosBackground";
import { Images } from "lucide-react";
import { generateImage } from "@/services/imageService";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AspectRatio } from "@/components/ui/aspect-ratio";

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
  }
];

interface IndexProps {
  generatedImages: ImageItem[];
  setGeneratedImages: React.Dispatch<React.SetStateAction<ImageItem[]>>;
}

const Index = ({ generatedImages, setGeneratedImages }: IndexProps) => {
  const [isGenerating, setIsGenerating] = useState(false);

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

  return (
    <div className="min-h-screen flex flex-col bg-black">
      <CosmosBackground />
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="text-center mb-10 max-w-2xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gold-400 to-brown-600 mb-4">
            Luxury AI
          </h1>
          <p className="text-lg text-gold-300 mb-6">
            Describe lo que imaginas y deja que la IA lo convierta en realidad
          </p>
        </div>

        <PromptInput onGenerate={handleGenerate} isGenerating={isGenerating} />

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
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-12">
            {exampleImages.map((example) => (
              <Card key={example.id} className="overflow-hidden border-gold-200/20 dark:border-gold-900/20 bg-black/50 backdrop-blur-sm hover:shadow-gold-500/10 hover:shadow-lg transition-all duration-300">
                <div className="overflow-hidden">
                  <AspectRatio ratio={1/1}>
                    <img 
                      src={example.url} 
                      alt={example.prompt} 
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                    />
                  </AspectRatio>
                </div>
                <CardHeader className="py-3">
                  <CardTitle className="text-lg text-gold-400">Ejemplo de Prompt</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gold-100/80">
                    {example.prompt}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="max-w-3xl mx-auto mt-16 p-8 bg-black/40 backdrop-blur-md rounded-xl border border-gold-500/10">
            <h3 className="text-2xl font-bold text-gold-400 mb-4">Crea tu cuenta para guardar tus creaciones</h3>
            <p className="text-gold-100/80 mb-6">
              Regístrate para guardar todas tus imágenes generadas y acceder a ellas en cualquier momento desde cualquier dispositivo.
            </p>
            <div className="flex justify-center">
              <Button className="bg-gradient-to-r from-gold-400 to-brown-600 text-white py-6 px-8 hover:opacity-90 rounded-xl">
                Crear Cuenta
              </Button>
            </div>
          </div>
        </div>
      </main>
      <footer className="py-6 text-center text-sm text-gold-500/50">
        <p>© 2025 Luxury AI</p>
      </footer>
    </div>
  );
};

export default Index;
