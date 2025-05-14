
import { addWatermark } from './watermarkService';

export interface VideoGenerationSettings {
  resolution: string;
  frameCount: number;
  quality: number;
  duration: number;
}

// Default settings for video generation
const DEFAULT_SETTINGS: VideoGenerationSettings = {
  resolution: "512x512",
  frameCount: 24,
  quality: 7,
  duration: 3
};

// Fallback sample videos in case API fails
const sampleVideos = [
  "https://pollinations.ai/p/like_a_silk_scarf_in_the_wind/mtg4NJfZPURG7C0gmdlx",
  "https://pollinations.ai/p/sunset_over_mountains/omGGvFbTYCievLkDJQSR",
  "https://pollinations.ai/p/neural_web_architecture/vvIJfbDk1VITDxsg0BSJ",
  "https://pollinations.ai/p/aurora_borealis_time_lapse/dQ3lbxuq0Aruzo560lXD"
];

export const generateVideo = async (
  prompt: string,
  settings: VideoGenerationSettings = DEFAULT_SETTINGS
): Promise<string> => {
  console.log(`Generating video with prompt: ${prompt}`);
  console.log(`Settings: ${JSON.stringify(settings)}`);
  
  try {
    // Using Pollinations.ai API for video generation
    // Format URL with parameters
    const encodedPrompt = encodeURIComponent(prompt);
    
    // Base URL for Pollinations video API
    const baseUrl = "https://pollinations.ai/video/p";
    
    // Build the URL with parameters
    const videoUrl = `${baseUrl}/${encodedPrompt.replace(/ /g, '_')}?width=${settings.resolution.split('x')[0]}&height=${settings.resolution.split('x')[1]}&fps=${settings.frameCount / settings.duration}&duration=${settings.duration}&quality=${settings.quality}`;
    
    // Return the URL where the video will be generated
    // Pollinations will start generating the video as soon as the URL is accessed
    return videoUrl;
    
  } catch (error) {
    console.error("Error generating video:", error);
    // Fallback to sample videos if the API fails
    const randomVideoUrl = sampleVideos[Math.floor(Math.random() * sampleVideos.length)];
    return randomVideoUrl;
  }
};
