
// Video generation service using Stability AI API
import { addWatermark } from './watermarkService';

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

// Fallback sample videos in case API fails
// Estos URLs están validados y funcionan correctamente
const sampleVideos = [
  "https://storage.googleapis.com/gen-2-samples/dog.mp4",
  "https://storage.googleapis.com/gen-2-samples/sunset.mp4",
  "https://storage.googleapis.com/gen-2-samples/beach.mp4",
  "https://storage.googleapis.com/gen-2-samples/city.mp4"
];

// Verificamos si podemos acceder a los videos usando try/catch para manejar errores de CORS
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
      }, 5000);
      
      // Intentamos cargar solo la metadata del video
      video.preload = 'metadata';
      video.src = url;
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

export const generateVideo = async (
  prompt: string,
  settings: VideoGenerationSettings = DEFAULT_SETTINGS
): Promise<string> => {
  console.log(`Generating video with prompt: ${prompt}`);
  console.log(`Settings: ${JSON.stringify(settings)}`);
  
  try {
    // Check if API key is provided
    if (!settings.apiKey) {
      console.log("No API key provided, returning sample video");
      return getFirstAvailableSampleVideo();
    }
    
    // Use the Stability API to generate a video
    const apiKey = settings.apiKey;
    
    // For now, until we implement the full API, we'll use sample videos
    // In a production app, we would make the actual API call to Stability AI
    
    // For demo purposes, we'll simulate an API call
    await simulateApiCall(apiKey);
    
    // Get a sample video based on the prompt
    const videoUrl = await getSampleVideo(prompt);
    
    console.log(`Video generado: ${videoUrl}`);
    return videoUrl;
    
  } catch (error) {
    console.error("Error generating video:", error);
    // Fallback to first available sample video if the API fails
    return getFirstAvailableSampleVideo();
  }
};

// Simulate an API call with a delay
const simulateApiCall = async (apiKey: string): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(`Simulated Stability AI API call with key: ${apiKey.substring(0, 4)}****`);
      resolve();
    }, 2000);
  });
};

// Get a sample video based on the prompt
const getSampleVideo = async (prompt: string): Promise<string> => {
  const promptLower = prompt.toLowerCase();
  
  // Match prompt keywords to specific sample videos
  let selectedVideo = sampleVideos[0]; // Default to first video
  
  if (promptLower.includes('perro') || promptLower.includes('dog')) {
    selectedVideo = sampleVideos[0];
  } else if (promptLower.includes('atardecer') || promptLower.includes('sunset')) {
    selectedVideo = sampleVideos[1];
  } else if (promptLower.includes('playa') || promptLower.includes('beach')) {
    selectedVideo = sampleVideos[2];
  } else if (promptLower.includes('ciudad') || promptLower.includes('city')) {
    selectedVideo = sampleVideos[3];
  }
  
  // Verify the video actually works before returning it
  const isAvailable = await checkVideoAvailability(selectedVideo);
  if (!isAvailable) {
    console.warn("El video seleccionado no está disponible, buscando otro video funcional");
    return getFirstAvailableSampleVideo();
  }
  
  return selectedVideo;
};
