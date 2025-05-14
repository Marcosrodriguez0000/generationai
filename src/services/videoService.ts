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

// Fallback sample videos en caso de que falle la API
const sampleVideos = [
  "https://cdn.videvo.net/videvo_files/video/premium/video0036/small_watermarked/computer_code00_preview.mp4",
  "https://cdn.videvo.net/videvo_files/video/free/2019-01/small_watermarked/190111_06_25_preview.mp4",
  "https://cdn.videvo.net/videvo_files/video/free/2019-09/small_watermarked/190828_27_SuperTrees_HD_17_preview.mp4",
  "https://cdn.videvo.net/videvo_files/video/free/2016-05/small_watermarked/506401051_1_preview.mp4"
];

// Verificamos si podemos acceder a los videos usando try/catch para manejar errores
const checkVideoAvailability = async (url: string): Promise<boolean> => {
  try {
    // En vez de usar fetch que puede tener problemas de CORS, creamos un elemento de video
    // y verificamos si puede cargar la metadata, lo que indica que el video está disponible
    return new Promise((resolve) => {
      const video = document.createElement('video');
      
      // Evento para cuando la metadata se carga - el video está disponible
      video.onloadedmetadata = () => {
        console.log(`Video disponible: ${url}`);
        video.remove(); // Limpiamos el elemento
        resolve(true);
      };
      
      // Evento para cuando hay un error - el video no está disponible
      video.onerror = () => {
        console.error(`Video no disponible: ${url}`);
        video.remove(); // Limpiamos el elemento
        resolve(false);
      };
      
      // Establecemos un timeout por si la conexión es lenta
      setTimeout(() => {
        if (!video.duration) {
          console.warn(`Timeout verificando disponibilidad: ${url}`);
          video.remove();
          resolve(false);
        }
      }, 3000);
      
      // Intentamos cargar solo la metadata del video
      video.preload = 'metadata';
      video.src = url;
      video.crossOrigin = "anonymous"; // Intentar solucionar problemas CORS
    });
  } catch (error) {
    console.error("Error checking video availability:", error);
    return false;
  }
};

// Verificar todos los videos de muestra y devolver el primero disponible
const getFirstAvailableSampleVideo = async (): Promise<string> => {
  console.log("Verificando videos de muestra disponibles...");
  for (const videoUrl of sampleVideos) {
    const isAvailable = await checkVideoAvailability(videoUrl);
    if (isAvailable) {
      console.log(`Video disponible encontrado: ${videoUrl}`);
      return videoUrl;
    }
  }
  
  // Si ningún video está disponible, elegir el primero como último recurso
  console.warn("Ningún video de muestra está disponible, usando el primero como último recurso");
  return sampleVideos[0];
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
    const url = "https://api.stability.ai/v2beta/generation/video";
    
    // Configuración de la petición
    const requestData = {
      prompt: prompt,
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
    
    if (data && data.video_url) {
      return data.video_url;
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

// Función para obtener un video de muestra basado en palabras clave del prompt
const getSampleVideo = async (prompt: string): Promise<string> => {
  const promptLower = prompt.toLowerCase();
  
  // Match prompt keywords to specific sample videos
  let selectedVideo = sampleVideos[0]; // Default to first video
  
  if (promptLower.includes('perro') || promptLower.includes('dog') || promptLower.includes('animal')) {
    selectedVideo = sampleVideos[3]; // Video de animal
  } else if (promptLower.includes('atardecer') || promptLower.includes('sunset') || promptLower.includes('naturaleza')) {
    selectedVideo = sampleVideos[2]; // Video de naturaleza
  } else if (promptLower.includes('playa') || promptLower.includes('beach') || promptLower.includes('agua')) {
    selectedVideo = sampleVideos[1]; // Video con agua
  } else if (promptLower.includes('ciudad') || promptLower.includes('city') || promptLower.includes('tecnología') || promptLower.includes('código')) {
    selectedVideo = sampleVideos[0]; // Video de código/tecnología
  }
  
  // Verify the video actually works before returning it
  const isAvailable = await checkVideoAvailability(selectedVideo);
  if (!isAvailable) {
    console.warn("El video seleccionado no está disponible, buscando otro video funcional");
    return getFirstAvailableSampleVideo();
  }
  
  return selectedVideo;
};
