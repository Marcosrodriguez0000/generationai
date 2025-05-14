
import React from 'react';
import { Link } from "react-router-dom";
import { Save, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { useAuth } from '@/lib/auth';
import { ImageItem } from '@/types/image';

interface LastGeneratedImageProps {
  image: ImageItem | null;
  onSave: () => void;
}

const LastGeneratedImage = ({ image, onSave }: LastGeneratedImageProps) => {
  const { user } = useAuth();

  if (!image) return null;

  const handleDownload = () => {
    const a = document.createElement('a');
    a.href = image.url;
    a.download = `generation-ai-${Date.now()}.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="my-12 max-w-xl mx-auto">
      <h2 className="text-xl font-semibold text-center text-white mb-4">
        Tu creación más reciente
      </h2>
      <div className="overflow-hidden rounded-lg border border-white/10 bg-[#13131e]">
        <AspectRatio ratio={1/1} className="bg-[#0c0c14]">
          <img 
            src={image.url} 
            alt={image.prompt} 
            className="w-full h-full object-cover"
          />
        </AspectRatio>
        <div className="p-4">
          <h3 className="text-white font-medium mb-2">Prompt utilizado</h3>
          <p className="text-gray-300 text-sm mb-4">
            {image.prompt}
          </p>
          <div className="flex gap-3 justify-between">
            <Button
              onClick={handleDownload}
              variant="outline" 
              className="flex-1 bg-white/5 border-white/10 text-white hover:bg-white/10"
            >
              <Download className="h-4 w-4 mr-2" />
              Descargar
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

export default LastGeneratedImage;
