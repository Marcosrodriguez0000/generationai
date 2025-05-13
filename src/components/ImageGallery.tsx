
import React from 'react';
import { Download } from 'lucide-react';
import { Button } from './ui/button';
import { AspectRatio } from './ui/aspect-ratio';

interface ImageItem {
  id: string;
  url: string;
  prompt: string;
}

interface ImageGalleryProps {
  images: ImageItem[];
  showTitle?: boolean;
}

const ImageGallery = ({ images, showTitle = false }: ImageGalleryProps) => {
  if (images.length === 0) return null;

  const handleDownload = (url: string, index: number) => {
    const a = document.createElement('a');
    a.href = url;
    a.download = `luxuryai-image-${index}.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="mt-12">
      {showTitle && (
        <h2 className="text-2xl font-bold mb-6 text-gold-300">Imágenes Generadas</h2>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {images.map((image, index) => (
          <div 
            key={image.id} 
            className="overflow-hidden group relative transition-all duration-300 hover:-translate-y-1 border-gold-200/20 dark:border-gold-900/20 bg-black/50 backdrop-blur-sm rounded-xl"
          >
            <AspectRatio ratio={1/1}>
              <img 
                src={image.url} 
                alt={image.prompt} 
                className="w-full h-full object-cover"
              />
            </AspectRatio>
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
              <p className="text-gold-100 text-sm line-clamp-2 mb-2">{image.prompt}</p>
              <Button 
                size="sm"
                variant="outline"
                className="w-full bg-gold-500/10 backdrop-blur-sm border-gold-400/20 text-gold-100 hover:bg-gold-500/20"
                onClick={() => handleDownload(image.url, index)}
              >
                <Download className="h-4 w-4 mr-2" />
                Descargar
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageGallery;
