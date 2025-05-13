
import React from 'react';
import { Button } from './ui/button';
import { Music } from 'lucide-react';

interface VoiceConfigProps {
  onVoiceTypeChange: (voiceType: string) => void;
  selectedVoiceType: string;
}

const VoiceConfig: React.FC<VoiceConfigProps> = ({ onVoiceTypeChange, selectedVoiceType }) => {
  const voiceTypes = [
    { id: 'male', label: 'Voz Masculina' },
    { id: 'female', label: 'Voz Femenina' },
  ];
  
  return (
    <div className="space-y-4">
      <div className="flex justify-center gap-2">
        {voiceTypes.map((type) => (
          <Button
            key={type.id}
            variant={selectedVoiceType === type.id ? "default" : "outline"}
            size="sm"
            onClick={() => onVoiceTypeChange(type.id)}
            className="flex items-center gap-2"
          >
            <Music className="h-4 w-4" />
            {type.label}
          </Button>
        ))}
      </div>
      <p className="text-xs text-center text-muted-foreground">
        Esta versión utiliza un modelo local que no requiere API key
      </p>
    </div>
  );
};

export default VoiceConfig;
