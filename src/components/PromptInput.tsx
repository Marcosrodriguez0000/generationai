
import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Sparkles } from 'lucide-react';

interface PromptInputProps {
  onGenerate: (prompt: string) => void;
  isGenerating: boolean;
}

const PromptInput = ({ onGenerate, isGenerating }: PromptInputProps) => {
  const [prompt, setPrompt] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (prompt.trim() && !isGenerating) {
      onGenerate(prompt);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="relative">
          <Input
            placeholder="Describe la imagen que quieres crear..."
            className="py-6 px-4 text-lg rounded-xl border-gold-200 dark:border-gold-900 bg-black/30 backdrop-blur-sm focus-visible:ring-gold-400 text-gold-100"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            disabled={isGenerating}
          />
        </div>
        <div className="flex justify-end">
          <Button 
            type="submit" 
            disabled={!prompt.trim() || isGenerating} 
            className="bg-gradient-to-r from-gold-400 to-brown-600 text-white py-6 px-8 hover:opacity-90 rounded-xl"
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
    </div>
  );
};

export default PromptInput;
