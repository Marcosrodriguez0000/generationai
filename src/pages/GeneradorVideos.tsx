
import React, { useState } from 'react';
import { toast } from "sonner";
import Header from "@/components/Header";
import VideoPromptInput from "@/components/VideoPromptInput";
import CosmosBackground from "@/components/CosmosBackground";
import { generateVideo, VideoGenerationSettings } from "@/services/videoService";
import { useAuth } from '@/lib/auth';
import LastGeneratedVideo from '@/components/LastGeneratedVideo';
import CreationsCallToAction from '@/components/CreationsCallToAction';
import Footer from '@/components/Footer';
import { VideoItem } from '@/types/image';

// Ejemplos de videos con sus prompts
const exampleVideos: VideoItem[] = [
  {
    id: "video1",
    url: "https://storage.googleapis.com/gen-2-samples/dog.mp4",
    prompt: "Perro corriendo en el parque",
    badge: "NEW"
  },
  {
    id: "video2",
    url: "https://storage.googleapis.com/gen-2-samples/sunset.mp4",
    prompt: "Atardecer sobre montañas",
  },
  {
    id: "video3",
    url: "https://storage.googleapis.com/gen-2-samples/beach.mp4",
    prompt: "Playa con olas",
  }
];

const GeneradorVideos = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [lastGeneratedVideo, setLastGeneratedVideo] = useState<VideoItem | null>(null);
  const [generatedVideos, setGeneratedVideos] = useState<VideoItem[]>([]);
  const { user } = useAuth();

  const handleGenerate = async (prompt: string, settings: VideoGenerationSettings) => {
    if (isGenerating) return;
    
    setIsGenerating(true);

    try {
      toast("Generando video...", {
        description: "Esto puede tomar varios segundos.",
      });

      const videoUrl = await generateVideo(prompt, settings);
      
      // Verificar que tenemos una URL válida
      if (!videoUrl) {
        throw new Error("No se pudo obtener una URL de video válida");
      }
      
      console.log("Video generado:", videoUrl);
      
      // Crear nuevo objeto de video
      const newVideo: VideoItem = {
        id: Date.now().toString(),
        url: videoUrl,
        prompt,
        badge: "NEW"
      };

      // Almacenar el último video generado
      setLastGeneratedVideo(newVideo);
      
      // Agregar el nuevo video al principio del array
      setGeneratedVideos(prev => [newVideo, ...prev]);

      toast.success("¡Video generado exitosamente!", {
        description: "Tu video ha sido creado.",
      });
      
    } catch (error) {
      console.error("Error generating video:", error);
      toast.error("Error al generar el video", {
        description: "Ha ocurrido un error. Por favor intenta nuevamente con otra frase.",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSaveVideo = async () => {
    if (!lastGeneratedVideo || !user) return;
    
    try {
      // Aquí iría la lógica para guardar el video
      // Por ahora solo mostramos una notificación
      toast.success("Video guardado", {
        description: "El video se ha guardado en tu colección",
      });
    } catch (error) {
      console.error("Error saving video:", error);
      toast.error("Error al guardar", {
        description: "No se pudo guardar el video",
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#050510]">
      <CosmosBackground />
      <Header />
      
      <main className="flex-1 container mx-auto px-5 py-10">
        {/* Sección de información o descripción */}
        <div className="max-w-3xl mx-auto mb-12 mt-8">
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-neon-pink to-neon-blue mb-6">
              Generation.AI Videos
            </h1>
            <p className="text-gray-300 text-lg mb-8">
              Describe el video que quieres crear y deja que la inteligencia artificial lo haga realidad
            </p>
          </div>
          
          {/* Barra para escribir prompts con estilo moderno */}
          <div className="relative mb-12 glass-card p-6 rounded-xl backdrop-blur-lg bg-black/20 border border-white/5">
            <VideoPromptInput 
              onGenerate={handleGenerate} 
              isGenerating={isGenerating} 
            />
          </div>
          
          {/* Sección del último video generado */}
          <LastGeneratedVideo video={lastGeneratedVideo} onSave={handleSaveVideo} />
          
          {/* Ver mis creaciones */}
          <CreationsCallToAction count={generatedVideos.length} />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default GeneradorVideos;
