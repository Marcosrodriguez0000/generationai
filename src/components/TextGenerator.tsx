
import React, { useState } from 'react';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from './ui/card';
import { Sparkles } from 'lucide-react';
import { toast } from 'sonner';
import ApiKeyInput from './ApiKeyInput';

const TextGenerator = () => {
  const [prompt, setPrompt] = useState('');
  const [generatedText, setGeneratedText] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [apiKey, setApiKey] = useState('');

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    if (!apiKey) {
      toast.error('API Key requerida', {
        description: 'Por favor configura tu API Key primero',
      });
      return;
    }

    setIsGenerating(true);
    
    try {
      toast('Generando texto...', {
        description: 'Esto puede tomar unos segundos.',
      });
      
      // Simulate text generation (replace with actual API call)
      setTimeout(() => {
        // Example generated text
        const dummyText = `Basado en tu prompt: "${prompt}"\n\n` +
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tincidunt, ' +
          'eros ac ultricies pellentesque, justo urna venenatis nulla, at interdum ' +
          'tortor mauris id nisi. Nulla facilisi. Aenean euismod, nisl sed cursus ' +
          'gravida, magna lorem interdum libero, vel hendrerit nibh libero vel nunc.';
          
        setGeneratedText(dummyText);
        setIsGenerating(false);
        
        toast.success('¡Texto generado exitosamente!', {
          description: 'Tu texto ha sido creado.',
        });
      }, 2000);
    } catch (error) {
      console.error('Error generating text:', error);
      toast.error('Error al generar el texto', {
        description: 'Ha ocurrido un error. Por favor intenta nuevamente.',
      });
      setIsGenerating(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-neon-pink to-neon-blue mb-6">
          Generador de Texto AI
        </h1>
        <p className="text-gray-300 text-lg mb-8">
          Ingresa un prompt y deja que la IA genere texto increíble para ti
        </p>
      </div>
      
      <Card className="glass-card bg-black/20 border border-white/5 backdrop-blur-lg">
        <CardHeader>
          <CardTitle>Crear nuevo texto</CardTitle>
          <CardDescription>
            Describe lo que quieres generar y la IA hará el resto
          </CardDescription>
          <div className="flex justify-end">
            <ApiKeyInput 
              onApiKeyChange={setApiKey}
              apiKey={apiKey}
            />
          </div>
        </CardHeader>
        <CardContent>
          <Textarea
            placeholder="Escribe tu prompt aquí..."
            className="min-h-[150px] bg-black/30 border-neon-blue/20"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button
            onClick={handleGenerate}
            disabled={!prompt.trim() || isGenerating}
            className="bg-gradient-to-r from-neon-pink to-neon-blue text-white hover:opacity-90"
          >
            {isGenerating ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Generando...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <Sparkles className="h-5 w-5" />
                Generar Texto
              </span>
            )}
          </Button>
        </CardFooter>
      </Card>
      
      {generatedText && (
        <Card className="glass-card bg-black/20 border border-white/5 backdrop-blur-lg">
          <CardHeader>
            <CardTitle>Texto Generado</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-black/30 rounded-md p-4 whitespace-pre-wrap">
              {generatedText}
            </div>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button
              variant="outline"
              onClick={() => {
                navigator.clipboard.writeText(generatedText);
                toast.success('Texto copiado al portapapeles');
              }}
            >
              Copiar al portapapeles
            </Button>
          </CardFooter>
        </Card>
      )}
    </div>
  );
};

export default TextGenerator;
