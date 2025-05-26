// CivitAI service for professional Pixar character generation via Supabase Edge Functions
export interface CivitAISettings {
  model: string;
  strength: number;
  steps: number;
  cfgScale: number;
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

// Supabase configuration
const SUPABASE_URL = "https://xvkzkbxngrbhhubkqnvx.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh2a3prYnhuZ3JiaGh1YmtxbnZ4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDcxNDM2MjQsImV4cCI6MjA2MjcxOTYyNH0.wRzoxVZ0jaOAvZ8Mh7EQUl5dFRc33NKqHHd3Aayk_fc";

// Supabase Edge Function URL
const EDGE_FUNCTION_URL = `${SUPABASE_URL}/functions/v1/generate-pixar-character`;

const DEFAULT_SETTINGS: CivitAISettings = {
  model: "pixar-3d-animation",
  strength: 0.8,
  steps: 30,
  cfgScale: 7.5
};

const buildCivitAIPrompt = (characterData: PixarCharacterData): string => {
  let prompt = "";
  
  // Prefijo profesional para CivitAI
  prompt += "masterpiece, best quality, professional Disney Pixar 3D character design, ";
  
  // Información básica del personaje
  if (characterData.name) {
    prompt += `character named "${characterData.name}", `;
  }
  
  // Edad y género con descriptores específicos de Pixar
  if (characterData.age && characterData.gender) {
    const ageDescriptors = {
      'bebé': 'adorable baby with large sparkling eyes and chubby cheeks',
      'niño pequeño': 'cute toddler with oversized head proportions typical of Pixar style',
      'niño': 'cheerful child with bright expressive features and innocent smile',
      'adolescente': 'teenage character with defined facial structure and confident expression',
      'joven adulto': 'young adult with mature facial features and dynamic personality',
      'adulto': 'adult character with well-defined features and sophisticated appearance',
      'adulto mayor': 'wise elder with distinguished features and gentle expression'
    };
    
    prompt += `${ageDescriptors[characterData.age as keyof typeof ageDescriptors] || characterData.age} ${characterData.gender}, `;
  }
  
  // Características físicas detalladas
  if (characterData.height) {
    const heightMap = {
      'muy bajo': 'very short with compact proportions',
      'bajo': 'short height with balanced body ratio',
      'promedio': 'average height with classic Pixar proportions',
      'alto': 'tall figure with elongated graceful limbs',
      'muy alto': 'very tall with striking presence'
    };
    prompt += `${heightMap[characterData.height as keyof typeof heightMap] || characterData.height}, `;
  }
  
  if (characterData.bodyType) {
    const bodyMap = {
      'delgado': 'slim athletic build with defined features',
      'atlético': 'strong athletic physique with confident posture',
      'promedio': 'average build with harmonious proportions',
      'robusto': 'sturdy robust build with powerful frame',
      'rechoncho': 'round cheerful body type with soft friendly features'
    };
    prompt += `${bodyMap[characterData.bodyType as keyof typeof bodyMap] || characterData.bodyType}, `;
  }
  
  if (characterData.skinTone) {
    const skinMap = {
      'muy claro': 'porcelain fair skin with rosy undertones',
      'claro': 'light skin with warm peachy glow',
      'medio': 'medium skin tone with golden highlights',
      'bronceado': 'sun-kissed bronzed skin with warm radiance',
      'oscuro': 'rich dark skin with beautiful luminosity',
      'muy oscuro': 'deep ebony skin with stunning richness'
    };
    prompt += `${skinMap[characterData.skinTone as keyof typeof skinMap] || characterData.skinTone}, `;
  }
  
  // Ojos muy expresivos (clave en Pixar)
  if (characterData.eyeColor || characterData.eyeShape) {
    const eyeShapeMap = {
      'grandes y redondos': 'large round expressive eyes with emotional depth',
      'almendrados': 'elegant almond-shaped eyes with graceful curves',
      'pequeños': 'small but intensely bright eyes with character',
      'rasgados': 'distinctive elongated eyes with unique charm',
      'expresivos': 'highly expressive eyes that convey deep emotion'
    };
    
    const eyeColorMap = {
      'azul': 'brilliant sapphire blue eyes that sparkle with life',
      'verde': 'emerald green eyes with mysterious depth',
      'marrón': 'warm chocolate brown eyes with golden flecks',
      'avellana': 'hazel eyes that shift between brown and green',
      'gris': 'striking silver-gray eyes with intensity',
      'negro': 'deep obsidian black eyes with warmth'
    };
    
    prompt += `${eyeShapeMap[characterData.eyeShape as keyof typeof eyeShapeMap] || 'beautiful'} ${eyeColorMap[characterData.eyeColor as keyof typeof eyeColorMap] || characterData.eyeColor} eyes, `;
  }
  
  // Cabello detallado
  if (characterData.hairColor || characterData.hairStyle) {
    const hairColorMap = {
      'rubio': 'golden blonde hair with natural shine',
      'castaño claro': 'light chestnut brown hair with warm tones',
      'castaño': 'rich medium brown hair with depth',
      'castaño oscuro': 'deep dark brown hair with subtle highlights',
      'negro': 'jet black hair with blue undertones',
      'pelirrojo': 'vibrant red hair with copper highlights',
      'blanco': 'pristine white hair with silver shimmer',
      'gris': 'distinguished gray hair with natural texture'
    };
    
    prompt += `${hairColorMap[characterData.hairColor as keyof typeof hairColorMap] || characterData.hairColor} hair `;
    if (characterData.hairStyle) {
      prompt += `styled as ${characterData.hairStyle}, `;
    }
  }
  
  // Expresión facial
  if (characterData.facialExpression) {
    const expressionMap = {
      'sonriendo alegremente': 'beaming with genuine joy and crinkled happy eyes',
      'riendo': 'laughing heartily with open mouth and sparkling eyes',
      'serio': 'serious and focused with determined expression',
      'pensativo': 'thoughtful and contemplative with slight furrow',
      'sorprendido': 'surprised with wide eyes and slightly open mouth',
      'determinado': 'determined and confident with strong jawline',
      'amigable': 'warm and approachable with gentle smile'
    };
    prompt += `${expressionMap[characterData.facialExpression as keyof typeof expressionMap] || characterData.facialExpression}, `;
  }
  
  // Vestimenta
  if (characterData.outfit) {
    prompt += `wearing ${characterData.outfit} with detailed fabric textures, `;
  }
  
  if (characterData.accessories) {
    prompt += `accessorized with ${characterData.accessories}, `;
  }
  
  if (characterData.shoes) {
    prompt += `${characterData.shoes} with detailed design, `;
  }
  
  // Pose y personalidad
  if (characterData.pose) {
    const poseMap = {
      'de pie con los brazos en las caderas': 'standing confidently with hands on hips in heroic stance',
      'caminando alegremente': 'walking with bouncy energetic step',
      'saltando de alegría': 'mid-jump with arms raised in celebration',
      'sentado relajado': 'sitting comfortably with relaxed natural posture',
      'corriendo': 'running dynamically with hair and clothes flowing',
      'saludando': 'waving cheerfully with bright welcoming expression',
      'pensando': 'in thoughtful pose with hand thoughtfully placed'
    };
    prompt += `${poseMap[characterData.pose as keyof typeof poseMap] || characterData.pose}, `;
  }
  
  if (characterData.personality) {
    prompt += `embodying ${characterData.personality} personality through body language, `;
  }
  
  // Entorno
  if (characterData.background) {
    prompt += `set in ${characterData.background} with detailed environmental elements, `;
  }
  
  if (characterData.lighting) {
    const lightingMap = {
      'luz natural brillante': 'bright natural daylight with soft shadows',
      'luz dorada suave': 'warm golden hour lighting with soft glow',
      'luz mágica': 'magical ethereal lighting with sparkles',
      'atardecer cálido': 'warm sunset lighting with orange and pink hues',
      'luz de estudio': 'professional studio lighting with perfect illumination'
    };
    prompt += `illuminated by ${lightingMap[characterData.lighting as keyof typeof lightingMap] || characterData.lighting}, `;
  }
  
  // Estilo Pixar específico
  if (characterData.pixarStyle) {
    const styleMap = {
      'Toy Story': 'in classic Toy Story animation style with toy-like textures',
      'Monsters Inc': 'in Monsters Inc style with furry detailed textures',
      'Finding Nemo': 'in Finding Nemo underwater style with flowing elements',
      'The Incredibles': 'in The Incredibles superhero style with dynamic energy',
      'Inside Out': 'in Inside Out emotional style with expressive features',
      'Coco': 'in Coco vibrant Mexican-inspired style with rich colors',
      'Frozen': 'in Frozen magical winter style with crystalline details',
      'Turning Red': 'in Turning Red modern style with contemporary elements',
      'Luca': 'in Luca Italian coastal style with Mediterranean warmth',
      'general Disney Pixar': 'in signature Disney Pixar animation style'
    };
    prompt += `${styleMap[characterData.pixarStyle as keyof typeof styleMap] || 'in Disney Pixar style'}, `;
  }
  
  // Detalles adicionales
  if (characterData.additionalDetails) {
    prompt += `${characterData.additionalDetails}, `;
  }
  
  // Sufijos técnicos para máxima calidad en CivitAI
  prompt += 'rendered in professional Pixar quality 3D animation, subsurface scattering, detailed facial rigging, perfect topology, industry-standard character modeling, photorealistic materials with cartoon stylization, advanced lighting setup, cinematic composition, 8K resolution, perfect anatomy, flawless proportions, studio-quality rendering, award-winning animation style, volumetric lighting, global illumination';
  
  return prompt.trim().replace(/,\s*$/, '');
};

export const generatePixarCharacter = async (
  characterData: PixarCharacterData,
  settings: CivitAISettings = DEFAULT_SETTINGS
): Promise<string> => {
  console.log('🚀 Generando personaje Pixar con CivitAI via Supabase Edge Function');
  
  // Construir prompt profesional
  const professionalPrompt = buildCivitAIPrompt(characterData);
  console.log('📝 Prompt construido:', professionalPrompt);
  
  try {
    console.log('📤 Enviando request a Supabase Edge Function');
    
    const response = await fetch(EDGE_FUNCTION_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
        'apikey': SUPABASE_ANON_KEY,
      },
      body: JSON.stringify({
        prompt: professionalPrompt,
        settings: settings
      })
    });

