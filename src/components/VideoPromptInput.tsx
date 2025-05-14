
import React, { useState } from 'react';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Play, Film } from 'lucide-react';
import { Label } from './ui/label';
import { VIDEO_MODELS, VideoGenerationSettings } from '@/services/videoService';

interface VideoPromptInputProps {
  onGenerate: (prompt: string, settings: VideoGenerationSettings) => void;
  isGenerating: boolean;
}

const VideoPromptInput = ({ onGenerate, isGenerating }: VideoPromptInputProps) => {
  const [prompt, setPrompt] = useState('');
  const [modelType, setModelType] = useState(VIDEO_MODELS.POLLINATIONS);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (prompt.trim() && !isGenerating) {
      // Use the selected model in the settings
      onGenerate(prompt, { 
        resolution: "512x512", 
        frameCount: 24, 
        quality: 7, 
        duration: 3,
        model: modelType
      });
    }
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
          <div className="flex items-center gap-3">
            <Label htmlFor="model-select" className="text-white">Modelo de IA:</Label>
            <select
              id="model-select"
              className="bg-black/40 text-white border border-neon-blue/20 rounded-lg px-3 py-2"
              value={modelType}
              onChange={(e) => setModelType(e.target.value)}
              disabled={isGenerating}
            >
              <option value={VIDEO_MODELS.POLLINATIONS}>Pollinations AI</option>
              <option value={VIDEO_MODELS.RUNWAY}>Runway Gen-2</option>
              <option value={VIDEO_MODELS.STABLE_DIFFUSION}>Stable Video Diffusion</option>
            </select>
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
