
import React, { useState } from 'react';
import { transformToCartoon, TransformationSettings } from '@/services/imageTransformerService';
import ImageUploader from './ImageUploader';
import { Button } from './ui/button';
import { Slider } from './ui/slider';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { toast } from "sonner";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { ArrowRight, Download, Image as ImageIcon } from 'lucide-react';

const CartoonTransformer = () => {
  const [sourceImage, setSourceImage] = useState<string | null>(null);
  const [transformedImage, setTransformedImage] = useState<string | null>(null);
  const [isTransforming, setIsTransforming] = useState(false);
  const [settings, setSettings] = useState<TransformationSettings>({
    stylizeStrength: 0.7,
    resolution: "512x512"
  });

  const handleImageSelected = (imageUrl: string) => {
    setSourceImage(imageUrl);
    setTransformedImage(null); // Reset transformed image when new source is selected
  };

  const handleTransform = async () => {
    if (!sourceImage) {
      toast.error("Error", { description: "Por favor selecciona una imagen primero." });
      return;
    }

    setIsTransforming(true);
    
    try {
      toast("Transformando imagen...", {
        description: "Esto puede tomar unos segundos.",
      });

      const result = await transformToCartoon(sourceImage, settings);
      setTransformedImage(result);
      
      toast.success("¡Transformación completada!", {
        description: "Tu imagen ha sido convertida a estilo cartoon/anime.",
      });
    } catch (error) {
      console.error("Error transforming image:", error);
      toast.error("Error en la transformación", {
        description: "No se pudo transformar la imagen. Por favor intenta de nuevo.",
      });
    } finally {
      setIsTransforming(false);
    }
  };

  const handleDownload = (imageUrl: string | null) => {
    if (!imageUrl) return;
    
    // Create a temporary link and trigger download
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = 'imagen-transformada.jpg';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-neon-pink to-neon-blue mb-4">
          Transformador de Imágenes
        </h1>
        <p className="text-lg text-gray-300 mb-6">
          Convierte tus fotos a estilo cartoon/anime con un solo clic
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Columna izquierda: Imagen original y uploader */}
        <div className="space-y-6">
          <h2 className="text-xl font-medium text-center text-white mb-4">Imagen Original</h2>
          
          {sourceImage ? (
            <div className="relative overflow-hidden rounded-lg border border-white/10 bg-[#13131e]">
              <AspectRatio ratio={1/1} className="bg-[#0c0c14]">
                <img 
                  src={sourceImage} 
                  alt="Imagen original" 
                  className="w-full h-full object-contain"
                />
              </AspectRatio>
              <div className="p-4 flex justify-between">
                <Button 
                  variant="outline" 
                  className="bg-white/5 border-white/10 text-white hover:bg-white/10"
                  onClick={() => handleDownload(sourceImage)}
                >
                  <Download className="h-4 w-4 mr-2" />
                  Descargar original
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => setSourceImage(null)}
                  className="text-gray-400 hover:text-white"
                >
                  Cambiar imagen
                </Button>
              </div>
            </div>
          ) : (
            <ImageUploader onImageSelected={handleImageSelected} />
          )}

          {/* Configuración de transformación */}
          <div className="glass-card p-6 rounded-xl backdrop-blur-lg bg-black/20 border border-white/5">
            <h3 className="font-medium text-white mb-4">Ajustes de Transformación</h3>
            
            <div className="space-y-6">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label htmlFor="stylizeStrength">Intensidad del Estilo</Label>
                  <span className="text-sm text-muted-foreground">{settings.stylizeStrength.toFixed(1)}</span>
                </div>
                <Slider
                  id="stylizeStrength"
                  min={0.1}
                  max={1.0}
                  step={0.1}
                  value={[settings.stylizeStrength]}
                  onValueChange={(value) => setSettings({...settings, stylizeStrength: value[0]})}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="resolution">Resolución</Label>
                <Select 
                  value={settings.resolution} 
                  onValueChange={(value) => setSettings({...settings, resolution: value})}
                >
                  <SelectTrigger id="resolution">
                    <SelectValue placeholder="Selecciona resolución" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="512x512">512x512</SelectItem>
                    <SelectItem value="768x768">768x768</SelectItem>
                    <SelectItem value="1024x1024">1024x1024</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </div>

        {/* Columna derecha: Imagen transformada y botón de transformación */}
        <div className="space-y-6">
          <h2 className="text-xl font-medium text-center text-white mb-4">Resultado</h2>
          
          {!sourceImage && (
            <div className="h-[512px] bg-[#13131e] rounded-lg border border-white/10 flex items-center justify-center">
              <div className="text-center p-6">
                <ImageIcon className="h-16 w-16 mx-auto text-gray-500 mb-4" />
                <p className="text-gray-400">Selecciona una imagen para empezar</p>
              </div>
            </div>
          )}
          
          {sourceImage && !transformedImage && (
            <div className="h-[512px] bg-[#13131e] rounded-lg border border-white/10 flex items-center justify-center">
              <div className="text-center p-6">
                <Button 
                  onClick={handleTransform}
                  disabled={isTransforming}
                  className="bg-gradient-to-r from-neon-pink to-neon-blue text-white py-6 px-8 hover:opacity-90 rounded-xl animate-glow"
                >
                  {isTransforming ? (
                    <span className="flex items-center gap-2">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Transformando...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <ArrowRight className="h-5 w-5" />
                      Transformar a Cartoon
                    </span>
                  )}
                </Button>
              </div>
            </div>
          )}
          
          {transformedImage && (
            <div className="relative overflow-hidden rounded-lg border border-white/10 bg-[#13131e]">
              <AspectRatio ratio={1/1} className="bg-[#0c0c14]">
                <img 
                  src={transformedImage} 
                  alt="Imagen transformada" 
                  className="w-full h-full object-contain"
                />
              </AspectRatio>
              <div className="p-4 flex justify-between">
                <Button
                  onClick={() => handleDownload(transformedImage)}
                  className="flex-1 bg-gradient-to-r from-neon-pink to-neon-blue text-white hover:opacity-90"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Descargar imagen transformada
                </Button>
              </div>
            </div>
          )}
          
          {sourceImage && transformedImage && (
            <Button 
              onClick={handleTransform}
              disabled={isTransforming}
              className="w-full bg-white/10 hover:bg-white/20 text-white"
            >
              {isTransforming ? "Transformando..." : "Volver a transformar"}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartoonTransformer;
