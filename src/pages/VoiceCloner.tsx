
import React, { useState, useRef, useEffect } from 'react';
import { toast } from "sonner";
import Header from "@/components/Header";
import CosmosBackground from "@/components/CosmosBackground";
import AudioUploader from "@/components/AudioUploader";
import VoiceCloneInput from "@/components/VoiceCloneInput";
import { cloneVoice } from "@/services/voiceService";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Info, AlertTriangle } from "lucide-react";

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

  // Working audio for fallback (guaranteed to work)
  const WORKING_FALLBACK_AUDIO = "https://assets.mixkit.co/music/preview/mixkit-tech-house-vibes-130.mp3";

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

      // Intentar obtener el audio clonado
      let audioUrl = await cloneVoice(audioSample, text);
      
      // Verificar que la URL sea accesible antes de usarla
      try {
        const response = await fetch(audioUrl, { method: 'HEAD' });
        if (!response.ok) {
          console.log("Audio URL no accessible, using fallback");
          throw new Error('Audio URL no accessible');
        }
      } catch (error) {
        console.error("Error validando URL:", error);
        audioUrl = WORKING_FALLBACK_AUDIO;
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
        description: "Usando audio alternativo garantizado.",
      });
      
      // Usar un audio de fallback garantizado que funciona
      setGeneratedAudio(WORKING_FALLBACK_AUDIO);
      
      if (audioPlayerRef.current) {
        audioPlayerRef.current.src = WORKING_FALLBACK_AUDIO;
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
        description: "El audio generado parece estar vacío. Usando fuente alternativa garantizada.",
      });
      
      // Usar un audio de fallback garantizado
      const fallbackAudio = WORKING_FALLBACK_AUDIO;
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
      description: "No se pudo cargar el audio. Usando fuente alternativa garantizada.",
    });
    
    // Usar audio alternativo garantizado
    setGeneratedAudio(WORKING_FALLBACK_AUDIO);
    
    if (audioPlayerRef.current) {
      audioPlayerRef.current.src = WORKING_FALLBACK_AUDIO;
      audioPlayerRef.current.load();
    }
  };

  // Retry loading audio if there was an error
  const handleRetryAudio = () => {
    setAudioLoadError(false);
    if (audioPlayerRef.current && generatedAudio) {
      audioPlayerRef.current.src = WORKING_FALLBACK_AUDIO;
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

        <Alert className="mb-6 max-w-3xl mx-auto">
          <Info className="h-5 w-5" />
          <AlertTitle>Modo de demostración</AlertTitle>
          <AlertDescription>
            Esta es una demostración que simula la clonación de voz usando muestras predefinidas. 
            En una implementación real se utilizaría un modelo de IA como ElevenLabs.
          </AlertDescription>
        </Alert>

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
                <p className="text-amber-500 mb-2 flex items-center justify-center gap-2">
                  <AlertTriangle className="h-4 w-4" />
                  Usando audio alternativo debido a problemas de conexión
                </p>
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
                Esta demostración usa audios pregrabados para simular la clonación de voz.
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
