
import React from 'react';
import ImageGallery from './ImageGallery';
import { ImageItem } from '@/types/image';
import { Button } from './ui/button';
import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface ExamplesSectionProps {
  exampleImages: ImageItem[];
}

const ExamplesSection = ({ exampleImages }: ExamplesSectionProps) => {
  const [showAllImages, setShowAllImages] = useState(false);
  
  // Mostrar solo las primeras 12 imágenes inicialmente, o todas si showAllImages es true
  const displayImages = showAllImages ? exampleImages : exampleImages.slice(0, 12);

  return (
    <div className="mt-16">
      <h2 className="text-xl md:text-2xl font-bold text-center text-white mb-8">
        Galería de ejemplos
      </h2>
      
      <ImageGallery images={displayImages} columns={6} galleryType="examples" />
      
      {exampleImages.length > 12 && (
        <div className="flex justify-center mt-8">
          <Button 
            onClick={() => setShowAllImages(!showAllImages)}
            variant="outline" 
            className="border-white/10 bg-white/5 text-white hover:bg-white/10"
          >
            {showAllImages ? (
              <>
                <ChevronUp className="h-4 w-4 mr-2" />
                Mostrar menos ejemplos
              </>
            ) : (
              <>
                <ChevronDown className="h-4 w-4 mr-2" />
                Ver más ejemplos ({exampleImages.length - 12})
              </>
            )}
          </Button>
        </div>
      )}
    </div>
  );
};

export default ExamplesSection;
