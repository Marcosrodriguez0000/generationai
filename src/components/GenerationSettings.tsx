
import React from 'react';
import { Slider } from './ui/slider';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

interface GenerationSettings {
  resolution: string;
  quality: number;
}

interface GenerationSettingsProps {
  settings: GenerationSettings;
  onSettingsChange: (settings: GenerationSettings) => void;
}

const GenerationSettings = ({ settings, onSettingsChange }: GenerationSettingsProps) => {
  return (
    <div className="w-full max-w-3xl mx-auto mt-6">
      <div className="glass-panel p-6 space-y-6">
        <h3 className="text-lg font-medium">Configuración de Generación</h3>
        
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between">
              <Label htmlFor="quality">Calidad de Imagen</Label>
              <span className="text-sm text-muted-foreground">{settings.quality}</span>
            </div>
            <Slider
              id="quality"
              min={1}
              max={10}
              step={1}
              value={[settings.quality]}
              onValueChange={(value) => onSettingsChange({ ...settings, quality: value[0] })}
              className="cosmos-gradient [&>[role=slider]]:bg-white"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="resolution">Resolución</Label>
            <Select
              value={settings.resolution}
              onValueChange={(value) => onSettingsChange({ ...settings, resolution: value })}
            >
              <SelectTrigger id="resolution">
                <SelectValue placeholder="Selecciona resolución" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="512x512">512x512</SelectItem>
                <SelectItem value="768x768">768x768</SelectItem>
                <SelectItem value="1024x1024">1024x1024</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GenerationSettings;
