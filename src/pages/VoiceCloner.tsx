
import React, { useState, useRef, useEffect } from 'react';
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
  const [audioGenerated, setAudioGenerated] = useState(false);
  const [audioLoadError, setAudioLoadError] = useState(false);
  const [audioLoaded, setAudioLoaded] = useState(false);
  const audioPlayerRef = useRef<HTMLAudioElement>(null);
  const sampleAudioRef = useRef<HTMLAudioElement>(null);

  // Efecto para limpiar las URLs de objetos cuando el componente se desmonte
  useEffect(() => {
    return () => {
      if (audioSampleUrl) {
        URL.revokeObjectURL(audioSampleUrl);
      }
    };
  }, [audioSampleUrl]);

  const handleAudioUpload = (file: File) => {
    setAudioSample(file);
    setGeneratedAudio(null);
    setAudioGenerated(false);
    setAudioLoadError(false);
    setAudioLoaded(false);
    
    // Revocar URL anterior si existe
    if (audioSampleUrl) {
      URL.revokeObjectURL(audioSampleUrl);
    }
    
    // Crear una URL para la muestra de audio subida
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
    setAudioGenerated(false);
    setAudioLoadError(false);
    setAudioLoaded(false);

    try {
      toast("Generando audio...", {
        description: "Esto puede tomar unos momentos.",
      });

      const audioUrl = await cloneVoice(audioSample, text);
      
      // Validar que la URL sea accesible
      try {
        const response = await fetch(audioUrl, { method: 'HEAD' });
        if (!response.ok) {
          throw new Error('Audio URL no accessible');
        }
      } catch (error) {
        console.error("Error validando URL:", error);
        throw new Error('No se pudo acceder al audio generado');
      }
      
      setGeneratedAudio(audioUrl);
      setAudioGenerated(true);
      
      // Asegurarnos de que el audio se cargue correctamente
      if (audioPlayerRef.current) {
        audioPlayerRef.current.src = audioUrl;
        audioPlayerRef.current.load();
      }
      
      toast("¡Audio generado exitosamente!", {
        description: "Tu audio ha sido clonado con éxito.",
      });
    } catch (error) {
      console.error("Error clonando voz:", error);
      setAudioLoadError(true);
      toast("Error al clonar la voz", {
        description: "Ha ocurrido un error. Usando audio alternativo.",
      });
      
      // Usar un audio de fallback comprobado
      const fallbackAudio = "https://cdn.sndup.net/wcxx/sample-15s.mp3?token=OOfz9_MbZRf-JzL2ZdV1kxE2JejKg06T7bTI2NnWEmA&token_path=%2Fwcxx%2F&expires=1748004552";
      setGeneratedAudio(fallbackAudio);
      
      if (audioPlayerRef.current) {
        audioPlayerRef.current.src = fallbackAudio;
        audioPlayerRef.current.load();
      }
    } finally {
      setIsProcessing(false);
    }
  };

  // Manejar evento de carga del audio para verificar que se reproduce correctamente
  const handleAudioLoad = () => {
    console.log("Audio cargado correctamente con duración:", 
                audioPlayerRef.current?.duration);
    
    setAudioLoaded(true);
    
    if (audioPlayerRef.current?.duration === 0 || audioPlayerRef.current?.duration === undefined) {
      setAudioLoadError(true);
      toast("Error", {
        description: "El audio generado parece estar vacío. Intentando con fuente alternativa...",
      });
      
      // Usar un audio de fallback comprobado si la duración es 0
      const fallbackAudio = "https://cdn.sndup.net/wcxx/sample-15s.mp3?token=OOfz9_MbZRf-JzL2ZdV1kxE2JejKg06T7bTI2NnWEmA&token_path=%2Fwcxx%2F&expires=1748004552";
      setGeneratedAudio(fallbackAudio);
      
      if (audioPlayerRef.current) {
        audioPlayerRef.current.src = fallbackAudio;
        audioPlayerRef.current.load();
      }
    }
  };

  // Manejar error de carga de audio
  const handleAudioError = (e: React.SyntheticEvent<HTMLAudioElement, Event>) => {
    console.error("Error cargando audio:", e);
    setAudioLoadError(true);
    toast("Error", {
      description: "No se pudo cargar el audio generado. Intentando con fuente alternativa...",
    });
    
    // Usar audio alternativo
    const fallbackAudio = "https://cdn.sndup.net/wcxx/sample-15s.mp3?token=OOfz9_MbZRf-JzL2ZdV1kxE2JejKg06T7bTI2NnWEmA&token_path=%2Fwcxx%2F&expires=1748004552";
    setGeneratedAudio(fallbackAudio);
    
    if (audioPlayerRef.current) {
      audioPlayerRef.current.src = fallbackAudio;
      audioPlayerRef.current.load();
    }
  };

  // Retry loading audio if there was an error
  const handleRetryAudio = () => {
    setAudioLoadError(false);
    if (audioPlayerRef.current && generatedAudio) {
      audioPlayerRef.current.src = generatedAudio;
      audioPlayerRef.current.load();
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
                  preload="auto"
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
            <div className="mb-4 text-center">
              {!audioLoaded && !audioLoadError && (
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                  Cargando audio...
                </p>
              )}
            </div>
            <audio 
              ref={audioPlayerRef}
              controls 
              className="w-full"
              src={generatedAudio}
              onLoadedMetadata={handleAudioLoad}
              onError={handleAudioError}
              preload="auto"
              autoPlay={false}
            />
            {audioLoadError && (
              <div className="mt-4 text-center">
                <p className="text-red-500 mb-2">Hubo un problema al cargar el audio</p>
                <button 
                  onClick={handleRetryAudio}
                  className="text-cosmos-purple hover:text-cosmos-pink underline"
                >
                  Intentar nuevamente
                </button>
              </div>
            )}
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                Esta demostración usa voces pregrabadas para simular la clonación de voz.
                En una implementación real, se utilizaría un modelo de IA para generar audio similar a tu voz original.
              </p>
              <a 
                href={generatedAudio} 
                download="voz-clonada.mp3"
                className="text-cosmos-purple hover:text-cosmos-pink font-medium transition-colors"
                target="_blank"
                rel="noopener noreferrer"
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
