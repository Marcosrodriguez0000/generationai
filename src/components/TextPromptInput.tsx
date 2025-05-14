import React, { useState } from 'react';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Text, Settings2 } from 'lucide-react';
import { toast } from 'sonner';
import { 
  Popover,
  PopoverContent,
  PopoverTrigger 
} from './ui/popover';
import { Slider } from './ui/slider';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { TextGenerationSettings } from '@/services/textGenerationService';

interface TextPromptInputProps {
  onGenerate: (prompt: string, settings: TextGenerationSettings) => void;
  isGenerating: boolean;
}

const TextPromptInput = ({ onGenerate, isGenerating }: TextPromptInputProps) => {
  const [prompt, setPrompt] = useState('');
  
  // Configuraciones avanzadas para la generación de texto
  const [maxLength, setMaxLength] = useState<number>(500);
  const [temperature, setTemperature] = useState<number>(0.7);
  const [format, setFormat] = useState<string>('paragraph');
  const [showAdvanced, setShowAdvanced] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) {
      toast.error("Por favor, ingresa una descripción para el texto");
      return;
    }
    
    if (isGenerating) {
      return;
    }
    
    onGenerate(prompt, {
      maxLength,
      temperature,
      format
    });
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="relative">
          <Textarea
            placeholder="Describe el texto que quieres crear... (por ejemplo: 'una historia de aventuras en el espacio')"
            className="py-4 px-5 text-base rounded-xl border-neon-blue/20 dark:border-neon-blue/10 bg-black/30 backdrop-blur-sm focus-visible:ring-neon-pink/40 text-white min-h-[100px] resize-none"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            disabled={isGenerating}
          />
          <div className="absolute bottom-2 right-2 opacity-50 text-xs text-gray-400">
            {prompt.length > 0 ? `${prompt.length} caracteres` : ''}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="flex items-center gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              className="flex items-center gap-2"
              onClick={() => setShowAdvanced(!showAdvanced)}
            >
              <Settings2 className="h-4 w-4" />
              Ajustes Avanzados
            </Button>
            
            <Popover open={showAdvanced} onOpenChange={setShowAdvanced}>
              <PopoverContent className="w-80 p-4">
                <div className="space-y-4">
                  <h4 className="font-medium mb-2">Configuración Avanzada</h4>
                  
                  <div className="space-y-2">
                    <Label htmlFor="format">Formato</Label>
                    <Select value={format} onValueChange={setFormat}>
                      <SelectTrigger id="format">
                        <SelectValue placeholder="Selecciona formato" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="paragraph">Párrafo</SelectItem>
                        <SelectItem value="story">Historia</SelectItem>
                        <SelectItem value="poem">Poema</SelectItem>
                        <SelectItem value="essay">Ensayo</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label htmlFor="maxLength">Longitud máxima: {maxLength}</Label>
                      <span className="text-sm text-muted-foreground">{maxLength}</span>
                    </div>
                    <Slider
                      id="maxLength"
                      min={100}
                      max={1000}
                      step={50}
                      value={[maxLength]}
                      onValueChange={(value) => setMaxLength(value[0])}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label htmlFor="temperature">Creatividad: {temperature.toFixed(1)}</Label>
                      <span className="text-sm text-muted-foreground">{temperature.toFixed(1)}</span>
                    </div>
                    <Slider
                      id="temperature"
                      min={0.1}
                      max={1.0}
                      step={0.1}
                      value={[temperature]}
                      onValueChange={(value) => setTemperature(value[0])}
                    />
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </div>

          <Button 
            type="submit" 
            disabled={!prompt.trim() || isGenerating}
            className="bg-gradient-to-r from-neon-pink to-neon-blue text-white py-6 px-8 hover:opacity-90 rounded-xl animate-glow"
          >
            {isGenerating ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Generando...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <Text className="h-5 w-5" />
                Generar Texto
              </span>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default TextPromptInput;
