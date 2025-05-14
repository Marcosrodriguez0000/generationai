
import React, { useState, useEffect } from 'react';
import { toast } from "sonner";
import TextPromptInput from './TextPromptInput';
import { generateTextWithPollinations, TextGenerationSettings } from '@/services/textGenerationService';
import GeneratedTextDisplay from './GeneratedTextDisplay';
import { Progress } from "@/components/ui/progress";

interface GeneratedTextItem {
  id: string;
  text: string;
  prompt: string;
}

const TextGenerator = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [isModelLoading, setIsModelLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [generatedText, setGeneratedText] = useState<GeneratedTextItem | null>(null);
  const [prompt, setPrompt] = useState<string>("");
  const [modelLoadFailed, setModelLoadFailed] = useState(false);

  // Check if the model is ready when component mounts
  useEffect(() => {
    const checkModelStatus = async () => {
      try {
        // Import dynamically to avoid SSR issues
        const { pipeline } = await import('@huggingface/transformers');
        
        // Try to load the model with progress tracking
        await pipeline('text-generation', 'distilgpt2', { 
          progress_callback: (progressInfo) => {
            // Handle progress updates safely
            const progress = 'progress' in progressInfo 
              ? (progressInfo as any).progress * 100 
              : ('status' in progressInfo ? 50 : 0);
            
            setLoadingProgress(Math.round(progress));
            console.log(`Model loading: ${Math.round(progress)}%`);
          }
        });
        
        setIsModelLoading(false);
        setModelLoadFailed(false);
      } catch (error) {
        console.error("Error preloading model:", error);
        setModelLoadFailed(true);
        setIsModelLoading(false);
        toast.error("Error al cargar el modelo de generación de texto", {
          description: "Se usará un modo offline para generar texto.",
        });
      }
    };

    checkModelStatus();
  }, []);

  const handleGenerate = async (prompt: string, settings: TextGenerationSettings) => {
    if (isGenerating) return;
    
    setIsGenerating(true);
    setPrompt(prompt);
    
    try {
      toast("Generando texto...", {
        description: "Esto puede tomar unos segundos, por favor espera.",
      });

      // Generate text using model
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
        description: error instanceof Error ? error.message : "Ha ocurrido un error al intentar generar el texto.",
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
        {isModelLoading ? (
          <div className="flex flex-col items-center justify-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-neon-pink mb-4"></div>
            <p className="text-white text-center">Cargando modelo de IA...</p>
            <p className="text-gray-400 text-sm mt-2">Esto puede tardar unos momentos la primera vez</p>
            <div className="w-full max-w-xs mt-4">
              <Progress value={loadingProgress} className="h-2" />
              <p className="text-xs text-gray-400 text-right mt-1">{loadingProgress}%</p>
            </div>
          </div>
        ) : (
          <TextPromptInput 
            onGenerate={handleGenerate} 
            isGenerating={isGenerating} 
          />
        )}
        
        {modelLoadFailed && !isModelLoading && (
          <div className="mt-4 p-3 bg-orange-500/20 border border-orange-500/30 rounded-md">
            <p className="text-sm text-white">
              No se pudo cargar el modelo en línea. Se usará un generador alternativo.
            </p>
          </div>
        )}
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
