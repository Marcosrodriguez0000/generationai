
import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Key, ExternalLink } from 'lucide-react';
import { setHuggingFaceApiKey, getHuggingFaceApiKey } from '@/services/civitaiService';
import { toast } from 'sonner';

const HuggingFaceApiKeyConfig = () => {
  const [apiKey, setApiKey] = useState(getHuggingFaceApiKey());
  const [isConfigured, setIsConfigured] = useState(!!getHuggingFaceApiKey());

  const handleSaveApiKey = () => {
    if (!apiKey.trim()) {
      toast.error('Por favor ingresa una API key válida');
      return;
    }

    setHuggingFaceApiKey(apiKey.trim());
    setIsConfigured(true);
    toast.success('API key configurada correctamente', {
      description: 'Ya puedes generar personajes Pixar'
    });
  };

  if (isConfigured) {
    return (
      <Card className="glass-card bg-green-500/10 border-green-500/20">
        <CardContent className="pt-6">
          <div className="flex items-center gap-2 text-green-400">
            <Key className="h-4 w-4" />
            <span className="text-sm">Hugging Face configurado correctamente</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="glass-card bg-yellow-500/10 border-yellow-500/20">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Key className="h-5 w-5" />
          Configurar Hugging Face (Gratis)
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-sm text-gray-300">
          <p className="mb-2">Para generar personajes necesitas una API key <strong>gratuita</strong> de Hugging Face:</p>
          <ol className="list-decimal list-inside space-y-1 text-xs">
            <li>Ve a <a href="https://huggingface.co/settings/tokens" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline inline-flex items-center gap-1">huggingface.co/settings/tokens <ExternalLink className="h-3 w-3" /></a></li>
            <li>Crea una nueva token (gratis)</li>
            <li>Copia y pega la token aquí</li>
          </ol>
        </div>
        
        <div className="space-y-2">
          <Label className="text-white">API Key de Hugging Face</Label>
          <Input
            type="password"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            placeholder="hf_..."
            className="bg-black/50 border-yellow-500/30 text-white"
          />
        </div>
        
        <Button 
          onClick={handleSaveApiKey}
          className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 text-white hover:opacity-90"
        >
          Configurar API Key
        </Button>
      </CardContent>
    </Card>
  );
};

export default HuggingFaceApiKeyConfig;
