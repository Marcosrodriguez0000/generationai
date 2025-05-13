
import React from 'react';

const EmptyStateMessage: React.FC = () => {
  return (
    <div className="text-center mt-20 bg-white/50 dark:bg-zinc-800/50 backdrop-blur-lg p-10 mx-auto max-w-md rounded-xl border border-gray-200 dark:border-zinc-700">
      <h3 className="text-xl font-medium mb-2">Crea tu primera clonación de voz</h3>
      <p className="text-muted-foreground">
        Sube una muestra de audio y escribe el texto que deseas generar con tu misma voz.
        No requiere API key externa.
      </p>
    </div>
  );
};

export default EmptyStateMessage;
