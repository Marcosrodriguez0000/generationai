
import React, { useState, useEffect } from 'react';
import { toast } from "sonner";
import Header from "@/components/Header";
import PromptInput from "@/components/PromptInput";
import ImageGallery from "@/components/ImageGallery";
import GenerationSettings from "@/components/GenerationSettings";
import CosmosBackground from "@/components/CosmosBackground";
import ApiKeyInput from "@/components/ApiKeyInput";
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
  const [apiKey, setApiKey] = useState<string>(() => {
    // Try to get API key from localStorage
    const savedKey = localStorage.getItem('huggingFaceApiKey');
    return savedKey || '';
  });

  // Save API key to localStorage whenever it changes
  useEffect(() => {
    if (apiKey) {
      localStorage.setItem('huggingFaceApiKey', apiKey);
    }
  }, [apiKey]);

  const handleGenerate = async (prompt: string) => {
    setIsGenerating(true);

    try {
      toast("Generando imagen...", {
        description: "Esto puede tomar unos segundos.",
      });

      if (!apiKey) {
        toast("API Key no configurada", {
          description: "Por favor, configura tu API Key de Hugging Face primero.",
        });
        setIsGenerating(false);
        return;
      }

      const imageUrl = await generateImage(prompt, settings, apiKey);
      
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
        description: "Ha ocurrido un error. Por favor intenta nuevamente o verifica tu API key.",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSettingsChange = (newSettings: Settings) => {
    setSettings(newSettings);
  };

  const handleApiKeyChange = (newApiKey: string) => {
    setApiKey(newApiKey);
    toast("API Key configurada", {
      description: "Tu API Key de Hugging Face ha sido guardada.",
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <CosmosBackground />
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="text-center mb-10 max-w-2xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent cosmos-gradient mb-4 animate-float">
            CosmosAI Image Generator
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-4">
            Describe lo que imaginas y deja que la IA lo convierta en realidad
          </p>
          <div className="flex justify-center">
            <ApiKeyInput apiKey={apiKey} onApiKeyChange={handleApiKeyChange} />
          </div>
        </div>

        <PromptInput onGenerate={handleGenerate} isGenerating={isGenerating} />
        <GenerationSettings settings={settings} onSettingsChange={handleSettingsChange} />
        <ImageGallery images={generatedImages} />

        {generatedImages.length === 0 && !isGenerating && (
          <div className="text-center mt-20 glass-panel p-10 mx-auto max-w-md">
            <h3 className="text-xl font-medium mb-2">Crea tu primera imagen</h3>
            <p className="text-muted-foreground">
              Escribe un prompt detallado y presiona generar para crear tu primera imagen con IA.
            </p>
          </div>
        )}
      </main>
      <footer className="py-6 text-center text-sm text-gray-500">
        <p>© 2025 CosmosAI Image Generator</p>
      </footer>
    </div>
  );
};

export default Index;
