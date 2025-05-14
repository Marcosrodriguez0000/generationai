
import React from 'react';
import { Link } from "react-router-dom";
import { Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
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

  return (
    <div className="my-12 max-w-md mx-auto">
      <h2 className="text-xl font-semibold text-center text-gold-300 mb-4">
        Tu creación más reciente
      </h2>
      <Card className="overflow-hidden border-gold-200/20 bg-black/50 backdrop-blur-sm">
        <AspectRatio ratio={1/1}>
          <img 
            src={image.url} 
            alt={image.prompt} 
            className="w-full h-full object-cover"
          />
        </AspectRatio>
        <CardHeader className="py-3">
          <CardTitle className="text-lg text-gold-400">Última creación</CardTitle>
        </CardHeader>
        <CardContent className="pb-4">
          <CardDescription className="text-gold-100/80 mb-4">
            {image.prompt}
          </CardDescription>
          <div className="flex gap-3 justify-center">
            {user && (
              <Button 
                onClick={onSave}
                className="bg-gradient-to-r from-gold-400 to-brown-600 text-white hover:opacity-90"
              >
                <Save className="h-4 w-4 mr-2" />
                Guardar en mi colección
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LastGeneratedImage;
