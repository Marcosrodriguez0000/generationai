
import React, { useState } from 'react';
import { toast } from "sonner";
import TextPromptInput from './TextPromptInput';
import { generateTextWithPollinations, TextGenerationSettings } from '@/services/textGenerationService';
import GeneratedTextDisplay from './GeneratedTextDisplay';

interface GeneratedTextItem {
  id: string;
  text: string;
  prompt: string;
}

const TextGenerator = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedText, setGeneratedText] = useState<GeneratedTextItem | null>(null);
  const [prompt, setPrompt] = useState<string>("");

  const handleGenerate = async (prompt: string, settings: TextGenerationSettings) => {
    if (isGenerating) return;
    
    setIsGenerating(true);
    setPrompt(prompt);
    
    try {
      toast("Generando texto...", {
        description: "Esto puede tomar unos segundos, por favor espera.",
      });

      // Generate text using Pollinations service
      const text = await generateTextWithPollinations(prompt, settings);
      
      // Create new text item
      const newText: GeneratedTextItem = {
        id: Date.now().toString(),
        text,
        prompt,
      };

      // Set the generated text
      setGeneratedText(newText);

      toast.success("¡Texto generado exitosamente!", {
        description: "Tu texto está listo.",
      });
      
    } catch (error) {
      console.error("Error generating text:", error);
      toast.error("Error al generar el texto", {
        description: "Ha ocurrido un error al intentar generar el texto.",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSaveText = () => {
    if (!generatedText) return;
    
    toast.success("Texto guardado", {
      description: "El texto se ha guardado en tu colección",
    });
  };

  return (
    <div className="max-w-3xl mx-auto mb-12 mt-8">
      <div className="text-center">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-neon-pink to-neon-blue mb-6">
          Generador de Textos IA
        </h1>
        <p className="text-gray-300 text-lg mb-8">
          Describe el texto que quieres crear y la IA lo generará para ti
        </p>
      </div>
      
      <div className="relative mb-12 glass-card p-6 rounded-xl backdrop-blur-lg bg-black/20 border border-white/5">
        <TextPromptInput 
          onGenerate={handleGenerate} 
          isGenerating={isGenerating} 
        />
      </div>
      
      {generatedText && (
        <GeneratedTextDisplay 
          text={generatedText.text}
          prompt={generatedText.prompt}
          onSave={handleSaveText}
        />
      )}
    </div>
  );
};

export default TextGenerator;
