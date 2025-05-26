
// Supabase Edge Function service for Pixar character generation
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

// Get Supabase configuration with fallbacks
const getSupabaseConfig = () => {
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
  const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
  
  console.log('🔧 Supabase URL:', supabaseUrl);
  console.log('🔧 Supabase Key exists:', !!supabaseKey);
  
  if (!supabaseUrl || !supabaseKey) {
    throw new Error('Supabase configuration missing. Please check your environment variables.');
  }
  
  return {
    url: supabaseUrl,
    key: supabaseKey,
    functionUrl: `${supabaseUrl}/functions/v1/generate-pixar`
  };
};

// Para compatibilidad con el componente existente
export const setHuggingFaceApiKey = (apiKey: string) => {
  localStorage.setItem('huggingface_configured', 'true');
};

export const getHuggingFaceApiKey = (): string => {
  return localStorage.getItem('huggingface_configured') || '';
};

const DEFAULT_SETTINGS: CivitAISettings = {
  model: "dreamshaper",
  strength: 0.8,
  steps: 25,
  cfgScale: 7
};

const buildPixarPrompt = (characterData: PixarCharacterData): string => {
  let prompt = "disney pixar style 3d character, high quality, detailed, ";
  
  // Información básica
  if (characterData.name) {
    prompt += `character named ${characterData.name}, `;
  }
  
  // Edad y género
  if (characterData.age && characterData.gender) {
    const ageMap = {
      'bebé': 'cute baby',
      'niño pequeño': 'adorable toddler',
      'niño': 'cheerful child',
      'adolescente': 'teenage',
      'joven adulto': 'young adult',
      'adulto': 'adult',
      'adulto mayor': 'elderly'
    };
    prompt += `${ageMap[characterData.age as keyof typeof ageMap] || characterData.age} ${characterData.gender}, `;
  }
  
  // Características físicas
  if (characterData.skinTone) {
    const skinMap = {
      'muy claro': 'fair skin',
      'claro': 'light skin',
      'medio': 'medium skin tone',
      'bronceado': 'tan skin',
      'oscuro': 'dark skin',
      'muy oscuro': 'deep dark skin'
    };
    prompt += `${skinMap[characterData.skinTone as keyof typeof skinMap] || characterData.skinTone}, `;
  }
  
  if (characterData.eyeColor) {
    prompt += `${characterData.eyeColor} eyes, `;
  }
  
  if (characterData.hairColor && characterData.hairStyle) {
    prompt += `${characterData.hairColor} ${characterData.hairStyle} hair, `;
  } else if (characterData.hairColor) {
    prompt += `${characterData.hairColor} hair, `;
  }
  
  if (characterData.facialExpression) {
    const expressionMap = {
      'sonriendo alegremente': 'happy smiling',
      'riendo': 'laughing joyfully',
      'serio': 'serious expression',
      'pensativo': 'thoughtful',
      'sorprendido': 'surprised',
      'determinado': 'determined',
      'amigable': 'friendly'
    };
    prompt += `${expressionMap[characterData.facialExpression as keyof typeof expressionMap] || characterData.facialExpression}, `;
  }
  
  if (characterData.outfit) {
    prompt += `wearing ${characterData.outfit}, `;
  }
  
  if (characterData.pose) {
    const poseMap = {
      'de pie con los brazos en las caderas': 'standing with hands on hips',
      'caminando alegremente': 'walking happily',
      'saltando de alegría': 'jumping with joy',
      'sentado relajado': 'sitting relaxed',
      'corriendo': 'running',
      'saludando': 'waving',
      'pensando': 'thinking pose'
    };
    prompt += `${poseMap[characterData.pose as keyof typeof poseMap] || characterData.pose}, `;
  }
  
  if (characterData.background) {
    prompt += `background: ${characterData.background}, `;
  }
  
  // Estilo específico
  prompt += "pixar animation style, 3d rendered, vibrant colors, professional quality, masterpiece";
  
  return prompt.trim();
};

export const generatePixarCharacter = async (
  characterData: PixarCharacterData,
  settings: CivitAISettings = DEFAULT_SETTINGS
): Promise<string> => {
  console.log('🚀 Generando personaje Pixar con Supabase Edge Function');
  
  const prompt = buildPixarPrompt(characterData);
  console.log('📝 Prompt construido:', prompt);
  
  try {
    const config = getSupabaseConfig();
    console.log('📤 Enviando request a Supabase Edge Function:', config.functionUrl);
    
    const response = await fetch(config.functionUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${config.key}`,
      },
      body: JSON.stringify({
        prompt: prompt,
        settings: settings
      })
    });

    console.log('📡 Respuesta de Supabase:', response.status);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ Error de Supabase Edge Function:', response.status, errorText);
      throw new Error(`Error ${response.status}: ${errorText}`);
    }

    // La Edge Function devuelve la imagen directamente
    const blob = await response.blob();
    const imageUrl = URL.createObjectURL(blob);
    
    console.log('✅ Imagen generada con Supabase Edge Function');
    return imageUrl;
    
  } catch (error) {
    console.error('💥 Error completo al generar con Supabase:', error);
    throw error;
  }
};

export const generatePixarFromText = async (
  description: string,
  settings: CivitAISettings = DEFAULT_SETTINGS
): Promise<string> => {
  console.log('🚀 Generando personaje Pixar desde texto con Supabase Edge Function');
  
  const enhancedPrompt = `disney pixar style 3d character: ${description}, high quality, vibrant colors, professional animation style`;
  
  try {
    const config = getSupabaseConfig();
    
    const response = await fetch(config.functionUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${config.key}`,
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

    const blob = await response.blob();
    return URL.createObjectURL(blob);
    
  } catch (error) {
    console.error('💥 Error en generatePixarFromText:', error);
    throw error;
  }
};

export const transformImageToPixar = async (
  imageUrl: string,
  settings: CivitAISettings = DEFAULT_SETTINGS
): Promise<string> => {
  // Esta función requiere un modelo diferente
  throw new Error('Transformación de imagen no disponible con el modelo actual');
};
