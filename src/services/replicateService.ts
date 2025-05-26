
// Pixar character generation service using Pollinations.ai with advanced prompting
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

const buildAdvancedPixarPrompt = (characterData: PixarCharacterData): string => {
  let prompt = "";
  
  // Prefijo técnico para mayor calidad
  prompt += "Professional Disney Pixar 3D character design, ";
  
  // Descripción detallada del personaje
  if (characterData.name) {
    prompt += `character named "${characterData.name}", `;
  }
  
  // Edad y género con características específicas de Pixar
  if (characterData.age && characterData.gender) {
    const ageDescriptors = {
      'bebé': 'baby with large round eyes and chubby cheeks',
      'niño pequeño': 'toddler with oversized head proportions and innocent expression',
      'niño': 'child with bright expressive features and youthful energy',
      'adolescente': 'teenager with defined facial structure and confident posture',
      'joven adulto': 'young adult with mature facial features and dynamic expression',
      'adulto': 'adult with well-defined character lines and sophisticated appearance',
      'adulto mayor': 'elder with distinguished features, wisdom lines, and gentle expression'
    };
    
    prompt += `${ageDescriptors[characterData.age as keyof typeof ageDescriptors] || characterData.age} ${characterData.gender}, `;
  }
  
  // Características físicas detalladas
  if (characterData.height) {
    const heightMap = {
      'muy bajo': 'very short stature with compact proportions',
      'bajo': 'short height with well-balanced body ratio',
      'promedio': 'average height with standard Pixar proportions',
      'alto': 'tall figure with elongated limbs',
      'muy alto': 'very tall with dramatic height difference'
    };
    prompt += `${heightMap[characterData.height as keyof typeof heightMap] || characterData.height}, `;
  }
  
  if (characterData.bodyType) {
    const bodyMap = {
      'delgado': 'slim and lean body type with defined features',
      'atlético': 'athletic build with strong shoulders and confident stance',
      'promedio': 'average build with balanced proportions',
      'robusto': 'sturdy and strong build with broad frame',
      'rechoncho': 'round and cheerful body type with soft features'
    };
    prompt += `${bodyMap[characterData.bodyType as keyof typeof bodyMap] || characterData.bodyType}, `;
  }
  
  if (characterData.skinTone) {
    const skinMap = {
      'muy claro': 'very fair porcelain skin with rosy undertones',
      'claro': 'light skin with warm peachy tones',
      'medio': 'medium skin tone with golden undertones',
      'bronceado': 'sun-kissed bronzed skin with warm glow',
      'oscuro': 'rich dark skin with beautiful depth',
      'muy oscuro': 'deep ebony skin with stunning richness'
    };
    prompt += `${skinMap[characterData.skinTone as keyof typeof skinMap] || characterData.skinTone}, `;
  }
  
  // Ojos muy detallados (crucial para la expresividad)
  if (characterData.eyeColor || characterData.eyeShape) {
    const eyeShapeMap = {
      'grandes y redondos': 'large round expressive eyes with prominent pupils',
      'almendrados': 'elegant almond-shaped eyes with graceful curves',
      'pequeños': 'small but bright eyes with intense focus',
      'rasgados': 'distinctive elongated eyes with unique character',
      'expresivos': 'highly expressive eyes with emotional depth'
    };
    
    const eyeColorMap = {
      'azul': 'brilliant sapphire blue eyes that sparkle',
      'verde': 'emerald green eyes with depth and mystery',
      'marrón': 'warm chocolate brown eyes with golden flecks',
      'avellana': 'hazel eyes that shift between brown and green',
      'gris': 'striking silver-gray eyes with intensity',
      'negro': 'deep obsidian black eyes with warmth'
    };
    
    prompt += `${eyeShapeMap[characterData.eyeShape as keyof typeof eyeShapeMap] || 'beautiful'} ${eyeColorMap[characterData.eyeColor as keyof typeof eyeColorMap] || characterData.eyeColor} eyes, `;
  }
  
  // Cabello muy específico
  if (characterData.hairColor || characterData.hairStyle) {
    const hairColorMap = {
      'rubio': 'golden blonde hair with natural highlights',
      'castaño claro': 'light chestnut brown hair with warm tones',
      'castaño': 'rich medium brown hair with depth',
      'castaño oscuro': 'deep dark brown hair with subtle shine',
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
  
  // Expresión facial específica
  if (characterData.facialExpression) {
    const expressionMap = {
      'sonriendo alegremente': 'beaming with a wide genuine smile and crinkled eyes',
      'riendo': 'laughing heartily with mouth open and joyful expression',
      'serio': 'serious and focused with determined brow and firm mouth',
      'pensativo': 'thoughtful and contemplative with slightly furrowed brow',
      'sorprendido': 'surprised with wide eyes and slightly open mouth',
      'determinado': 'determined and confident with strong jaw line',
      'amigable': 'warm and approachable with gentle smile'
    };
    prompt += `${expressionMap[characterData.facialExpression as keyof typeof expressionMap] || characterData.facialExpression}, `;
  }
  
  // Vestimenta detallada
  if (characterData.outfit) {
    prompt += `wearing ${characterData.outfit} with detailed fabric textures and realistic clothing physics, `;
  }
  
  if (characterData.accessories) {
    prompt += `accessorized with ${characterData.accessories}, `;
  }
  
  if (characterData.shoes) {
    prompt += `${characterData.shoes} with detailed shoe design, `;
  }
  
  // Pose y personalidad
  if (characterData.pose) {
    const poseMap = {
      'de pie con los brazos en las caderas': 'standing confidently with hands on hips in heroic pose',
      'caminando alegremente': 'walking with bouncy step and arms swinging naturally',
      'saltando de alegría': 'mid-jump with arms raised in celebration',
      'sentado relajado': 'sitting comfortably with relaxed posture',
      'corriendo': 'running dynamically with hair and clothes flowing',
      'saludando': 'waving cheerfully with bright expression',
      'pensando': 'in thoughtful pose with hand near chin'
    };
    prompt += `${poseMap[characterData.pose as keyof typeof poseMap] || characterData.pose}, `;
  }
  
  if (characterData.personality) {
    prompt += `embodying ${characterData.personality} personality through body language and expression, `;
  }
  
  // Entorno específico
  if (characterData.background) {
    prompt += `set in ${characterData.background} with detailed environmental elements, `;
  }
  
  if (characterData.lighting) {
    const lightingMap = {
      'luz natural brillante': 'bright natural daylight with soft shadows',
      'luz dorada suave': 'warm golden hour lighting with soft glow',
      'luz mágica': 'magical ethereal lighting with sparkles and glow',
      'atardecer cálido': 'warm sunset lighting with orange and pink hues',
      'luz de estudio': 'professional studio lighting with perfect illumination'
    };
    prompt += `illuminated by ${lightingMap[characterData.lighting as keyof typeof lightingMap] || characterData.lighting}, `;
  }
  
  // Estilo Pixar específico
  if (characterData.pixarStyle) {
    const styleMap = {
      'Toy Story': 'in classic Toy Story animation style with plastic-like textures',
      'Monsters Inc': 'in Monsters Inc style with furry textures and vibrant colors',
      'Finding Nemo': 'in Finding Nemo underwater style with flowing movements',
      'The Incredibles': 'in The Incredibles superhero style with dynamic poses',
      'Inside Out': 'in Inside Out emotional style with expressive features',
      'Coco': 'in Coco vibrant Mexican-inspired style with rich colors',
      'Frozen': 'in Frozen magical winter style with crystalline details',
      'Turning Red': 'in Turning Red modern style with contemporary elements',
      'Luca': 'in Luca Italian coastal style with warm Mediterranean tones',
      'general Disney Pixar': 'in signature Disney Pixar animation style'
    };
    prompt += `${styleMap[characterData.pixarStyle as keyof typeof styleMap] || 'in Disney Pixar style'}, `;
  }
  
  // Detalles adicionales
  if (characterData.additionalDetails) {
    prompt += `${characterData.additionalDetails}, `;
  }
  
  // Sufijos técnicos profesionales para máxima calidad
  prompt += 'rendered in Pixar quality 3D animation, subsurface scattering on skin, detailed facial rigging, perfect topology, industry-standard character modeling, photorealistic materials with cartoon stylization, advanced lighting setup, professional character design, masterpiece quality, 8K resolution, perfect anatomy, flawless proportions, studio-quality rendering, award-winning animation style, cinematic composition, depth of field, volumetric lighting, ambient occlusion, global illumination';
  
  return prompt.trim().replace(/,\s*$/, ''); // Eliminar coma final
};

export const transformToPixar = async (
  characterDescription: string,
  settings: PixarTransformSettings = DEFAULT_SETTINGS
): Promise<string> => {
  console.log(`Generating Pixar character from description using advanced AI`);
  
  try {
    // Create enhanced Pixar-style prompt with the user's description
    const enhancedPrompt = `Professional Disney Pixar 3D character: ${characterDescription}, rendered in signature Pixar animation style, 3D cartoon character, subsurface scattering, detailed facial features, perfect topology, industry-standard modeling, photorealistic materials with cartoon stylization, advanced lighting, masterpiece quality, 8K resolution, cinematic composition, volumetric lighting, award-winning animation`;
    
    // Use Pollinations.ai with enhanced model and settings
    const params = new URLSearchParams({
      width: '768',
      height: '768',
      model: 'flux-realism', // Using more advanced model
      enhance: 'true',
      nologo: 'true',
      private: 'true',
      quality: 'high',
      steps: '50', // More generation steps for better quality
      cfg_scale: '7.5', // Better prompt following
      seed: Math.floor(Math.random() * 1000000).toString()
    });
    
    const finalUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(enhancedPrompt)}?${params.toString()}`;
    
    console.log("Generated advanced Pixar character URL:", finalUrl);
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
  console.log(`Generating advanced Pixar character from detailed form data`);
  
  try {
    // Build professional and detailed prompt from form data
    const professionalPrompt = buildAdvancedPixarPrompt(characterData);
    
    console.log("Built advanced professional prompt:", professionalPrompt);
    
    // Use enhanced model with better settings for maximum quality
    const params = new URLSearchParams({
      width: '768',
      height: '768',
      model: 'flux-realism', // More advanced model for better accuracy
      enhance: 'true',
      nologo: 'true',
      private: 'true',
      quality: 'high',
      steps: '50', // More steps for better detail
      cfg_scale: '8.0', // Higher adherence to prompt
      sampler: 'DPM++ 2M Karras', // Better sampler
      seed: Math.floor(Math.random() * 1000000).toString()
    });
    
    const finalUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(professionalPrompt)}?${params.toString()}`;
    
    console.log("Generated advanced Pixar character URL:", finalUrl);
    return finalUrl;
    
  } catch (error) {
    console.error("Error generating advanced Pixar character:", error);
    throw new Error("No se pudo generar el personaje Pixar");
  }
};