    console.log('📡 Respuesta de Edge Function:', response.status, response.statusText);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ Error de Edge Function:', response.status, errorText);
      throw new Error(`Error ${response.status}: ${errorText}`);
    }

    const result = await response.json();
    console.log('✅ Respuesta completa de CivitAI via Edge Function:', result);
    
    // Procesar respuesta de CivitAI
    if (result.images && result.images.length > 0) {
      console.log('🎨 Imagen generada con CivitAI:', result.images[0].url);
      return result.images[0].url;
    } else if (result.image) {
      console.log('🎨 Imagen generada con CivitAI:', result.image);
      return result.image;
    } else {
      throw new Error('CivitAI no devolvió una imagen válida');
    }
    
  } catch (error) {
    console.error('💥 Error completo al generar con CivitAI:', error);
    throw error;
  }
};

export const generatePixarFromText = async (
  description: string,
  settings: CivitAISettings = DEFAULT_SETTINGS
): Promise<string> => {
  console.log('🚀 Generando personaje Pixar desde texto via Edge Function');
  
  const enhancedPrompt = `Professional Disney Pixar 3D character: ${description}, rendered in signature Pixar animation style, 3D cartoon character with subsurface scattering, detailed facial features, perfect topology, industry-standard modeling, photorealistic materials with cartoon stylization, advanced lighting, masterpiece quality, 8K resolution, cinematic composition, volumetric lighting, award-winning animation`;
  
  try {
    const response = await fetch(EDGE_FUNCTION_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
        'apikey': SUPABASE_ANON_KEY,
      },
      body: JSON.stringify({
        prompt: enhancedPrompt,
        settings: settings
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Error ${response.status}: ${errorText}`);
    }

    const result = await response.json();
    
    if (result.images && result.images.length > 0) {
      return result.images[0].url;
    } else if (result.image) {
      return result.image;
    } else {
      throw new Error('No se pudo generar la imagen');
    }
    
  } catch (error) {
    console.error('💥 Error en generatePixarFromText:', error);
    throw error;
  }
};

export const transformImageToPixar = async (
  imageUrl: string,
  settings: CivitAISettings = DEFAULT_SETTINGS
): Promise<string> => {
  console.log('🚀 Transformando imagen a estilo Pixar via Edge Function');
  
  const transformPrompt = `Transform this person into a Disney Pixar 3D animated character, maintain facial features and expression, professional Pixar animation style, 3D cartoon rendering, subsurface scattering, detailed character design, perfect topology, industry-standard animation quality, photorealistic materials with cartoon stylization, advanced lighting, masterpiece quality`;
  
  try {
    const response = await fetch(EDGE_FUNCTION_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
        'apikey': SUPABASE_ANON_KEY,
      },
      body: JSON.stringify({
        prompt: transformPrompt,
        settings: {
          ...settings,
          init_images: [imageUrl]
        }
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Error ${response.status}: ${errorText}`);
    }

    const result = await response.json();
    
    if (result.images && result.images.length > 0) {
      return result.images[0].url;
    } else if (result.image) {
      return result.image;
    } else {
      throw new Error('No se pudo transformar la imagen');
    }
    
  } catch (error) {
    console.error('💥 Error en transformImageToPixar:', error);
    throw error;
  }
};
