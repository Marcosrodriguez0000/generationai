
// CivitAI service for professional Pixar character generation
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

// API Key de CivitAI
const CIVITAI_API_KEY = "1db6809804be39e014dc2b306bba5fc1";

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

// Función temporal que genera imagen usando Pollinations pero con prompts optimizados para Pixar
const generateWithPollinations = async (prompt: string): Promise<string> => {
  console.log('🔄 USANDO POLLINATIONS temporalmente debido a problemas con CivitAI API');
  
  // Optimizar prompt para Pollinations con enfoque Pixar
  const optimizedPrompt = `Disney Pixar 3D animated character style, ${prompt}, professional 3D animation quality, Pixar studio rendering, cartoon character design`;
  
  const encodedPrompt = encodeURIComponent(optimizedPrompt);
  const imageUrl = `https://image.pollinations.ai/prompt/${encodedPrompt}?width=768&height=768&seed=${Math.floor(Math.random() * 1000000)}&enhance=true&model=flux`;
  
  console.log('✅ Imagen generada con Pollinations (temporal):', imageUrl);
  return imageUrl;
};

export const generatePixarCharacter = async (
  characterData: PixarCharacterData,
  settings: CivitAISettings = DEFAULT_SETTINGS
): Promise<string> => {
  console.log('🚀 Intentando generar personaje Pixar con CivitAI API');
  
  // Construir prompt profesional
  const professionalPrompt = buildCivitAIPrompt(characterData);
  console.log('📝 Prompt construido:', professionalPrompt);
  
  const requestBody = {
    prompt: professionalPrompt,
    negativePrompt: "low quality, blurry, distorted, ugly, malformed, extra limbs, missing limbs, poor anatomy, bad proportions, worst quality, jpeg artifacts",
    width: 768,
    height: 768,
    steps: settings.steps,
    cfg_scale: settings.cfgScale,
    sampler_name: "DPM++ 2M Karras",
    seed: Math.floor(Math.random() * 1000000),
    batch_size: 1
  };
  
  console.log('📤 Enviando request a CivitAI con body:', requestBody);
  
  try {
    // Intentar API de CivitAI con mejor configuración
    const response = await fetch('https://civitai.com/api/v1/images/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${CIVITAI_API_KEY}`,
        'User-Agent': 'PixarGenerator/1.0'
      },
      body: JSON.stringify(requestBody)
    });

    console.log('📡 Respuesta de CivitAI:', response.status, response.statusText);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ Error de CivitAI API:', response.status, errorText);
      
      // Si CivitAI falla, usar Pollinations temporalmente
      console.log('🔄 CivitAI falló, usando Pollinations como respaldo');
      return await generateWithPollinations(professionalPrompt);
    }

    const result = await response.json();
    console.log('✅ Respuesta completa de CivitAI:', result);
    
    // Procesar respuesta de CivitAI
    if (result.images && result.images.length > 0) {
      console.log('🎨 Imagen generada con CivitAI:', result.images[0].url);
      return result.images[0].url;
    } else if (result.image) {
      console.log('🎨 Imagen generada con CivitAI:', result.image);
      return result.image;
    } else {
      console.log('⚠️ CivitAI no devolvió imagen válida, usando Pollinations');
      return await generateWithPollinations(professionalPrompt);
    }
    
  } catch (error) {
    console.error('💥 Error completo en CivitAI:', error);
    console.log('🔄 Usando Pollinations debido al error');
    return await generateWithPollinations(professionalPrompt);
  }
};

export const generatePixarFromText = async (
  description: string,
  settings: CivitAISettings = DEFAULT_SETTINGS
): Promise<string> => {
  console.log('🚀 Generando personaje Pixar desde texto');
  
  const enhancedPrompt = `Professional Disney Pixar 3D character: ${description}, rendered in signature Pixar animation style, 3D cartoon character with subsurface scattering, detailed facial features, perfect topology, industry-standard modeling, photorealistic materials with cartoon stylization, advanced lighting, masterpiece quality, 8K resolution, cinematic composition, volumetric lighting, award-winning animation`;
  
  try {
    const response = await fetch('https://civitai.com/api/v1/images/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${CIVITAI_API_KEY}`,
        'User-Agent': 'PixarGenerator/1.0'
      },
      body: JSON.stringify({
        prompt: enhancedPrompt,
        negativePrompt: "low quality, blurry, distorted, ugly, malformed, extra limbs, missing limbs, poor anatomy, bad proportions",
        width: 768,
        height: 768,
        steps: settings.steps,
        cfg_scale: settings.cfgScale,
        sampler_name: "DPM++ 2M Karras",
        seed: Math.floor(Math.random() * 1000000),
        batch_size: 1
      })
    });

    if (!response.ok) {
      console.error('❌ Error en CivitAI, usando Pollinations');
      return await generateWithPollinations(enhancedPrompt);
    }

    const result = await response.json();
    
    if (result.images && result.images.length > 0) {
      return result.images[0].url;
    } else if (result.image) {
      return result.image;
    } else {
      return await generateWithPollinations(enhancedPrompt);
    }
    
  } catch (error) {
    console.error('💥 Error en generatePixarFromText:', error);
    return await generateWithPollinations(enhancedPrompt);
  }
};

export const transformImageToPixar = async (
  imageUrl: string,
  settings: CivitAISettings = DEFAULT_SETTINGS
): Promise<string> => {
  console.log('🚀 Transformando imagen a estilo Pixar');
  
  const transformPrompt = `Transform this person into a Disney Pixar 3D animated character, maintain facial features and expression, professional Pixar animation style, 3D cartoon rendering, subsurface scattering, detailed character design, perfect topology, industry-standard animation quality, photorealistic materials with cartoon stylization, advanced lighting, masterpiece quality`;
  
  try {
    const response = await fetch('https://civitai.com/api/v1/images/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${CIVITAI_API_KEY}`,
        'User-Agent': 'PixarGenerator/1.0'
      },
      body: JSON.stringify({
        prompt: transformPrompt,
        negativePrompt: "low quality, blurry, distorted, ugly, malformed, extra limbs, missing limbs, poor anatomy, bad proportions",
        width: 768,
        height: 768,
        steps: settings.steps,
        cfg_scale: settings.cfgScale,
        denoising_strength: settings.strength,
        init_images: [imageUrl],
        sampler_name: "DPM++ 2M Karras",
        seed: Math.floor(Math.random() * 1000000),
        batch_size: 1
      })
    });

    if (!response.ok) {
      console.error('❌ Error en transformImageToPixar, usando Pollinations');
      return await generateWithPollinations(transformPrompt);
    }

    const result = await response.json();
    
    if (result.images && result.images.length > 0) {
      return result.images[0].url;
    } else if (result.image) {
      return result.image;
    } else {
      return await generateWithPollinations(transformPrompt);
    }
    
  } catch (error) {
    console.error('💥 Error en transformImageToPixar:', error);
    return await generateWithPollinations(transformPrompt);
  }
};
