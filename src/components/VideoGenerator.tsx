
import React, { useState } from 'react';
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import VideoPromptInput from './VideoPromptInput';
import { generateVideoWithPollinations } from '@/services/videoGenerationService';
import { Save, AlertCircle, RefreshCw } from "lucide-react";
import { VideoItem } from '@/types/image';

interface VideoGenerationSettings {
  resolution: string;
  fps: number;
  duration: number;
  stylizeStrength?: number;
}

const VideoGenerator = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedVideo, setGeneratedVideo] = useState<VideoItem | null>(null);
  const [videoError, setVideoError] = useState(false);
  const [videoKey, setVideoKey] = useState(Date.now());
  const [retryCount, setRetryCount] = useState(0);
  const [isVideoLoading, setIsVideoLoading] = useState(false);
  
  const handleGenerate = async (prompt: string, settings: VideoGenerationSettings) => {
    if (isGenerating) return;
    
    setIsGenerating(true);
    setVideoError(false);
    setIsVideoLoading(true);
    
    try {
      toast("Generando video...", {
        description: "Esto puede tomar hasta un minuto, por favor espera.",
      });

      // Generate video using Pollinations service
      const videoUrl = await generateVideoWithPollinations(prompt, settings);
      
      // Create new video item
      const newVideo: VideoItem = {
        id: Date.now().toString(),
        url: videoUrl,
        prompt,
        badge: "NUEVO"
      };

      // Set the generated video
      setGeneratedVideo(newVideo);
      setVideoKey(Date.now());

      toast.success("¡Video generado exitosamente!", {
        description: "Tu video está listo para visualizarse.",
      });
      
    } catch (error) {
      console.error("Error generating video:", error);
      toast.error("Error al generar el video", {
        description: "Ha ocurrido un error al intentar generar el video.",
      });
      setVideoError(true);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleVideoLoaded = () => {
    console.log("Video loaded successfully");
    setIsVideoLoading(false);
    if (retryCount > 0) {
      toast.success("¡Video cargado exitosamente!");
    }
  };

  const handleVideoError = () => {
    console.error("Error loading video");
    setVideoError(true);
    setIsVideoLoading(false);
    
    if (retryCount < 2) {
      toast.info("Reintentando cargar el video...");
      setTimeout(() => {
        setRetryCount(prev => prev + 1);
        setVideoKey(Date.now());
        setVideoError(false);
        setIsVideoLoading(true);
      }, 1500);
    } else {
      toast.error("Error al cargar el video", {
        description: "No se pudo cargar el video después de varios intentos."
      });
    }
  };

  const handleRetry = () => {
    setRetryCount(0);
    setVideoKey(Date.now());
    setVideoError(false);
    setIsVideoLoading(true);
    toast.info("Intentando cargar el video nuevamente...");
  };

  const handleSaveVideo = () => {
    if (!generatedVideo) return;
    
    toast.success("Video guardado", {
      description: "El video se ha guardado en tu colección",
    });
  };

  const isDirectVideo = generatedVideo?.url?.endsWith('.mp4') || 
                       generatedVideo?.url?.includes('replicate.delivery') || 
                       generatedVideo?.url?.includes('storage.googleapis.com') ||
                       generatedVideo?.url?.includes('cdn.videvo.net') ||
                       generatedVideo?.url?.includes('api.stability.ai') ||
                       generatedVideo?.url?.startsWith('/videos/');

  return (
    <div className="max-w-3xl mx-auto mb-12 mt-8">
      <div className="text-center">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-neon-pink to-neon-blue mb-6">
          Generador de Videos IA
        </h1>
        <p className="text-gray-300 text-lg mb-8">
          Describe el video que quieres crear y Pollinations IA lo generará para ti
        </p>
      </div>
      
      <div className="relative mb-12 glass-card p-6 rounded-xl backdrop-blur-lg bg-black/20 border border-white/5">
        <VideoPromptInput 
          onGenerate={handleGenerate} 
          isGenerating={isGenerating} 
        />
      </div>
      
      {generatedVideo && (
        <div className="my-12 max-w-xl mx-auto">
          <h2 className="text-xl font-semibold text-center text-white mb-4">
            Tu video generado
          </h2>
          <div className="overflow-hidden rounded-lg border border-white/10 bg-[#13131e] relative">
            {generatedVideo.badge && (
              <div className="absolute top-4 right-4 z-20">
                <span className="px-2 py-1 text-xs font-semibold rounded-md bg-green-500 text-white">
                  {generatedVideo.badge}
                </span>
              </div>
            )}
            
            <AspectRatio ratio={1/1} className="bg-[#0c0c14] relative">
              {isVideoLoading && (
                <div className="absolute inset-0 flex items-center justify-center z-10">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
                </div>
              )}
              
              {videoError ? (
                <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                  <AlertCircle className="h-10 w-10 text-red-500 mb-2" />
                  <p className="text-white mb-2">Error al cargar el video</p>
                  <p className="text-sm text-gray-400 mb-4">El archivo de video no pudo cargarse correctamente</p>
                  <div className="flex gap-3">
                    <Button 
                      variant="outline"
                      className="bg-white/10 hover:bg-white/20 text-white flex items-center gap-2"
                      onClick={handleRetry}
                    >
                      <RefreshCw className="h-4 w-4" />
                      Reintentar
                    </Button>
                    <Button 
                      variant="outline"
                      className="bg-white/10 hover:bg-white/20 text-white"
                      onClick={() => window.open(generatedVideo.url, '_blank')}
                    >
                      Abrir en nueva ventana
                    </Button>
                  </div>
                </div>
              ) : isDirectVideo ? (
                <video 
                  key={videoKey}
                  src={`${generatedVideo.url}?t=${videoKey}`}
                  controls
                  autoPlay
                  loop
                  className="w-full h-full object-contain"
                  onError={handleVideoError}
                  onLoadedData={handleVideoLoaded}
                  preload="auto"
                  crossOrigin="anonymous"
                >
                  Tu navegador no soporta el elemento de video.
                </video>
              ) : (
                <iframe 
                  src={generatedVideo.url} 
                  title={generatedVideo.prompt}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  onLoad={handleVideoLoaded}
                  onError={handleVideoError}
                />
              )}
              
              {/* Overlay con mensaje mientras carga */}
              {isVideoLoading && !videoError && (
                <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center z-0">
                  <p className="text-white mb-2">Cargando video...</p>
                  <p className="text-sm text-gray-400">Por favor espera unos momentos</p>
                </div>
              )}
            </AspectRatio>
            <div className="p-4">
              <h3 className="text-white font-medium mb-2">Prompt utilizado</h3>
              <p className="text-gray-300 text-sm mb-4">
                {generatedVideo.prompt}
              </p>
              <div className="flex gap-3 justify-between">
                <Button
                  onClick={() => window.open(generatedVideo.url, '_blank')}
                  variant="outline" 
                  className="flex-1 bg-white/5 border-white/10 text-white hover:bg-white/10"
                >
                  Ver original
                </Button>
                
                <Button 
                  onClick={handleSaveVideo}
                  className="flex-1 bg-gradient-to-r from-neon-pink to-neon-blue text-white hover:opacity-90"
                >
                  <Save className="h-4 w-4 mr-2" />
                  Guardar
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoGenerator;
