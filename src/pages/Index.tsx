
import React, { useState } from 'react';
import { toast } from "sonner";
import { generateImage } from "@/services/imageService";
import { saveUserImage } from "@/services/userImageService";
import { useAuth } from '@/lib/auth';
import { Sparkles } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { ImageItem } from '@/types/image';
import { Toaster } from "@/components/ui/sonner";

interface IndexProps {
  generatedImages: ImageItem[];
  setGeneratedImages: React.Dispatch<React.SetStateAction<ImageItem[]>>;
}

const Index = ({ generatedImages, setGeneratedImages }: IndexProps) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [prompt, setPrompt] = useState('');
  const { user } = useAuth();

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
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

  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <Toaster />
      <div className="w-full max-w-md p-8 rounded-lg bg-black/80 text-center">
        <h1 className="text-3xl font-bold text-white mb-4">Generation.AI</h1>
        <p className="text-white/80 text-sm mb-8">
          Describe lo que imaginas y deja que la inteligencia artificial lo convierta en realidad
        </p>
        
        <form onSubmit={handleGenerate} className="space-y-4">
          <textarea
            className="w-full p-3 text-white bg-black/50 border border-purple-500/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500/50 resize-none"
            placeholder="Quiero..."
            rows={3}
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            disabled={isGenerating}
          />
          
          <Button
            type="submit"
            disabled={!prompt.trim() || isGenerating}
            className="w-full py-2 px-4 bg-black border border-purple-500 text-white rounded-lg hover:bg-purple-500/20 transition-colors"
          >
            {isGenerating ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Generando...
              </span>
            ) : (
              <span className="flex items-center justify-center gap-2">
                <Sparkles className="h-5 w-5" />
                Generar Imagen
              </span>
            )}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Index;
