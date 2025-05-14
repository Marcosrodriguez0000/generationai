
import React, { useState } from 'react';
import { toast } from "sonner";
import PromptInput from "@/components/PromptInput";
import LastGeneratedImage from "@/components/LastGeneratedImage";
import CreationsCallToAction from "@/components/CreationsCallToAction";
import { generateImage, GenerationSettings } from "@/services/imageService";
import { useAuth } from '@/lib/auth';
import { ImageItem } from '@/types/image';

const TabGeneradorImagenes = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [lastGeneratedImage, setLastGeneratedImage] = useState<ImageItem | null>(null);
  const [generatedImages, setGeneratedImages] = useState<ImageItem[]>([]);
  const { user } = useAuth();

  const handleGenerate = async (prompt: string, settings: GenerationSettings) => {
    if (isGenerating) return;
    
    setIsGenerating(true);
    
    try {
      toast("Generando imagen...", {
        description: "Esto puede tomar unos segundos, por favor espera.",
      });

      const imageUrl = await generateImage(prompt, settings);
      
      if (!imageUrl) {
        throw new Error("No se pudo obtener una URL de imagen válida");
      }
      
      console.log("Imagen generada:", imageUrl);
      
      // Crear nuevo objeto de imagen
      const newImage: ImageItem = {
        id: Date.now().toString(),
        url: imageUrl,
        prompt,
        badge: ""
      };

      // Almacenar la última imagen generada
      setLastGeneratedImage(newImage);
      
      // Agregar la nueva imagen al principio del array
      setGeneratedImages(prev => [newImage, ...prev]);

      toast.success("¡Imagen generada exitosamente!", {
        description: "Tu imagen está lista para visualizarse.",
      });
      
    } catch (error) {
      console.error("Error generating image:", error);
      toast.error("Error al generar la imagen", {
        description: "Ha ocurrido un error inesperado.",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSaveImage = async () => {
    if (!lastGeneratedImage || !user) return;
    
    try {
      // Aquí iría la lógica para guardar la imagen
      // Por ahora solo mostramos una notificación
      toast.success("Imagen guardada", {
        description: "La imagen se ha guardado en tu colección",
      });
    } catch (error) {
      console.error("Error saving image:", error);
      toast.error("Error al guardar", {
        description: "No se pudo guardar la imagen",
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <PromptInput 
          onGenerate={handleGenerate} 
          isGenerating={isGenerating} 
        />
      </div>
      
      <LastGeneratedImage image={lastGeneratedImage} onSave={handleSaveImage} />
      
      <CreationsCallToAction count={generatedImages.length} />
    </div>
  );
};

export default TabGeneradorImagenes;
