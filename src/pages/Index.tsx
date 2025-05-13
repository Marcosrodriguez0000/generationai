
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/auth";
import { toast } from "sonner";
import Header from "@/components/Header";
import ImageGallery from "@/components/ImageGallery";
import CosmosBackground from "@/components/CosmosBackground";
import PromptInput from "@/components/PromptInput";
import { generateImage } from "@/services/imageService";
import { saveUserImage } from "@/services/userImageService";

interface GeneratorProps {
  generatedImages: any[];
  setGeneratedImages: React.Dispatch<React.SetStateAction<any[]>>;
}

const Index = ({ generatedImages, setGeneratedImages }: GeneratorProps) => {
  const [imageUrl, setImageUrl] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const { session } = useAuth();

  const handleGenerate = async (prompt: string) => {
    if (!prompt.trim()) {
      toast('Error', {
        description: 'Ingresa una descripción para generar una imagen'
      });
      return;
    }

    setIsGenerating(true);
    try {
      const generatedImageUrl = await generateImage(prompt);
      setImageUrl(generatedImageUrl);
      
      // Update recent generations
      const newImage = {
        id: Date.now().toString(), // temporary ID
        url: generatedImageUrl,
        prompt: prompt
      };
      
      setGeneratedImages((prev) => [newImage, ...prev].slice(0, 9));
    } catch (error) {
      console.error("Error generating image:", error);
      toast('Error', {
        description: 'No se pudo generar la imagen. Inténtalo nuevamente.'
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSave = async (prompt: string) => {
    if (!imageUrl) {
      toast('Error', {
        description: 'Genera una imagen primero'
      });
      return;
    }

    if (!session) {
      toast('Error', {
        description: 'Debes iniciar sesión para guardar imágenes'
      });
      return;
    }

    try {
      await saveUserImage(prompt, imageUrl);
    } catch (error) {
      console.error("Error saving image:", error);
      toast('Error', {
        description: 'No se pudo guardar la imagen. Inténtalo nuevamente.'
      });
    }
  };

  // Example images to display when no images are generated yet
  const exampleImages = [
    {
      id: "example-1",
      url: "https://images.unsplash.com/photo-1518770660439-4636190af475",
      prompt: "Inteligencia artificial futurista en un ambiente de alta tecnología"
    },
    {
      id: "example-2",
      url: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7",
      prompt: "Código colorido de software en una pantalla"
    },
    {
      id: "example-3",
      url: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5",
      prompt: "Matriz de datos abstracta en estilo futurista"
    }
  ];

  return (
    <div className="flex flex-col min-h-screen relative">
      <CosmosBackground />
      <div className="relative z-10">
        <Header />

        <main className="container max-w-5xl mx-auto py-8 px-4 flex flex-col gap-8">
          <div className="text-center space-y-4">
            <h1 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gold-400 via-gold-200 to-gold-400">
              LuxuryAI
            </h1>
            <p className="text-lg md:text-xl text-gold-100 max-w-2xl mx-auto">
              Genera imágenes únicas con inteligencia artificial
            </p>
          </div>

          <div className="bg-black/20 backdrop-blur-lg rounded-2xl p-6 border border-gold-500/20">
            <PromptInput onGenerate={handleGenerate} isGenerating={isGenerating} />
            
            {imageUrl && (
              <div className="mt-6">
                <div className="aspect-square relative rounded-lg overflow-hidden bg-black/30 border border-gold-500/20">
                  <img
                    src={imageUrl}
                    alt="Generated"
                    className="w-full h-full object-contain"
                  />
                </div>
                
                {session && (
                  <div className="flex justify-end mt-4">
                    <Button 
                      onClick={() => handleSave(imageUrl)}
                      variant="outline" 
                      className="border-gold-500/30 text-gold-100 hover:bg-gold-500/10"
                    >
                      Guardar en Mi Colección
                    </Button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Example or Generated Images */}
          <ImageGallery 
            images={generatedImages.length > 0 ? generatedImages : exampleImages} 
            showTitle={true}
          />
        </main>
      </div>
    </div>
  );
};

export default Index;
