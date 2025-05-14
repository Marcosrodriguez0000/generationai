
import React from 'react';
import { Save, Download } from "lucide-react";
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

  if (!video) return null;

  const handleDownload = () => {
    // Open the video in a new tab so the user can download it
    window.open(video.url, '_blank');
  };

  return (
    <div className="my-12 max-w-xl mx-auto">
      <h2 className="text-xl font-semibold text-center text-white mb-4">
        Tu video más reciente
      </h2>
      <div className="overflow-hidden rounded-lg border border-white/10 bg-[#13131e]">
        <AspectRatio ratio={1/1} className="bg-[#0c0c14]">
          <iframe 
            src={video.url} 
            title={video.prompt}
            className="w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
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
