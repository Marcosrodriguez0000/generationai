
// Video generation service using Pollinations.ai
import { addWatermark } from './watermarkService';

export interface VideoGenerationSettings {
  prompt: string;
  resolution: string;
  fps: number;
  duration: number;
  stylizeStrength?: number;
}

// Default settings
const DEFAULT_SETTINGS: Omit<VideoGenerationSettings, 'prompt'> = {
  resolution: "512x512",
  fps: 24,
  duration: 3,
  stylizeStrength: 0.7
};

export const generateVideoWithPollinations = async (
  prompt: string,
  settings: Partial<Omit<VideoGenerationSettings, 'prompt'>> = {}
): Promise<string> => {
  console.log(`Generating video with prompt: ${prompt}`);
  
  try {
    // Combine default settings with user settings
    const finalSettings = {
      ...DEFAULT_SETTINGS,
      ...settings
    };
    
    console.log(`Settings: ${JSON.stringify(finalSettings)}`);
    
    // Encode the prompt for URL
    const encodedPrompt = encodeURIComponent(prompt);
    
    // Extract resolution values
    const [width, height] = finalSettings.resolution.split("x").map(Number);
    
    // Add a randomness parameter to prevent caching
    const cacheBuster = Date.now();
    
    // For Pollinations video endpoint
    // Note: Pollinations doesn't have a direct video API like images,
    // so we're using their text-to-video flow which works differently
    
    // Construct the URL with all parameters
    const videoUrl = `https://image.pollinations.ai/video/prompt/${encodedPrompt}?width=${width}&height=${height}&fps=${finalSettings.fps}&duration=${finalSettings.duration}&noCache=${cacheBuster}`;
    
    console.log(`Generated video URL: ${videoUrl}`);
    
    // Process the video to add our own watermark if needed
    const processedUrl = addWatermark(videoUrl);
    
    return processedUrl;
    
  } catch (error) {
    console.error("Error generating video:", error);
    // Fallback to sample videos if the API fails
    const sampleVideos = [
      "/videos/sample-code.mp4",
      "/videos/sample-ocean.mp4",
      "/videos/sample-nature.mp4"
    ];
    return sampleVideos[Math.floor(Math.random() * sampleVideos.length)];
  }
};

