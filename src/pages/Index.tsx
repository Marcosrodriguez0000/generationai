
import React, { useState } from 'react';
import { toast } from "sonner";
import Header from "@/components/Header";
import PromptInput from "@/components/PromptInput";
import ImageGallery from "@/components/ImageGallery";
import GenerationSettings from "@/components/GenerationSettings";
import CosmosBackground from "@/components/CosmosBackground";
import { generateImage, GenerationSettings as Settings } from "@/services/imageService";

interface ImageItem {
  id: string;
  url: string;
  prompt: string;
}

const Index = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImages, setGeneratedImages] = useState<ImageItem[]>([]);
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
          <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-fuchsia-600 to-pink-600 mb-4">
            Generation AI
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
            Describe lo que imaginas y deja que la IA lo convierta en realidad
          </p>
        </div>

        <PromptInput onGenerate={handleGenerate} isGenerating={isGenerating} />
        <GenerationSettings settings={settings} onSettingsChange={handleSettingsChange} />
        <ImageGallery images={generatedImages} />

        {generatedImages.length === 0 && !isGenerating && (
          <div className="text-center mt-20 bg-white/50 dark:bg-zinc-800/50 backdrop-blur-lg p-10 mx-auto max-w-md rounded-xl border border-gray-200 dark:border-zinc-700">
            <h3 className="text-xl font-medium mb-2">Crea tu primera imagen</h3>
            <p className="text-muted-foreground">
              Escribe un prompt detallado y presiona generar para crear tu primera imagen con IA.
            </p>
          </div>
        )}
      </main>
      <footer className="py-6 text-center text-sm text-gray-500">
        <p>© 2025 Generation AI</p>
      </footer>
    </div>
  );
};

export default Index;
