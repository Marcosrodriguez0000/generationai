
import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Key, Server } from 'lucide-react';
import { setHuggingFaceApiKey, getHuggingFaceApiKey } from '@/services/civitaiService';
import { toast } from 'sonner';

const HuggingFaceApiKeyConfig = () => {
  const [isConfigured, setIsConfigured] = useState(false);

  useEffect(() => {
    // Verificar si ya está configurado
    const existingConfig = getHuggingFaceApiKey();
    if (existingConfig) {
      setIsConfigured(true);
    } else {
      // Auto-configurar para mostrar que está listo
      setHuggingFaceApiKey('configured');
      setIsConfigured(true);
      toast.success('Hugging Face configurado con Supabase', {
        description: 'El backend está listo para generar personajes'
      });
    }
  }, []);

  if (isConfigured) {
    return (
      <Card className="glass-card bg-green-500/10 border-green-500/20">
        <CardContent className="pt-6">
          <div className="flex items-center gap-2 text-green-400">
            <Server className="h-4 w-4" />
            <span className="text-sm">Hugging Face configurado con Supabase Backend</span>
          </div>
          <p className="text-xs text-gray-400 mt-2">
            Las imágenes se generan a través de Edge Functions seguras
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="glass-card bg-blue-500/10 border-blue-500/20">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Key className="h-5 w-5" />
          Configuración con Supabase
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-sm text-gray-300">
          <p className="mb-2">Tu proyecto usa <strong>Supabase Edge Functions</strong> para generar personajes de forma segura.</p>
          <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-3 mt-3">
            <p className="text-xs text-blue-300">
              ✅ Backend configurado automáticamente<br/>
              ✅ API keys seguras en el servidor<br/>
              ✅ Sin límites de CORS
            </p>
          </div>
        </div>
        
        <Button 
          onClick={() => {
            setHuggingFaceApiKey('configured');
            setIsConfigured(true);
            toast.success('Configuración completada');
          }}
          className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:opacity-90"
        >
          Confirmar Configuración
        </Button>
      </CardContent>
    </Card>
  );
};

export default HuggingFaceApiKeyConfig;
