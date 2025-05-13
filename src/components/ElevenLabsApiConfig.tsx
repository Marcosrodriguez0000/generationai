
import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Key } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Alert, AlertDescription } from './ui/alert';
import { validateApiKey } from '@/services/elevenLabsService';
import { toast } from "sonner";

interface ElevenLabsApiConfigProps {
  onApiKeyChange: (apiKey: string) => void;
  apiKey: string;
}

const ElevenLabsApiConfig: React.FC<ElevenLabsApiConfigProps> = ({ onApiKeyChange, apiKey }) => {
  const [inputKey, setInputKey] = useState(apiKey);
  const [isOpen, setIsOpen] = useState(false);
  const [isValidating, setIsValidating] = useState(false);

  const handleSave = async () => {
    if (!inputKey.trim()) {
      toast("Error", {
        description: "La API key no puede estar vacía",
      });
      return;
    }

    setIsValidating(true);
    try {
      const isValid = await validateApiKey(inputKey);
      
      if (isValid) {
        onApiKeyChange(inputKey);
        setIsOpen(false);
        toast("API Key guardada", {
          description: "Tu API Key de ElevenLabs ha sido guardada correctamente",
        });
      } else {
        toast("API Key inválida", {
          description: "La API Key proporcionada no es válida. Por favor, verifica e intenta nuevamente",
        });
      }
    } catch (error) {
      toast("Error", {
        description: "No se pudo validar la API Key. Por favor, intenta nuevamente",
      });
    } finally {
      setIsValidating(false);
    }
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="flex items-center gap-2">
          <Key className="h-4 w-4" />
          {apiKey ? "API Key de ElevenLabs Configurada" : "Configurar API Key de ElevenLabs"}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>API Key de ElevenLabs</DialogTitle>
          <DialogDescription>
            Introduce tu API key de ElevenLabs para clonar voces con IA.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <Alert>
            <AlertDescription>
              Para obtener una API key, regístrate en <a href="https://elevenlabs.io/" target="_blank" rel="noreferrer" className="text-blue-500 hover:underline">elevenlabs.io</a> y genera tu token en la sección de perfil.
            </AlertDescription>
          </Alert>
          
          <Input
            value={inputKey}
            onChange={(e) => setInputKey(e.target.value)}
            placeholder="Ingresa tu API key de ElevenLabs"
            className="w-full"
          />
        </div>
        
        <DialogFooter>
          <Button onClick={handleSave} disabled={!inputKey || isValidating}>
            {isValidating ? 'Validando...' : 'Guardar API Key'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ElevenLabsApiConfig;
