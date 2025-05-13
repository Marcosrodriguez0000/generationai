
import React, { useState } from 'react';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Sparkles } from 'lucide-react';

interface VoiceCloneInputProps {
  onGenerate: (text: string) => void;
  isProcessing: boolean;
}

const VoiceCloneInput = ({ onGenerate, isProcessing }: VoiceCloneInputProps) => {
  const [text, setText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim() && !isProcessing) {
      onGenerate(text);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <Textarea
        placeholder="Escribe el texto que quieres que se genere con tu voz..."
        className="min-h-[120px] resize-none border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-zinc-800/50 backdrop-blur-sm focus-visible:ring-cosmos-purple"
        value={text}
        onChange={(e) => setText(e.target.value)}
        disabled={isProcessing}
      />
      <Button 
        type="submit" 
        disabled={!text.trim() || isProcessing} 
        className="bg-gradient-to-r from-cosmos-purple to-cosmos-pink text-white py-6 px-8 hover:opacity-90"
      >
        {isProcessing ? (
          <span className="flex items-center gap-2">
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Procesando...
          </span>
        ) : (
          <span className="flex items-center gap-2">
            <Sparkles className="h-5 w-5" />
            Generar Audio
          </span>
        )}
      </Button>
    </form>
  );
};

export default VoiceCloneInput;
