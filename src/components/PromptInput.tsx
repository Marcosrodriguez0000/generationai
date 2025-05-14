
import React, { useState } from 'react';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Sparkles, Settings2 } from 'lucide-react';
import { GenerationSettings } from '@/services/imageService';
import { 
  Popover,
  PopoverContent,
  PopoverTrigger 
} from './ui/popover';
import GenerationSettings from './GenerationSettings';

interface PromptInputProps {
  onGenerate: (prompt: string, settings: GenerationSettings) => void;
  isGenerating: boolean;
}

const PromptInput = ({ onGenerate, isGenerating }: PromptInputProps) => {
  const [prompt, setPrompt] = useState('');
  const [showSettings, setShowSettings] = useState(false);
  const [settings, setSettings] = useState<GenerationSettings>({
    resolution: "512x512",
    quality: 7
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (prompt.trim() && !isGenerating) {
      onGenerate(prompt, settings);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="relative">
          <Textarea
            placeholder="Describe la imagen que quieres crear..."
            className="py-4 px-5 text-base rounded-xl border-neon-blue/20 dark:border-neon-blue/10 bg-black/30 backdrop-blur-sm focus-visible:ring-neon-pink/40 text-white min-h-[100px] resize-none"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            disabled={isGenerating}
          />
          <div className="absolute bottom-2 right-2 opacity-50 text-xs text-gray-400">
            {prompt.length > 0 ? `${prompt.length} caracteres` : ''}
          </div>
        </div>
        <div className="flex justify-between items-center">
          <Button 
            type="button" 
            variant="outline" 
            size="sm" 
            className="flex items-center gap-2"
            onClick={() => setShowSettings(!showSettings)}
          >
            <Settings2 className="h-4 w-4" />
            Configuración
          </Button>
          
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
                <Sparkles className="h-5 w-5" />
                Generar Imagen
              </span>
            )}
          </Button>
        </div>
      </form>
      
      {showSettings && (
        <GenerationSettings 
          settings={settings} 
          onSettingsChange={setSettings} 
        />
      )}
    </div>
  );
};

export default PromptInput;
