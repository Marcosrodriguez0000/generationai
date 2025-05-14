
import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Key } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Alert, AlertDescription } from './ui/alert';

interface ApiKeyInputProps {
  onApiKeyChange: (apiKey: string) => void;
  apiKey: string;
}

const ApiKeyInput: React.FC<ApiKeyInputProps> = ({ onApiKeyChange, apiKey }) => {
  const [inputKey, setInputKey] = useState(apiKey);
  const [isOpen, setIsOpen] = useState(false);

  const handleSave = () => {
    onApiKeyChange(inputKey);
    setIsOpen(false);
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="flex items-center gap-2">
          <Key className="h-4 w-4" />
          {apiKey ? "API Key Configurada" : "Configurar API Key"}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>API Key de Stability AI</DialogTitle>
          <DialogDescription>
            Introduce tu API key de Stability AI para generar videos.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <Alert>
            <AlertDescription>
              Para obtener una API key, visita <a href="https://platform.stability.ai/account/keys" target="_blank" rel="noreferrer" className="text-blue-500 hover:underline">stability.ai</a> y regístrate para obtener tu token.
            </AlertDescription>
          </Alert>
          
          <Input
            value={inputKey}
            onChange={(e) => setInputKey(e.target.value)}
            placeholder="sk-..."
            className="w-full"
          />
        </div>
        
        <DialogFooter>
          <Button onClick={handleSave} disabled={!inputKey}>Guardar API Key</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ApiKeyInput;
