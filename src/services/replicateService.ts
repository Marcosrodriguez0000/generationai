
// Pixar character generation service using Supabase
export interface PixarTransformSettings {
  style: string;
  strength: number;
}

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

// Re-export desde el servicio de Supabase
export { generatePixarCharacterWithSupabase as transformToPixarFromForm } from './supabasePixarService';

const DEFAULT_SETTINGS: PixarTransformSettings = {
  style: "pixar",
  strength: 0.8
};

export const transformToPixar = async (
  characterDescription: string,
  settings: PixarTransformSettings = DEFAULT_SETTINGS
): Promise<string> => {
  console.log(`Generating Pixar character from description using Pollinations.ai`);
  
  try {
    // Create enhanced Pixar-style prompt with the user's description
    const enhancedPrompt = `${characterDescription}, pixar disney style, 3d cartoon character, disney pixar animation, colorful, vibrant colors, smooth 3d rendering, high quality, professional disney animation style, cute, detailed, masterpiece`;
    
    // Use Pollinations.ai text-to-image generation
    const params = new URLSearchParams({
      width: '512',
      height: '512',
      model: 'flux',
      enhance: 'true',
      nologo: 'true',
      private: 'true',
      seed: Math.floor(Math.random() * 1000000).toString()
    });
    
    const finalUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(enhancedPrompt)}?${params.toString()}`;
    
    console.log("Generated Pixar character URL:", finalUrl);
    return finalUrl;
    
  } catch (error) {
    console.error("Error generating Pixar character:", error);
    throw new Error("No se pudo generar el personaje Pixar");
  }
};
