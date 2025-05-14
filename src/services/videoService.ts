
// Video generation service using Stability AI API
import { addWatermark } from './watermarkService';
import { toast } from "sonner"; // Import toast from sonner

export interface VideoGenerationSettings {
  resolution: string;
  fps: number;
  duration: number;
  apiKey: string;
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
  "/videos/sample-nature.mp4",
  "/videos/sample-cityscape.mp4"
];

// Verificamos si podemos acceder a los videos usando try/catch para manejar errores
const checkVideoAvailability = async (url: string): Promise<boolean> => {
  try {
    // Probamos con una simple solicitud de cabecera para verificar si el video existe
    const response = await fetch(url, { method: 'HEAD' })
      .catch(() => ({ ok: false }));
    
    return response.ok;
  } catch (error) {
    console.error("Error checking video availability:", error);
    return false;
  }
};

// Verificar todos los videos de muestra y devolver el primero disponible
const getFirstAvailableSampleVideo = async (): Promise<string> => {
  console.log("Verificando videos de muestra disponibles...");
  
  // Primero intentamos con videos locales que siempre deberían funcionar
  for (const videoUrl of sampleVideos) {
    if (await checkVideoAvailability(videoUrl)) {
      console.log(`Video local disponible: ${videoUrl}`);
      return videoUrl;
    }
  }
  
  // Si no hay videos locales disponibles, usamos uno predefinido
  console.warn("Ningún video de muestra está disponible, usando fallback");
  return "/videos/sample-code.mp4";
};

// Función principal para generar videos basados en el prompt del usuario
export const generateVideo = async (
  prompt: string,
  settings: VideoGenerationSettings = DEFAULT_SETTINGS
): Promise<string> => {
  console.log(`Generando video con prompt: "${prompt}"`);
  console.log(`Configuración: ${JSON.stringify(settings)}`);
  
  try {
    // Verificar que tenemos una API key
    if (!settings.apiKey) {
      console.warn("No se proporcionó API key, usando video de muestra");
      toast.error("Se requiere una API key válida para generar videos personalizados");
      return getFirstAvailableSampleVideo();
    }

    // Llamada a la API de Stability AI para generar video
    const apiKey = settings.apiKey;
    const videoUrl = await callStabilityAIVideoAPI(prompt, apiKey, settings);
    
    if (videoUrl) {
      console.log(`Video generado correctamente: ${videoUrl}`);
      return videoUrl;
    } else {
      throw new Error("No se pudo generar el video");
    }
  } catch (error) {
    console.error("Error al generar el video:", error);
    toast.error("Error al generar el video", { 
      description: "Estamos usando un video de muestra mientras solucionamos el problema."
    });
    
    // Fallback a un video de muestra
    return getFirstAvailableSampleVideo();
  }
};

// Función que hace la llamada real a la API de Stability para generar videos
const callStabilityAIVideoAPI = async (
  prompt: string,
  apiKey: string,
  settings: VideoGenerationSettings
): Promise<string> => {
  try {
    console.log("Iniciando llamada a la API de Stability AI...");
    
    // Construimos la URL para la API de Stability
    const url = "https://api.stability.ai/v1/generation/stable-video-diffusion/text-to-video";
    
    // Configuración de la petición
    const requestData = {
      text_prompts: [
        {
          text: prompt,
          weight: 1
        }
      ],
      height: parseInt(settings.resolution.split("x")[1], 10),
      width: parseInt(settings.resolution.split("x")[0], 10),
      output_format: "mp4",
      cfg_scale: 7.0,
      motion_bucket_id: 40,
      fps: settings.fps,
      seconds: settings.duration
    };
    
    console.log("Datos de la solicitud:", JSON.stringify(requestData));
    
    // Hacemos la llamada a la API
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": `Bearer ${apiKey}`
      },
      body: JSON.stringify(requestData)
    });
    
    // Verificamos si la respuesta es exitosa
    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      console.error("Error en la respuesta de la API:", response.status, errorData);
      
      // Si hay un error de API key inválida, mostramos un mensaje específico
      if (response.status === 401) {
        toast.error("API key inválida", { 
          description: "Por favor, verifica tu API key de Stability AI"
        });
      } else {
        toast.error(`Error en la API: ${response.status}`, {
          description: errorData?.message || "No se pudo generar el video"
        });
      }
      
      // En caso de error devolvemos null para que se use el fallback
      return null;
    }
    
    // Procesamos la respuesta exitosa
    const data = await response.json();
    console.log("Respuesta de la API:", data);
    
    if (data && data.artifacts && data.artifacts[0] && data.artifacts[0].video_url) {
      return data.artifacts[0].video_url;
    } else if (data && data.artifacts && data.artifacts[0] && data.artifacts[0].url) {
      // Formato alternativo de respuesta
      return data.artifacts[0].url;
    } else {
      throw new Error("Formato de respuesta de API inesperado");
    }
  } catch (error) {
    console.error("Error llamando a la API de Stability:", error);
    throw error; // Propagamos el error para manejarlo en la función principal
  }
};
