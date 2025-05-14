
import React from 'react';
import { Download, Trash2 } from 'lucide-react';
import { Button } from './ui/button';
import { AspectRatio } from './ui/aspect-ratio';
import { deleteUserImage } from '@/services/userImageService';
import { toast } from 'sonner';
import { useIsMobile } from '@/hooks/use-mobile';

interface ImageItem {
  id: string;
  url: string;
  prompt: string;
}

interface ImageGalleryProps {
  images: ImageItem[];
  showTitle?: boolean;
  onDelete?: (id: string) => void;
  columns?: number;
}

const ImageGallery = ({ 
  images, 
  showTitle = false, 
  onDelete,
  columns = 3 
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
    if (isMobile) return 'grid-cols-2';
    if (columns === 4) return 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4';
    return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3';
  };

  return (
    <div className="mt-12">
      {showTitle && (
        <h2 className="text-2xl font-bold mb-6 text-gold-300">Imágenes Generadas</h2>
      )}
      <div className={`grid ${getGridColumns()} gap-4 sm:gap-6`}>
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
                loading="lazy"
              />
            </AspectRatio>
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
              <p className="text-gold-100 text-xs sm:text-sm line-clamp-2 mb-2">{image.prompt}</p>
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
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageGallery;
