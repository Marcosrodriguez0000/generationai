
import React, { useState, useRef } from 'react';
import { toast } from "sonner";
import Header from "@/components/Header";
import CosmosBackground from "@/components/CosmosBackground";
import AudioUploader from "@/components/AudioUploader";
import VoiceCloneInput from "@/components/VoiceCloneInput";
import { cloneVoice } from "@/services/voiceService";

const VoiceCloner = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [audioSample, setAudioSample] = useState<File | null>(null);
  const [audioSampleUrl, setAudioSampleUrl] = useState<string | null>(null);
  const [generatedAudio, setGeneratedAudio] = useState<string | null>(null);
  const audioPlayerRef = useRef<HTMLAudioElement>(null);
  const sampleAudioRef = useRef<HTMLAudioElement>(null);

  const handleAudioUpload = (file: File) => {
    setAudioSample(file);
    setGeneratedAudio(null);
    
    // Create a URL for the uploaded audio sample
    const audioUrl = URL.createObjectURL(file);
    setAudioSampleUrl(audioUrl);
    
    toast("Audio cargado correctamente", {
      description: `Archivo: ${file.name}`,
    });
  };

  const handleGenerateVoiceClone = async (text: string) => {
    if (!audioSample) {
      toast("Error", {
        description: "Primero debes subir una muestra de voz",
      });
      return;
    }

    setIsProcessing(true);

    try {
      toast("Generando audio...", {
        description: "Esto puede tomar unos momentos.",
      });

      const audioUrl = await cloneVoice(audioSample, text);
      setGeneratedAudio(audioUrl);
      
      toast("¡Audio generado exitosamente!", {
        description: "Tu audio ha sido clonado con éxito.",
      });
    } catch (error) {
      console.error("Error clonando voz:", error);
      toast("Error al clonar la voz", {
        description: "Ha ocurrido un error. Por favor intenta nuevamente.",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <CosmosBackground />
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="text-center mb-10 max-w-2xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cosmos-purple to-cosmos-pink mb-4">
            Clonador de Voz
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
            Sube una muestra de tu voz y crea un audio personalizado con tu estilo único
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <div className="bg-white/50 dark:bg-zinc-800/50 backdrop-blur-lg p-6 rounded-xl border border-gray-200 dark:border-zinc-700">
            <h2 className="text-xl font-semibold mb-4">Paso 1: Sube tu muestra de voz</h2>
            <AudioUploader onAudioUpload={handleAudioUpload} isProcessing={isProcessing} />
            
            {/* Audio sample preview */}
            {audioSampleUrl && (
              <div className="mt-6 pt-4 border-t border-gray-200 dark:border-zinc-700">
                <h3 className="text-md font-medium mb-3">Muestra de audio cargada:</h3>
                <audio 
                  ref={sampleAudioRef}
                  controls 
                  className="w-full"
                  src={audioSampleUrl}
                />
              </div>
            )}
          </div>

          <div className="bg-white/50 dark:bg-zinc-800/50 backdrop-blur-lg p-6 rounded-xl border border-gray-200 dark:border-zinc-700">
            <h2 className="text-xl font-semibold mb-4">Paso 2: Escribe el texto que deseas clonar</h2>
            <VoiceCloneInput onGenerate={handleGenerateVoiceClone} isProcessing={isProcessing} />
          </div>
        </div>

        {generatedAudio && (
          <div className="mt-12 max-w-3xl mx-auto bg-white/50 dark:bg-zinc-800/50 backdrop-blur-lg p-8 rounded-xl border border-gray-200 dark:border-zinc-700">
            <h2 className="text-2xl font-semibold mb-4 text-center">Audio Generado</h2>
            <audio 
              ref={audioPlayerRef}
              controls 
              className="w-full"
              src={generatedAudio}
            />
            <div className="mt-4 text-center">
              <a 
                href={generatedAudio} 
                download="voz-clonada.mp3"
                className="text-cosmos-purple hover:text-cosmos-pink font-medium transition-colors"
              >
                Descargar audio
              </a>
            </div>
          </div>
        )}

        {!generatedAudio && !isProcessing && !audioSampleUrl && (
          <div className="text-center mt-20 bg-white/50 dark:bg-zinc-800/50 backdrop-blur-lg p-10 mx-auto max-w-md rounded-xl border border-gray-200 dark:border-zinc-700">
            <h3 className="text-xl font-medium mb-2">Crea tu primera clonación de voz</h3>
            <p className="text-muted-foreground">
              Sube una muestra de audio y escribe el texto que deseas generar con tu misma voz.
            </p>
          </div>
        )}
      </main>
      <footer className="py-6 text-center text-sm text-gray-500">
        <p>© 2025 Generation AI</p>
      </footer>
    </div>
  );
};

export default VoiceCloner;
