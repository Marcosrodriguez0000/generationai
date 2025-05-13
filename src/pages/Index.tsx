import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { generateImage } from "@/services/imageService";
import { saveUserImage } from "@/services/userImageService";
import { useAuth } from "@/lib/auth";
import { toast } from "sonner";
import Header from "@/components/Header";
import ImageGallery from "@/components/ImageGallery";
import CosmosBackground from "@/components/CosmosBackground";

interface GeneratorProps {
  generatedImages: any[];
  setGeneratedImages: React.Dispatch<React.SetStateAction<any[]>>;
}

const Index = ({ generatedImages, setGeneratedImages }: GeneratorProps) => {
  const [prompt, setPrompt] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const { session } = useAuth();

  const handleGenerate = async () => {
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

  const handleSave = async () => {
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
            <Tabs defaultValue="generator">
              <TabsList className="grid grid-cols-2 mb-6">
                <TabsTrigger value="generator">Generador</TabsTrigger>
                <TabsTrigger value="info">Instrucciones</TabsTrigger>
              </TabsList>
              
              <TabsContent value="generator" className="space-y-6">
                <div>
                  <label className="block text-gold-100 mb-2">Descripción</label>
                  <Textarea
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="Describe la imagen que deseas generar..."
                    className="min-h-[100px] bg-black/40 border-gold-500/30"
                  />
                </div>

                <div className="flex justify-end">
                  <Button 
                    onClick={handleGenerate} 
                    disabled={isGenerating || !prompt.trim()}
                    className="bg-gold-500 hover:bg-gold-600 text-black"
                  >
                    {isGenerating ? "Generando..." : "Generar Imagen"}
                  </Button>
                </div>

                {imageUrl && (
                  <div className="mt-6 space-y-4">
                    <div className="aspect-square relative rounded-lg overflow-hidden bg-black/30 border border-gold-500/20">
                      <img
                        src={imageUrl}
                        alt="Generated"
                        className="w-full h-full object-contain"
                      />
                    </div>

                    {session && (
                      <div className="flex justify-end">
                        <Button 
                          onClick={handleSave}
                          variant="outline" 
                          className="border-gold-500/30 text-gold-100 hover:bg-gold-500/10"
                        >
                          Guardar en Mi Colección
                        </Button>
                      </div>
                    )}
                  </div>
                )}
              </TabsContent>

              <TabsContent value="info">
                <div className="prose prose-invert max-w-none">
                  <h3 className="text-gold-300">Cómo usar el generador</h3>
                  <ol className="list-decimal pl-5 space-y-2">
                    <li>Escribe una descripción detallada de la imagen que deseas crear</li>
                    <li>Haz clic en "Generar Imagen" y espera unos segundos</li>
                    <li>Si te gusta el resultado, puedes guardarla en tu colección</li>
                    <li>Accede a tu colección desde el menú "Mis Creaciones"</li>
                  </ol>
                  
                  <h3 className="text-gold-300 mt-4">Consejos para mejores resultados</h3>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Sé específico en tu descripción</li>
                    <li>Incluye detalles sobre el estilo (ej. fotografía, pintura, 3D)</li>
                    <li>Menciona la iluminación, colores y ambiente</li>
                    <li>Si no te gusta el resultado, intenta con otra descripción</li>
                  </ul>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Recent Generations */}
          {generatedImages.length > 0 && (
            <ImageGallery 
              images={generatedImages} 
              showTitle={true}
            />
          )}
        </main>
      </div>
    </div>
  );
};

export default Index;
