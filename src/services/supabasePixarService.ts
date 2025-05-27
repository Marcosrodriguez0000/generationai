
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://xvkzkbxngrbhhubkqnvx.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh2a3prYnhuZ3JiaGh1YmtxbnZ4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDcxNDM2MjQsImV4cCI6MjA2MjcxOTYyNH0.wRzoxVZ0jaOAvZ8Mh7EQUl5dFRc33NKqHHd3Aayk_fc';

export const supabase = createClient(supabaseUrl, supabaseKey);

export interface PixarCharacterData {
  name: string;
  age: string;
  gender: string;
  height: string;
  bodyType: string;
  skinTone: string;
  eyeColor: string;
  eyeShape: string;
  hairColor: string;
  hairStyle: string;
  facialExpression: string;
  outfit: string;
  accessories: string;
  shoes: string;
  personality: string;
  pose: string;
  background: string;
  lighting: string;
  pixarStyle: string;
  additionalDetails: string;
}

const buildPixarPrompt = (characterData: PixarCharacterData): string => {
  let prompt = "";
  
  // Descripción básica del personaje
  if (characterData.name) {
    prompt += `A ${characterData.age || 'young'} ${characterData.gender || 'person'} character named ${characterData.name}, `;
  } else {
    prompt += `A ${characterData.age || 'young'} ${characterData.gender || 'person'} character, `;
  }
  
  // Características físicas
  if (characterData.height || characterData.bodyType) {
    prompt += `${characterData.height ? characterData.height + ' height' : ''} ${characterData.bodyType ? 'with ' + characterData.bodyType + ' body type' : ''}, `;
  }
  
  if (characterData.skinTone) {
    prompt += `${characterData.skinTone} skin, `;
  }
  
  // Ojos y cabello
  if (characterData.eyeColor || characterData.eyeShape) {
    prompt += `${characterData.eyeShape ? characterData.eyeShape : 'beautiful'} ${characterData.eyeColor || 'expressive'} eyes, `;
  }
  
  if (characterData.hairColor || characterData.hairStyle) {
    prompt += `${characterData.hairColor || 'beautiful'} hair ${characterData.hairStyle ? 'styled as ' + characterData.hairStyle : ''}, `;
  }
  
  // Expresión facial
  if (characterData.facialExpression) {
    prompt += `${characterData.facialExpression}, `;
  }
  
  // Vestimenta
  if (characterData.outfit) {
    prompt += `wearing ${characterData.outfit}, `;
  }
  
  if (characterData.accessories) {
    prompt += `with ${characterData.accessories}, `;
  }
  
  if (characterData.shoes) {
    prompt += `${characterData.shoes} on feet, `;
  }
  
  // Pose y personalidad
  if (characterData.pose) {
    prompt += `${characterData.pose}, `;
  }
  
  if (characterData.personality) {
    prompt += `showing ${characterData.personality} personality, `;
  }
  
  // Fondo y entorno
  if (characterData.background) {
    prompt += `in ${characterData.background}, `;
  }
  
  if (characterData.lighting) {
    prompt += `with ${characterData.lighting}, `;
  }
  
  // Estilo Pixar específico
  const pixarStyleText = characterData.pixarStyle ? 
    `${characterData.pixarStyle} style, ` : 
    'Disney Pixar style, ';
  
  prompt += pixarStyleText;
  
  // Detalles adicionales
  if (characterData.additionalDetails) {
    prompt += `${characterData.additionalDetails}, `;
  }
  
  // Sufijos de calidad para Pixar
  prompt += 'pixar disney animation style, 3d cartoon character, high quality 3d rendering, smooth 3d animation, vibrant colors, professional disney animation, cute and detailed, masterpiece quality, perfect lighting, cinematic composition';
  
  return prompt.trim().replace(/,\s*$/, ''); // Eliminar coma final
};

export const generatePixarCharacterWithSupabase = async (
  characterData: PixarCharacterData
): Promise<string> => {
  console.log('🚀 Generando personaje Pixar con Supabase Edge Function');
  
  try {
    // Construir el prompt profesional
    const professionalPrompt = buildPixarPrompt(characterData);
    console.log('📝 Prompt construido:', professionalPrompt);
    
    // Llamar a la Edge Function de Supabase
    console.log('📤 Enviando request a Supabase Edge Function');
    const { data, error } = await supabase.functions.invoke('generate-pixar', {
      body: { 
        prompt: professionalPrompt,
        characterName: characterData.name
      }
    });
    
    console.log('📡 Respuesta de Supabase:', data, error);
    
    if (error) {
      console.error('❌ Error de Supabase Edge Function:', error);
      throw new Error(`Error ${error.message}`);
    }
    
    if (!data || !data.imageUrl) {
      console.error('❌ No se recibió URL de imagen de Supabase');
      throw new Error('No se pudo generar la imagen del personaje');
    }
    
    console.log('✅ Personaje Pixar generado exitosamente:', data.imageUrl);
    return data.imageUrl;
    
  } catch (error) {
    console.error('💥 Error completo al generar con Supabase:', error);
    throw error;
  }
};
