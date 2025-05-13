
import React, { useRef, useState } from 'react';
import { AlertTriangle } from 'lucide-react';

interface GeneratedAudioPlayerProps {
  audioUrl: string;
  onAudioLoad: () => void;
  onAudioError: (e: React.SyntheticEvent<HTMLAudioElement, Event>) => void;
  audioLoadError: boolean;
  onRetryAudio: () => void;
}

const GeneratedAudioPlayer: React.FC<GeneratedAudioPlayerProps> = ({
  audioUrl,
  onAudioLoad,
  onAudioError,
  audioLoadError,
  onRetryAudio
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const audioPlayerRef = useRef<HTMLAudioElement>(null);

  const handleLoadedMetadata = () => {
    setIsLoading(false);
    onAudioLoad();
  };

  return (
    <div className="mt-12 max-w-3xl mx-auto bg-white/50 dark:bg-zinc-800/50 backdrop-blur-lg p-8 rounded-xl border border-gray-200 dark:border-zinc-700">
      <h2 className="text-2xl font-semibold mb-4 text-center">Audio Generado</h2>
      <div className="mb-4 text-center">
        {isLoading && !audioLoadError && (
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
            Cargando audio...
          </p>
        )}
      </div>
      <audio 
        ref={audioPlayerRef}
        controls 
        className="w-full"
        src={audioUrl}
        onLoadedMetadata={handleLoadedMetadata}
        onError={onAudioError}
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
            onClick={onRetryAudio}
            className="text-cosmos-purple hover:text-cosmos-pink underline"
          >
            Intentar nuevamente
          </button>
        </div>
      )}
      <div className="mt-6 text-center">
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
          {audioLoadError 
            ? "Se está usando un audio de demostración. Para una mejor clonación, intenta con otra muestra de audio."
            : "Este audio ha sido generado usando tecnología de clonación de voz."}
        </p>
        <a 
          href={audioUrl} 
          download="voz-clonada.mp3"
          className="text-cosmos-purple hover:text-cosmos-pink font-medium transition-colors"
          target="_blank"
          rel="noopener noreferrer"
        >
          Descargar audio
        </a>
      </div>
    </div>
  );
};

export default GeneratedAudioPlayer;
