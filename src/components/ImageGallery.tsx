
import React from 'react';
import { Download, Trash2 } from 'lucide-react';
import { Button } from './ui/button';
import { AspectRatio } from './ui/aspect-ratio';
import { deleteUserImage } from '@/services/userImageService';
import { toast } from 'sonner';
import { useIsMobile } from '@/hooks/use-mobile';
import { Badge } from './ui/badge';

interface ImageItem {
  id: string;
  url: string;
  prompt: string;
  badge?: string;
}

interface ImageGalleryProps {
  images: ImageItem[];
  showTitle?: boolean;
  onDelete?: (id: string) => void;
  columns?: number;
  galleryType?: 'examples' | 'user';
}

const ImageGallery = ({ 
  images, 
  showTitle = false, 
  onDelete,
  columns = 3,
  galleryType = 'user'
}: ImageGalleryProps) => {
  const isMobile = useIsMobile();
  
  if (images.length === 0) return null;

  const handleDownload = (url: string, index: number) => {
    const a = document.createElement('a');
    a.href = url;
    a.download = `generation-ai-image-${index}.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteUserImage(id);
      if (onDelete) onDelete(id);
    } catch (error) {
      console.error('Error deleting image:', error);
      toast('Error', {
        description: 'No se pudo eliminar la imagen'
      });
    }
  };

  // Determine grid columns based on screen size and props
  const getGridColumns = () => {
    if (galleryType === 'examples') {
      if (isMobile) return 'grid-cols-2';
      if (columns === 6) return 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6';
      return 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6';
    } else {
      if (isMobile) return 'grid-cols-2';
      if (columns === 4) return 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4';
      return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3';
    }
  };

  return (
    <div className="mt-12">
      {showTitle && (
        <h2 className="text-2xl font-bold mb-6 text-gold-300">Imágenes Generadas</h2>
      )}
      <div className={`grid ${getGridColumns()} gap-3 sm:gap-4`}>
        {images.map((image, index) => (
          <div 
            key={image.id} 
            className="overflow-hidden group relative transition-all duration-300 hover:-translate-y-1 border-gold-200/20 dark:border-gold-900/20 bg-black/50 backdrop-blur-sm rounded-lg"
          >
            {image.badge && galleryType === 'examples' && (
              <div className="absolute top-2 left-2 z-10">
                <Badge 
                  variant="default" 
                  className={`text-[10px] ${
                    image.badge === 'NEW' 
                      ? 'bg-neon-blue text-white' 
                      : 'bg-neon-pink text-white'
                  }`}
                >
                  {image.badge}
                </Badge>
              </div>
            )}
            <AspectRatio ratio={1/1}>
              <img 
                src={image.url} 
                alt={galleryType === 'examples' ? "Example image" : image.prompt} 
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </AspectRatio>
            
            {/* For user gallery images, show hover details with buttons */}
            {galleryType === 'user' && (
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-2">
                <p className="text-gold-100 text-xs line-clamp-2 mb-1">{image.prompt}</p>
                
                <div className="flex gap-2 justify-between">
                  <Button 
                    size="sm"
                    variant="outline"
                    className="flex-1 bg-gold-500/10 backdrop-blur-sm border-gold-400/20 text-gold-100 hover:bg-gold-500/20 text-xs sm:text-sm"
                    onClick={() => handleDownload(image.url, index)}
                  >
                    <Download className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                    <span className="sm:inline hidden">Descargar</span>
                    <span className="sm:hidden inline">↓</span>
                  </Button>
                  {onDelete && (
                    <Button 
                      size="sm"
                      variant="destructive"
                      className="bg-red-500/40 hover:bg-red-500/60 backdrop-blur-sm"
                      onClick={() => handleDelete(image.id)}
                    >
                      <Trash2 className="h-3 w-3 sm:h-4 sm:w-4" />
                    </Button>
                  )}
                </div>
              </div>
            )}
            
            {/* Display prompt below examples images */}
            {galleryType === 'examples' && (
              <div className="p-2 bg-black/60">
                <p className="text-gold-100 text-xs line-clamp-2">{image.prompt}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageGallery;
