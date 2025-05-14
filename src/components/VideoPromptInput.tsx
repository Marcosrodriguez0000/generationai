
import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Film, Settings2 } from 'lucide-react';
import { VideoGenerationSettings } from '@/services/videoService';
import ApiKeyInput from './ApiKeyInput';
import { toast } from 'sonner';
import { 
  Popover,
  PopoverContent,
  PopoverTrigger 
} from './ui/popover';
import { Slider } from './ui/slider';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

interface VideoPromptInputProps {
  onGenerate: (prompt: string, settings: VideoGenerationSettings) => void;
  isGenerating: boolean;
}

const VideoPromptInput = ({ onGenerate, isGenerating }: VideoPromptInputProps) => {
  const [prompt, setPrompt] = useState('');
  const [apiKey, setApiKey] = useState(() => {
    // Try to get API key from localStorage
    return localStorage.getItem('videoApiKey') || '';
  });
  
  // Configuraciones avanzadas para la generación de video
  const [resolution, setResolution] = useState<string>("512x512");
  const [fps, setFps] = useState<number>(24);
  const [duration, setDuration] = useState<number>(3);
  const [showAdvanced, setShowAdvanced] = useState<boolean>(false);

  // Store API key in localStorage when it changes
  useEffect(() => {
    if (apiKey) {
      localStorage.setItem('videoApiKey', apiKey);
    }
  }, [apiKey]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) {
      toast.error("Por favor, ingresa una descripción para el video");
      return;
    }
    
    if (!apiKey) {
      toast.error("Se requiere una API key válida", {
        description: "Por favor, configura tu API key de Stability AI"
      });
      return;
    }
    
    if (isGenerating) {
      return;
    }
    
    onGenerate(prompt, {
      resolution,
      fps,
      duration,
      apiKey
    });
  };

  const handleApiKeyChange = (newKey: string) => {
    setApiKey(newKey);
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="relative">
          <Textarea
            placeholder="Describe el video que quieres crear... (por ejemplo: 'atardecer sobre montañas')"
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
            <ApiKeyInput apiKey={apiKey} onApiKeyChange={handleApiKeyChange} />
            
            <Popover open={showAdvanced} onOpenChange={setShowAdvanced}>
              <PopoverTrigger asChild>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex items-center gap-2"
                >
                  <Settings2 className="h-4 w-4" />
                  Avanzado
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80 p-4">
                <div className="space-y-4">
                  <h4 className="font-medium mb-2">Configuración Avanzada</h4>
                  
                  <div className="space-y-2">
                    <Label htmlFor="resolution">Resolución</Label>
                    <Select value={resolution} onValueChange={setResolution}>
                      <SelectTrigger id="resolution">
                        <SelectValue placeholder="Selecciona resolución" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="512x512">512x512</SelectItem>
                        <SelectItem value="576x320">576x320 (16:9)</SelectItem>
                        <SelectItem value="768x768">768x768</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label htmlFor="fps">FPS: {fps}</Label>
                      <span className="text-sm text-muted-foreground">{fps}</span>
                    </div>
                    <Slider
                      id="fps"
                      min={12}
                      max={30}
                      step={1}
                      value={[fps]}
                      onValueChange={(value) => setFps(value[0])}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label htmlFor="duration">Duración (seg.): {duration}</Label>
                      <span className="text-sm text-muted-foreground">{duration}s</span>
                    </div>
                    <Slider
                      id="duration"
                      min={1}
                      max={5}
                      step={1}
                      value={[duration]}
                      onValueChange={(value) => setDuration(value[0])}
                    />
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </div>

          <Button 
            type="submit" 
            disabled={!prompt.trim() || isGenerating || !apiKey}
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
                <Film className="h-5 w-5" />
                Generar Video
              </span>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default VideoPromptInput;
