
import React from 'react';

interface AudioSamplePreviewProps {
  audioUrl: string;
  isCreatingVoice: boolean;
  voiceReady: boolean;
}

const AudioSamplePreview: React.FC<AudioSamplePreviewProps> = ({ 
  audioUrl, 
  isCreatingVoice, 
  voiceReady 
}) => {
  return (
    <div className="mt-6 pt-4 border-t border-gray-200 dark:border-zinc-700">
      <h3 className="text-md font-medium mb-3">Muestra de audio cargada:</h3>
      <audio 
        controls 
        className="w-full"
        src={audioUrl}
        preload="auto"
      />
      
      {isCreatingVoice && (
        <p className="text-sm text-blue-500 mt-2 flex items-center gap-2 justify-center">
          <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Creando perfil de voz...
        </p>
      )}
      
      {voiceReady && !isCreatingVoice && (
        <p className="text-sm text-green-500 mt-2">
          Perfil de voz creado exitosamente
        </p>
      )}
    </div>
  );
};

export default AudioSamplePreview;
