
import React, { useState } from 'react';
import { generatePixarCharacterWithSupabase, PixarCharacterData } from '@/services/supabasePixarService';
import { Button } from './ui/button';
import { Slider } from './ui/slider';
import { Label } from './ui/label';
import { toast } from "sonner";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Download, Sparkles, RefreshCw } from 'lucide-react';
import PixarCharacterForm from './PixarCharacterForm';

interface PixarTransformSettings {
  style: string;
  strength: number;
}

const PixarTransformer = () => {
  const [transformedImage, setTransformedImage] = useState<string | null>(null);
  const [isTransforming, setIsTransforming] = useState(false);
  const [settings, setSettings] = useState<PixarTransformSettings>({
    style: "pixar",
    strength: 0.8
  });
  
  const [characterData, setCharacterData] = useState<PixarCharacterData>({
    name: '',
    age: '',
    gender: '',
    height: '',
    bodyType: '',
    skinTone: '',
    eyeColor: '',
    eyeShape: '',
    hairColor: '',
    hairStyle: '',
    facialExpression: '',
    outfit: '',
    accessories: '',
    shoes: '',
    personality: '',
    pose: '',
    background: '',
    lighting: '',
    pixarStyle: '',
    additionalDetails: ''
  });

  const handleTransform = async () => {
    if (!characterData.name || !characterData.age || !characterData.gender) {
      toast.error("Error", { description: "Por favor completa al menos el nombre, edad y género del personaje." });
      return;
    }

    setIsTransforming(true);
    
    try {
      toast("Generando personaje Pixar...", {
        description: "Creando tu personaje detallado con IA. Esto puede tomar unos minutos.",
      });

      const result = await generatePixarCharacterWithSupabase(characterData);
      setTransformedImage(result);
      
      toast.success("¡Personaje Pixar creado!", {
        description: "Tu personaje ha sido generado exitosamente con todos los detalles.",
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
    link.download = `${characterData.name || 'personaje'}-pixar.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const resetForm = () => {
    setCharacterData({
      name: '',
      age: '',
      gender: '',
      height: '',
      bodyType: '',
      skinTone: '',
      eyeColor: '',
      eyeShape: '',
      hairColor: '',
      hairStyle: '',
      facialExpression: '',
      outfit: '',
      accessories: '',
      shoes: '',
      personality: '',
      pose: '',
      background: '',
      lighting: '',
      pixarStyle: '',
      additionalDetails: ''
    });
    setTransformedImage(null);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-neon-pink to-neon-blue mb-4">
          Generador de Personajes Pixar
        </h1>
        <p className="text-lg text-gray-300 mb-6">
          Diseña tu personaje Pixar ideal con nuestro formulario detallado y genera imágenes profesionales con IA
        </p>
        <div className="flex items-center justify-center gap-2 text-sm text-gray-400">
          <Sparkles className="h-4 w-4" />
          <span>Powered by Supabase & Pollinations AI</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Columna izquierda: Formulario (2 columnas) */}
        <div className="lg:col-span-2">
          <PixarCharacterForm
            characterData={characterData}
            onCharacterChange={setCharacterData}
            onGenerate={handleTransform}
            isGenerating={isTransforming}
          />
        </div>

        {/* Columna derecha: Resultado y configuración (1 columna) */}
        <div className="space-y-6">
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

          {/* Resultado */}
          <div className="space-y-4">
            <h2 className="text-xl font-medium text-center text-white">Personaje Generado</h2>
            
            {!transformedImage && (
              <div className="h-[400px] bg-[#13131e] rounded-lg border border-white/10 flex items-center justify-center">
                <div className="text-center p-6">
                  <Sparkles className="h-16 w-16 mx-auto text-gray-500 mb-4" />
                  <p className="text-gray-400">Completa el formulario para generar tu personaje</p>
                </div>
              </div>
            )}
            
            {transformedImage && (
              <div className="relative overflow-hidden rounded-lg border border-white/10 bg-[#13131e]">
                <AspectRatio ratio={1/1} className="bg-[#0c0c14]">
                  <img 
                    src={transformedImage} 
                    alt={`Personaje Pixar: ${characterData.name}`}
                    className="w-full h-full object-contain"
                  />
                </AspectRatio>
                <div className="p-4 space-y-3">
                  <div className="flex gap-2">
                    <Button
                      onClick={() => handleDownload(transformedImage)}
                      className="flex-1 bg-gradient-to-r from-neon-pink to-neon-blue text-white hover:opacity-90"
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Descargar
                    </Button>
                    <Button
                      onClick={handleTransform}
                      disabled={isTransforming}
                      className="flex-1 bg-white/10 hover:bg-white/20 text-white"
                    >
                      <RefreshCw className="h-4 w-4 mr-2" />
                      Regenerar
                    </Button>
                  </div>
                  
                  <Button
                    onClick={resetForm}
                    variant="outline"
                    className="w-full bg-transparent border-white/20 text-white hover:bg-white/10"
                  >
                    Crear nuevo personaje
                  </Button>
                </div>
                
                {/* Mostrar información del personaje */}
                {characterData.name && (
                  <div className="p-4 border-t border-white/10">
                    <h4 className="text-white font-medium mb-2">Personaje: {characterData.name}</h4>
                    <div className="text-gray-300 text-sm space-y-1">
                      {characterData.age && <p><span className="font-medium">Edad:</span> {characterData.age}</p>}
                      {characterData.gender && <p><span className="font-medium">Género:</span> {characterData.gender}</p>}
                      {characterData.pixarStyle && <p><span className="font-medium">Estilo:</span> {characterData.pixarStyle}</p>}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PixarTransformer;
