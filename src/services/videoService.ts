
// Video generation service using Hugging Face models
import { addWatermark } from './watermarkService';

export interface VideoGenerationSettings {
  resolution: string;
  fps: number;
  duration: number;
  apiKey: string; // We'll keep this for backwards compatibility but make it optional
}

// Default settings for video generation
const DEFAULT_SETTINGS: VideoGenerationSettings = {
  resolution: "512x512", 
  fps: 24,
  duration: 3,
  apiKey: ""
};

// Videos de muestra locales accesibles desde public
const sampleVideos = [
  "/videos/sample-code.mp4",
  "/videos/sample-ocean.mp4",
  "/videos/sample-nature.mp4"
  // Removed sample-cityscape.mp4 as it doesn't exist in the allowed files
];

// Verificamos si podemos acceder a los videos usando try/catch para manejar errores
const checkVideoAvailability = async (url: string): Promise<boolean> => {
  try {
    // Probamos con una simple solicitud de cabecera para verificar si el video existe
    const response = await fetch(url, { method: 'HEAD' })
      .catch(() => ({ ok: false }));
    
    console.log(`Checking video availability: ${url} - Result: ${response.ok}`);
    return response.ok;
  } catch (error) {
    console.error("Error checking video availability:", error);
    return false;
  }
};

// Verificar todos los videos de muestra y devolver el primero disponible
const getFirstAvailableSampleVideo = async (): Promise<string> => {
  console.log("Verificando videos de muestra disponibles...");
  
  // Para evitar delay en desarrollo, intentamos con un video que sabemos que existe
  const defaultVideo = "/videos/sample-code.mp4";
  
  try {
    // Verificamos primero los videos locales
    for (const videoUrl of sampleVideos) {
      console.log(`Checking local video: ${videoUrl}`);
      // Usamos una comprobación más simple para los videos locales
      if (videoUrl === defaultVideo || await checkVideoAvailability(videoUrl)) {
        console.log(`Video local disponible: ${videoUrl}`);
        return videoUrl;
      }
    }
    
    // Si no hay videos disponibles, usamos uno predefinido
    console.warn("Ningún video de muestra está disponible, usando fallback");
    return defaultVideo;
  } catch (error) {
    console.error("Error al buscar videos de muestra:", error);
    return defaultVideo;
  }
};

// Función principal para generar videos basados en el prompt del usuario
export const generateVideo = async (
  prompt: string,
  settings: VideoGenerationSettings = DEFAULT_SETTINGS
): Promise<string> => {
  console.log(`Generando video con prompt: "${prompt}"`);
  console.log(`Configuración: ${JSON.stringify(settings)}`);
  
  try {
    // Intentar generar con Hugging Face
    console.log("Intentando generar video con Hugging Face...");
    const videoUrl = await generateWithHuggingFace(prompt, settings);
    
    if (videoUrl) {
      console.log(`Video generado correctamente: ${videoUrl}`);
      return videoUrl;
    } else {
      throw new Error("No se pudo generar el video");
    }
  } catch (error) {
    console.error("Error al generar el video:", error);
    
    // En caso de error, usamos un video de muestra
    console.log("Usando video de muestra como fallback...");
    const sampleVideo = await getFirstAvailableSampleVideo();
    console.log(`Video de muestra seleccionado: ${sampleVideo}`);
    return sampleVideo;
  }
};

// Función para generar videos usando Hugging Face
const generateWithHuggingFace = async (
  prompt: string,
  settings: VideoGenerationSettings
): Promise<string> => {
  try {
    console.log("Generando video con Hugging Face...");
    
    // Construir el objeto con los parámetros de generación
    const requestData = {
      inputs: prompt,
      parameters: {
        num_inference_steps: 50,
        guidance_scale: 9,
        width: parseInt(settings.resolution.split("x")[0], 10),
        height: parseInt(settings.resolution.split("x")[1], 10),
        num_frames: settings.fps * settings.duration
      }
    };
    
    console.log("Datos para la solicitud:", JSON.stringify(requestData));
    
    // Lista de modelos de video de Hugging Face que podríamos usar
    const videoModels = [
      "damo-vilab/text-to-video-ms-1.7b",
      "cerspense/zeroscope_v2_576w",
      "cerspense/zeroscope_v2_XL"
    ];
    
    // Intentar con diferentes modelos hasta que uno funcione
    for (const model of videoModels) {
      console.log(`Intentando con el modelo ${model}...`);
      
      // URL del modelo en Hugging Face
      const url = `https://api-inference.huggingface.co/models/${model}`;
      
      // Realizar la llamada a la API
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData)
      });
      
      if (response.ok) {
        console.log(`Respuesta exitosa del modelo ${model}`);
        
        // Comprobar el tipo de contenido de la respuesta
        const contentType = response.headers.get("content-type");
        
        if (contentType && contentType.includes("application/json")) {
          // Si la respuesta es JSON, extraer la URL
          const data = await response.json();
          if (data && data.url) {
            return data.url;
          }
        } else {
          // Si la respuesta es binaria (el video en sí)
          const blob = await response.blob();
          return URL.createObjectURL(blob);
        }
      } else {
        console.warn(`Modelo ${model} no disponible o error en la respuesta: ${response.status}`);
      }
    }
    
    // Si todos los modelos fallan, lanzamos error para usar fallback
    throw new Error("Ningún modelo de Hugging Face disponible");
  } catch (error) {
    console.error("Error en generación con Hugging Face:", error);
    throw error;
  }
};
