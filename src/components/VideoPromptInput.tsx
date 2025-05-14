
import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Film, Key } from 'lucide-react';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { VideoGenerationSettings } from '@/services/videoService';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Alert, AlertDescription } from './ui/alert';

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
  const [isKeyDialogOpen, setIsKeyDialogOpen] = useState(false);

  // Store API key in localStorage when it changes
  useEffect(() => {
    if (apiKey) {
      localStorage.setItem('videoApiKey', apiKey);
    }
  }, [apiKey]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (prompt.trim() && !isGenerating) {
      onGenerate(prompt, {
        resolution: "512x512",
        fps: 24,
        duration: 3,
        apiKey
      });
    }
  };

  const handleSaveApiKey = () => {
    setIsKeyDialogOpen(false);
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
          <div>
            <Dialog open={isKeyDialogOpen} onOpenChange={setIsKeyDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm" className="flex items-center gap-2 text-white">
                  <Key className="h-4 w-4" />
                  {apiKey ? "API Key Configurada" : "Configurar API Key"}
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>API Key para Generación de Videos</DialogTitle>
                  <DialogDescription>
                    Introduce tu API key para generar videos.
                  </DialogDescription>
                </DialogHeader>
                
                <div className="space-y-4 py-4">
                  <Alert>
                    <AlertDescription>
                      Para obtener una API key gratuita, regístrate en un servicio de generación de videos con IA.
                    </AlertDescription>
                  </Alert>
                  
                  <Input
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    placeholder="api_key..."
                    className="w-full"
                  />
                </div>
                
                <DialogFooter>
                  <Button onClick={handleSaveApiKey}>Guardar API Key</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
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
