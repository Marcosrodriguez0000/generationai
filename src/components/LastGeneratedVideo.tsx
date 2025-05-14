
import React, { useState } from 'react';
import { Save, Download, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { useAuth } from '@/lib/auth';

interface VideoItem {
  id: string;
  url: string;
  prompt: string;
  badge?: string;
}

interface LastGeneratedVideoProps {
  video: VideoItem | null;
  onSave: () => void;
}

const LastGeneratedVideo = ({ video, onSave }: LastGeneratedVideoProps) => {
  const { user } = useAuth();
  const [videoError, setVideoError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  if (!video) return null;

  const handleDownload = () => {
    // Open the video in a new tab so the user can download it
    window.open(video.url, '_blank');
  };

  // Determine if the URL is a direct MP4 file or an embed URL
  const isDirectVideo = video.url.endsWith('.mp4') || 
                        video.url.includes('replicate.delivery') || 
                        video.url.includes('storage.googleapis.com');

  const handleVideoError = () => {
    console.error("Error loading video:", video.url);
    setVideoError(true);
  };

  const handleVideoLoaded = () => {
    console.log("Video loaded successfully");
    setIsLoading(false);
  };

  return (
    <div className="my-12 max-w-xl mx-auto">
      <h2 className="text-xl font-semibold text-center text-white mb-4">
        Tu video más reciente
      </h2>
      <div className="overflow-hidden rounded-lg border border-white/10 bg-[#13131e]">
        <AspectRatio ratio={1/1} className="bg-[#0c0c14] relative">
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
            </div>
          )}
          
          {videoError ? (
            <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
              <AlertCircle className="h-10 w-10 text-red-500 mb-2" />
              <p className="text-white mb-2">Error al cargar el video</p>
              <p className="text-sm text-gray-400 mb-4">El archivo de video no pudo cargarse correctamente</p>
              <Button 
                variant="outline"
                className="bg-white/10 hover:bg-white/20 text-white"
                onClick={() => {
                  setVideoError(false);
                  setIsLoading(true);
                  // Force reload by adding timestamp
                  const timestamp = new Date().getTime();
                  window.open(`${video.url}?t=${timestamp}`, '_blank');
                }}
              >
                Abrir en nueva ventana
              </Button>
            </div>
          ) : isDirectVideo ? (
            <video 
              src={video.url}
              controls
              autoPlay
              loop
              className="w-full h-full object-contain"
              onError={handleVideoError}
              onLoadedData={handleVideoLoaded}
            />
          ) : (
            <iframe 
              src={video.url} 
              title={video.prompt}
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              onLoad={handleVideoLoaded}
              onError={handleVideoError}
            />
          )}
        </AspectRatio>
        <div className="p-4">
          <h3 className="text-white font-medium mb-2">Prompt utilizado</h3>
          <p className="text-gray-300 text-sm mb-4">
            {video.prompt}
          </p>
          <div className="flex gap-3 justify-between">
            <Button
              onClick={handleDownload}
              variant="outline" 
              className="flex-1 bg-white/5 border-white/10 text-white hover:bg-white/10"
            >
              <Download className="h-4 w-4 mr-2" />
              Ver original
            </Button>
            
            {user && (
              <Button 
                onClick={onSave}
                className="flex-1 bg-gradient-to-r from-neon-pink to-neon-blue text-white hover:opacity-90"
              >
                <Save className="h-4 w-4 mr-2" />
                Guardar
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LastGeneratedVideo;
