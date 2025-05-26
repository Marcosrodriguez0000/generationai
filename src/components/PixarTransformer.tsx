
import React, { useState } from 'react';
import { transformToPixar, PixarTransformSettings } from '@/services/replicateService';
import { Button } from './ui/button';
import { Slider } from './ui/slider';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { toast } from "sonner";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Download, Sparkles, Type } from 'lucide-react';

const PixarTransformer = () => {
  const [prompt, setPrompt] = useState('');
  const [transformedImage, setTransformedImage] = useState<string | null>(null);
  const [isTransforming, setIsTransforming] = useState(false);
  const [settings, setSettings] = useState<PixarTransformSettings>({
    style: "pixar",
    strength: 0.8
  });

  const handleTransform = async () => {
    if (!prompt.trim()) {
      toast.error("Error", { description: "Por favor describe el personaje Pixar que quieres crear." });
      return;
    }

    setIsTransforming(true);
    
    try {
      toast("Generando personaje Pixar...", {
        description: "Esto puede tomar unos minutos usando IA.",
      });

      const result = await transformToPixar(prompt, settings);
      setTransformedImage(result);
      
      toast.success("¡Personaje Pixar creado!", {
        description: "Tu personaje ha sido generado exitosamente.",
      });
    } catch (error) {
      console.error("Error generating Pixar character:", error);
      toast.error("Error en la generación", {
        description: "No se pudo generar el personaje. Por favor intenta de nuevo.",
      });
    } finally {
      setIsTransforming(false);
    }
  };

  const handleDownload = (imageUrl: string | null) => {
    if (!imageUrl) return;
    
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = 'personaje-pixar.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-neon-pink to-neon-blue mb-4">
          Generador de Personajes Pixar
        </h1>
        <p className="text-lg text-gray-300 mb-6">
          Describe tu personaje y lo convertiremos a estilo Pixar/Disney con inteligencia artificial
        </p>
        <div className="flex items-center justify-center gap-2 text-sm text-gray-400">
          <Sparkles className="h-4 w-4" />
          <span>Powered by Pollinations AI</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Columna izquierda: Input de descripción */}
        <div className="space-y-6">
          <h2 className="text-xl font-medium text-center text-white mb-4">Describe tu Personaje</h2>
          
          <div className="glass-card p-6 rounded-xl backdrop-blur-lg bg-black/20 border border-white/5">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="character-prompt" className="text-white">Descripción del personaje</Label>
                <Textarea
                  id="character-prompt"
                  placeholder="Ejemplo: Una niña de 8 años con cabello rizado castaño, ojos grandes azules, vestido amarillo, sonriendo alegremente..."
                  className="min-h-[120px] bg-black/70 border-purple-500/30 text-white resize-none"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  disabled={isTransforming}
                />
                <p className="text-xs text-gray-400">
                  Describe físicamente el personaje: edad, cabello, ojos, ropa, expresión, etc.
                </p>
              </div>
            </div>
          </div>

          {/* Configuración de generación */}
          <div className="glass-card p-6 rounded-xl backdrop-blur-lg bg-black/20 border border-white/5">
            <h3 className="font-medium text-white mb-4">Ajustes de Generación</h3>
            
            <div className="space-y-6">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label htmlFor="strength">Intensidad Pixar</Label>
                  <span className="text-sm text-muted-foreground">{settings.strength.toFixed(1)}</span>
                </div>
                <Slider
                  id="strength"
                  min={0.3}
                  max={1.0}
                  step={0.1}
                  value={[settings.strength]}
                  onValueChange={(value) => setSettings({...settings, strength: value[0]})}
                />
                <p className="text-xs text-gray-400">
                  Controla qué tan fuerte es el estilo Pixar/Disney
                </p>
              </div>
            </div>
          </div>

          {/* Botón de generar */}
          <Button 
            onClick={handleTransform}
            disabled={isTransforming || !prompt.trim()}
            className="w-full bg-gradient-to-r from-neon-pink to-neon-blue text-white py-6 px-8 hover:opacity-90 rounded-xl animate-glow"
          >
            {isTransforming ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Generando personaje...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <Sparkles className="h-5 w-5" />
                Generar Personaje Pixar
              </span>
            )}
          </Button>
        </div>

        {/* Columna derecha: Resultado */}
        <div className="space-y-6">
          <h2 className="text-xl font-medium text-center text-white mb-4">Personaje Generado</h2>
          
          {!transformedImage && (
            <div className="h-[512px] bg-[#13131e] rounded-lg border border-white/10 flex items-center justify-center">
              <div className="text-center p-6">
                <Type className="h-16 w-16 mx-auto text-gray-500 mb-4" />
                <p className="text-gray-400">Describe tu personaje para empezar</p>
              </div>
            </div>
          )}
          
          {transformedImage && (
            <div className="relative overflow-hidden rounded-lg border border-white/10 bg-[#13131e]">
              <AspectRatio ratio={1/1} className="bg-[#0c0c14]">
                <img 
                  src={transformedImage} 
                  alt="Personaje Pixar generado" 
                  className="w-full h-full object-contain"
                />
              </AspectRatio>
              <div className="p-4 flex justify-between">
                <Button
                  onClick={() => handleDownload(transformedImage)}
                  className="flex-1 bg-gradient-to-r from-neon-pink to-neon-blue text-white hover:opacity-90"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Descargar Personaje
                </Button>
              </div>
              
              {/* Mostrar el prompt usado */}
              <div className="p-4 border-t border-white/10">
                <h4 className="text-white font-medium mb-2">Descripción usada:</h4>
                <p className="text-gray-300 text-sm">{prompt}</p>
              </div>
            </div>
          )}
          
          {transformedImage && (
            <Button 
              onClick={handleTransform}
              disabled={isTransforming || !prompt.trim()}
              className="w-full bg-white/10 hover:bg-white/20 text-white"
            >
              {isTransforming ? "Generando..." : "Generar otra versión"}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default PixarTransformer;
