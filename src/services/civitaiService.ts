// Hugging Face service for Pixar character generation
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

// Hugging Face configuration
const HUGGINGFACE_API_URL = "https://api-inference.huggingface.co/models/Lykon/DreamShaper";
let HUGGINGFACE_API_KEY = "";

// Función para configurar la API key
export const setHuggingFaceApiKey = (apiKey: string) => {
  HUGGINGFACE_API_KEY = apiKey;
  localStorage.setItem('huggingface_api_key', apiKey);
};

// Función para obtener la API key del localStorage
export const getHuggingFaceApiKey = (): string => {
  if (HUGGINGFACE_API_KEY) return HUGGINGFACE_API_KEY;
  const stored = localStorage.getItem('huggingface_api_key');
  if (stored) {
    HUGGINGFACE_API_KEY = stored;
    return stored;
  }
  return "";
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
  console.log('🚀 Generando personaje Pixar con Hugging Face');
  
  const apiKey = getHuggingFaceApiKey();
  if (!apiKey) {
    throw new Error('API key de Hugging Face no configurada. Por favor configúrala primero.');
  }
  
  const prompt = buildPixarPrompt(characterData);
  console.log('📝 Prompt construido:', prompt);
  
  try {
    console.log('📤 Enviando request a Hugging Face');
    
    const response = await fetch(HUGGINGFACE_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        inputs: prompt,
        parameters: {
          num_inference_steps: settings.steps,
          guidance_scale: settings.cfgScale,
          width: 512,
          height: 512
        }
      })
    });

    console.log('📡 Respuesta de Hugging Face:', response.status);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ Error de Hugging Face:', response.status, errorText);
      throw new Error(`Error ${response.status}: ${errorText}`);
    }

    // Hugging Face devuelve la imagen como blob
    const blob = await response.blob();
    const imageUrl = URL.createObjectURL(blob);
    
    console.log('✅ Imagen generada con Hugging Face');
    return imageUrl;
    
  } catch (error) {
    console.error('💥 Error completo al generar con Hugging Face:', error);
    throw error;
  }
};

export const generatePixarFromText = async (
  description: string,
  settings: CivitAISettings = DEFAULT_SETTINGS
): Promise<string> => {
  console.log('🚀 Generando personaje Pixar desde texto con Hugging Face');
  
  const apiKey = getHuggingFaceApiKey();
  if (!apiKey) {
    throw new Error('API key de Hugging Face no configurada.');
  }
  
  const enhancedPrompt = `disney pixar style 3d character: ${description}, high quality, vibrant colors, professional animation style`;
  
  try {
    const response = await fetch(HUGGINGFACE_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        inputs: enhancedPrompt,
        parameters: {
          num_inference_steps: settings.steps,
          guidance_scale: settings.cfgScale,
          width: 512,
          height: 512
        }
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
  // Esta función requiere un modelo diferente en Hugging Face
  throw new Error('Transformación de imagen no disponible con el modelo actual');
};
