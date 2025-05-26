
import React from 'react';
import { Button } from './ui/button';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Sparkles } from 'lucide-react';

export interface PixarCharacterData {
  // Información básica
  name: string;
  age: string;
  gender: string;
  
  // Características físicas
  height: string;
  bodyType: string;
  skinTone: string;
  
  // Rostro y cabello
  eyeColor: string;
  eyeShape: string;
  hairColor: string;
  hairStyle: string;
  facialExpression: string;
  
  // Vestimenta y accesorios
  outfit: string;
  accessories: string;
  shoes: string;
  
  // Personalidad y pose
  personality: string;
  pose: string;
  
  // Entorno y fondo
  background: string;
  lighting: string;
  
  // Estilo y calidad
  pixarStyle: string;
  additionalDetails: string;
}

interface PixarCharacterFormProps {
  characterData: PixarCharacterData;
  onCharacterChange: (data: PixarCharacterData) => void;
  onGenerate: () => void;
  isGenerating: boolean;
}

const PixarCharacterForm = ({ 
  characterData, 
  onCharacterChange, 
  onGenerate, 
  isGenerating 
}: PixarCharacterFormProps) => {
  
  const updateField = (field: keyof PixarCharacterData, value: string) => {
    onCharacterChange({
      ...characterData,
      [field]: value
    });
  };

  const isFormValid = () => {
    return characterData.name && characterData.age && characterData.gender;
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-white mb-2">Diseña tu Personaje Pixar</h2>
        <p className="text-gray-300">Completa los detalles para crear un personaje único y detallado</p>
      </div>

      {/* Información Básica */}
      <Card className="glass-card bg-black/20 border-white/10">
        <CardHeader>
          <CardTitle className="text-white">Información Básica</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label className="text-white">Nombre del personaje</Label>
              <Input
                value={characterData.name}
                onChange={(e) => updateField('name', e.target.value)}
                placeholder="Ej: Ana, Carlos, Luna..."
                className="bg-black/50 border-purple-500/30 text-white"
              />
            </div>
            <div>
              <Label className="text-white">Edad</Label>
              <Select value={characterData.age} onValueChange={(value) => updateField('age', value)}>
                <SelectTrigger className="bg-black/50 border-purple-500/30 text-white">
                  <SelectValue placeholder="Selecciona edad" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="bebé">Bebé (0-2 años)</SelectItem>
                  <SelectItem value="niño pequeño">Niño pequeño (3-6 años)</SelectItem>
                  <SelectItem value="niño">Niño (7-12 años)</SelectItem>
                  <SelectItem value="adolescente">Adolescente (13-17 años)</SelectItem>
                  <SelectItem value="joven adulto">Joven adulto (18-30 años)</SelectItem>
                  <SelectItem value="adulto">Adulto (31-50 años)</SelectItem>
                  <SelectItem value="adulto mayor">Adulto mayor (50+ años)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-white">Género</Label>
              <Select value={characterData.gender} onValueChange={(value) => updateField('gender', value)}>
                <SelectTrigger className="bg-black/50 border-purple-500/30 text-white">
                  <SelectValue placeholder="Selecciona género" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="femenino">Femenino</SelectItem>
                  <SelectItem value="masculino">Masculino</SelectItem>
                  <SelectItem value="no binario">No binario</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Características Físicas */}
      <Card className="glass-card bg-black/20 border-white/10">
        <CardHeader>
          <CardTitle className="text-white">Características Físicas</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label className="text-white">Altura</Label>
              <Select value={characterData.height} onValueChange={(value) => updateField('height', value)}>
                <SelectTrigger className="bg-black/50 border-purple-500/30 text-white">
                  <SelectValue placeholder="Altura" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="muy bajo">Muy bajo</SelectItem>
                  <SelectItem value="bajo">Bajo</SelectItem>
                  <SelectItem value="promedio">Promedio</SelectItem>
                  <SelectItem value="alto">Alto</SelectItem>
                  <SelectItem value="muy alto">Muy alto</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-white">Tipo de cuerpo</Label>
              <Select value={characterData.bodyType} onValueChange={(value) => updateField('bodyType', value)}>
                <SelectTrigger className="bg-black/50 border-purple-500/30 text-white">
                  <SelectValue placeholder="Tipo de cuerpo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="delgado">Delgado</SelectItem>
                  <SelectItem value="atlético">Atlético</SelectItem>
                  <SelectItem value="promedio">Promedio</SelectItem>
                  <SelectItem value="robusto">Robusto</SelectItem>
                  <SelectItem value="rechoncho">Rechoncho</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-white">Tono de piel</Label>
              <Select value={characterData.skinTone} onValueChange={(value) => updateField('skinTone', value)}>
                <SelectTrigger className="bg-black/50 border-purple-500/30 text-white">
                  <SelectValue placeholder="Tono de piel" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="muy claro">Muy claro</SelectItem>
                  <SelectItem value="claro">Claro</SelectItem>
                  <SelectItem value="medio">Medio</SelectItem>
                  <SelectItem value="bronceado">Bronceado</SelectItem>
                  <SelectItem value="oscuro">Oscuro</SelectItem>
                  <SelectItem value="muy oscuro">Muy oscuro</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Rostro y Cabello */}
      <Card className="glass-card bg-black/20 border-white/10">
        <CardHeader>
          <CardTitle className="text-white">Rostro y Cabello</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label className="text-white">Color de ojos</Label>
              <Select value={characterData.eyeColor} onValueChange={(value) => updateField('eyeColor', value)}>
                <SelectTrigger className="bg-black/50 border-purple-500/30 text-white">
                  <SelectValue placeholder="Color de ojos" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="azul">Azul</SelectItem>
                  <SelectItem value="verde">Verde</SelectItem>
                  <SelectItem value="marrón">Marrón</SelectItem>
                  <SelectItem value="avellana">Avellana</SelectItem>
                  <SelectItem value="gris">Gris</SelectItem>
                  <SelectItem value="negro">Negro</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-white">Forma de ojos</Label>
              <Select value={characterData.eyeShape} onValueChange={(value) => updateField('eyeShape', value)}>
                <SelectTrigger className="bg-black/50 border-purple-500/30 text-white">
                  <SelectValue placeholder="Forma de ojos" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="grandes y redondos">Grandes y redondos</SelectItem>
                  <SelectItem value="almendrados">Almendrados</SelectItem>
                  <SelectItem value="pequeños">Pequeños</SelectItem>
                  <SelectItem value="rasgados">Rasgados</SelectItem>
                  <SelectItem value="expresivos">Expresivos</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-white">Color de cabello</Label>
              <Select value={characterData.hairColor} onValueChange={(value) => updateField('hairColor', value)}>
                <SelectTrigger className="bg-black/50 border-purple-500/30 text-white">
                  <SelectValue placeholder="Color de cabello" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="rubio">Rubio</SelectItem>
                  <SelectItem value="castaño claro">Castaño claro</SelectItem>
                  <SelectItem value="castaño">Castaño</SelectItem>
                  <SelectItem value="castaño oscuro">Castaño oscuro</SelectItem>
                  <SelectItem value="negro">Negro</SelectItem>
                  <SelectItem value="pelirrojo">Pelirrojo</SelectItem>
                  <SelectItem value="blanco">Blanco</SelectItem>
                  <SelectItem value="gris">Gris</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-white">Estilo de cabello</Label>
              <Input
                value={characterData.hairStyle}
                onChange={(e) => updateField('hairStyle', e.target.value)}
                placeholder="Ej: largo y rizado, corto y liso, coletas..."
                className="bg-black/50 border-purple-500/30 text-white"
              />
            </div>
          </div>
          <div>
            <Label className="text-white">Expresión facial</Label>
            <Select value={characterData.facialExpression} onValueChange={(value) => updateField('facialExpression', value)}>
              <SelectTrigger className="bg-black/50 border-purple-500/30 text-white">
                <SelectValue placeholder="Expresión facial" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="sonriendo alegremente">Sonriendo alegremente</SelectItem>
                <SelectItem value="riendo">Riendo</SelectItem>
                <SelectItem value="serio">Serio</SelectItem>
                <SelectItem value="pensativo">Pensativo</SelectItem>
                <SelectItem value="sorprendido">Sorprendido</SelectItem>
                <SelectItem value="determinado">Determinado</SelectItem>
                <SelectItem value="amigable">Amigable</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Vestimenta */}
      <Card className="glass-card bg-black/20 border-white/10">
        <CardHeader>
          <CardTitle className="text-white">Vestimenta y Accesorios</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label className="text-white">Outfit principal</Label>
            <Textarea
              value={characterData.outfit}
              onChange={(e) => updateField('outfit', e.target.value)}
              placeholder="Describe la ropa del personaje: colores, estilo, tipo de prendas..."
              className="bg-black/50 border-purple-500/30 text-white min-h-[80px]"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label className="text-white">Accesorios</Label>
              <Input
                value={characterData.accessories}
                onChange={(e) => updateField('accessories', e.target.value)}
                placeholder="Ej: gafas, sombrero, collar, mochila..."
                className="bg-black/50 border-purple-500/30 text-white"
              />
            </div>
            <div>
              <Label className="text-white">Calzado</Label>
              <Input
                value={characterData.shoes}
                onChange={(e) => updateField('shoes', e.target.value)}
                placeholder="Ej: zapatillas rojas, botas, sandalias..."
                className="bg-black/50 border-purple-500/30 text-white"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Personalidad y Pose */}
      <Card className="glass-card bg-black/20 border-white/10">
        <CardHeader>
          <CardTitle className="text-white">Personalidad y Pose</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label className="text-white">Personalidad</Label>
            <Textarea
              value={characterData.personality}
              onChange={(e) => updateField('personality', e.target.value)}
              placeholder="Describe la personalidad: alegre, aventurero, tímido, valiente..."
              className="bg-black/50 border-purple-500/30 text-white min-h-[60px]"
            />
          </div>
          <div>
            <Label className="text-white">Pose y posición</Label>
            <Select value={characterData.pose} onValueChange={(value) => updateField('pose', value)}>
              <SelectTrigger className="bg-black/50 border-purple-500/30 text-white">
                <SelectValue placeholder="Pose del personaje" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="de pie con los brazos en las caderas">De pie con los brazos en las caderas</SelectItem>
                <SelectItem value="caminando alegremente">Caminando alegremente</SelectItem>
                <SelectItem value="saltando de alegría">Saltando de alegría</SelectItem>
                <SelectItem value="sentado relajado">Sentado relajado</SelectItem>
                <SelectItem value="corriendo">Corriendo</SelectItem>
                <SelectItem value="saludando">Saludando</SelectItem>
                <SelectItem value="pensando">Pensando</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Entorno */}
      <Card className="glass-card bg-black/20 border-white/10">
        <CardHeader>
          <CardTitle className="text-white">Entorno y Fondo</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label className="text-white">Fondo y escenario</Label>
            <Textarea
              value={characterData.background}
              onChange={(e) => updateField('background', e.target.value)}
              placeholder="Describe el fondo: parque, habitación, bosque mágico, ciudad..."
              className="bg-black/50 border-purple-500/30 text-white min-h-[80px]"
            />
          </div>
          <div>
            <Label className="text-white">Iluminación</Label>
            <Select value={characterData.lighting} onValueChange={(value) => updateField('lighting', value)}>
              <SelectTrigger className="bg-black/50 border-purple-500/30 text-white">
                <SelectValue placeholder="Tipo de iluminación" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="luz natural brillante">Luz natural brillante</SelectItem>
                <SelectItem value="luz dorada suave">Luz dorada suave</SelectItem>
                <SelectItem value="luz mágica">Luz mágica</SelectItem>
                <SelectItem value="atardecer cálido">Atardecer cálido</SelectItem>
                <SelectItem value="luz de estudio">Luz de estudio</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Estilo Pixar */}
      <Card className="glass-card bg-black/20 border-white/10">
        <CardHeader>
          <CardTitle className="text-white">Estilo Pixar</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label className="text-white">Estilo específico de Pixar</Label>
            <Select value={characterData.pixarStyle} onValueChange={(value) => updateField('pixarStyle', value)}>
              <SelectTrigger className="bg-black/50 border-purple-500/30 text-white">
                <SelectValue placeholder="Estilo de película" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Toy Story">Toy Story</SelectItem>
                <SelectItem value="Monsters Inc">Monsters Inc</SelectItem>
                <SelectItem value="Finding Nemo">Finding Nemo</SelectItem>
                <SelectItem value="The Incredibles">The Incredibles</SelectItem>
                <SelectItem value="Inside Out">Inside Out</SelectItem>
                <SelectItem value="Coco">Coco</SelectItem>
                <SelectItem value="Frozen">Frozen</SelectItem>
                <SelectItem value="Turning Red">Turning Red</SelectItem>
                <SelectItem value="Luca">Luca</SelectItem>
                <SelectItem value="general Disney Pixar">General Disney Pixar</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label className="text-white">Detalles adicionales</Label>
            <Textarea
              value={characterData.additionalDetails}
              onChange={(e) => updateField('additionalDetails', e.target.value)}
              placeholder="Cualquier detalle especial que quieras añadir..."
              className="bg-black/50 border-purple-500/30 text-white min-h-[60px]"
            />
          </div>
        </CardContent>
      </Card>

      {/* Botón de generar */}
      <Button 
        onClick={onGenerate}
        disabled={isGenerating || !isFormValid()}
        className="w-full bg-gradient-to-r from-neon-pink to-neon-blue text-white py-6 px-8 hover:opacity-90 rounded-xl animate-glow"
      >
        {isGenerating ? (
          <span className="flex items-center gap-2">
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Generando personaje...
          </span>
        ) : (
          <span className="flex items-center gap-2">
            <Sparkles className="h-5 w-5" />
            Generar Personaje Pixar
          </span>
        )}
      </Button>
    </div>
  );
};

export default PixarCharacterForm;
