
import React, { useState } from 'react';
import { Save, Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from '@/lib/auth';
import { toast } from "sonner";

interface GeneratedTextDisplayProps {
  text: string | null;
  prompt: string;
  onSave: () => void;
}

const GeneratedTextDisplay = ({ text, prompt, onSave }: GeneratedTextDisplayProps) => {
  const { user } = useAuth();
  const [copied, setCopied] = useState(false);

  if (!text) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    toast.success("Texto copiado al portapapeles");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="my-12 max-w-3xl mx-auto">
      <h2 className="text-xl font-semibold text-center text-white mb-4">
        Tu texto generado
      </h2>
      <Card className="bg-[#13131e] border-white/10">
        <CardHeader>
          <CardTitle className="text-lg text-white">
            Prompt utilizado
          </CardTitle>
          <p className="text-gray-300 text-sm">
            {prompt}
          </p>
        </CardHeader>
        <CardContent>
          <div className="bg-[#0c0c14] p-5 rounded-lg border border-white/5 whitespace-pre-wrap">
            <p className="text-gray-200 leading-relaxed">
              {text}
            </p>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button
            onClick={handleCopy}
            variant="outline" 
            className="flex-1 bg-white/5 border-white/10 text-white hover:bg-white/10"
          >
            {copied ? <Check className="h-4 w-4 mr-2" /> : <Copy className="h-4 w-4 mr-2" />}
            {copied ? "¡Copiado!" : "Copiar texto"}
          </Button>
          
          {user && (
            <Button 
              onClick={onSave}
              className="flex-1 ml-3 bg-gradient-to-r from-neon-pink to-neon-blue text-white hover:opacity-90"
            >
              <Save className="h-4 w-4 mr-2" />
              Guardar
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
};

export default GeneratedTextDisplay;
