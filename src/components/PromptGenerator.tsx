
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";

interface PromptGeneratorProps {
  onGenerate: (prompt: string) => Promise<void>;
  isGenerating: boolean;
}

const PromptGenerator = ({ onGenerate, isGenerating }: PromptGeneratorProps) => {
  const [prompt, setPrompt] = useState('');

  const handleSubmit = async () => {
    if (!prompt.trim() || isGenerating) return;
    await onGenerate(prompt);
  };

  return (
    <div className="relative mb-12 glass-card p-6 rounded-xl backdrop-blur-lg bg-black/20 border border-white/5">
      <textarea
        className="w-full p-4 text-white bg-black/70 border border-purple-500/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 resize-none"
        placeholder="Describe lo que quieres crear..."
        rows={3}
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        disabled={isGenerating}
      />
      
      <div className="flex justify-end mt-3">
        <Button
          type="button"
          onClick={handleSubmit}
          disabled={!prompt.trim() || isGenerating}
          className="bg-[#9333EA] hover:bg-[#7E22CE] text-white border-0 rounded-md px-6"
        >
          {isGenerating ? "Generando..." : "Generar imagen"}
        </Button>
      </div>
    </div>
  );
};

export default PromptGenerator;
