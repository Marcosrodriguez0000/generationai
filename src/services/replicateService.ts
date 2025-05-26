
// Pixar character generation service using Pollinations.ai
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

const DEFAULT_SETTINGS: PixarTransformSettings = {
  style: "pixar",
  strength: 0.8
};

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

export const transformToPixarFromForm = async (
  characterData: PixarCharacterData,
  settings: PixarTransformSettings = DEFAULT_SETTINGS
): Promise<string> => {
  console.log(`Generating Pixar character from form data using Pollinations.ai`);
  
  try {
    // Build professional prompt from form data
    const professionalPrompt = buildPixarPrompt(characterData);
    
    console.log("Built professional prompt:", professionalPrompt);
    
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
    
    const finalUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(professionalPrompt)}?${params.toString()}`;
    
    console.log("Generated Pixar character URL:", finalUrl);
    return finalUrl;
    
  } catch (error) {
    console.error("Error generating Pixar character:", error);
    throw new Error("No se pudo generar el personaje Pixar");
  }
};
