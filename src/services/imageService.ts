
// Image generation service using a public API that doesn't require authentication
// Fallback to sample images if the API fails
import { addWatermark } from './watermarkService';

export interface GenerationSettings {
  resolution: string;
  quality: number;
}

// Default settings
const DEFAULT_SETTINGS: GenerationSettings = {
  resolution: "512x512",
  quality: 7
};

// Fallback sample images in case API fails
const sampleImages = [
  "https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA",
  "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA",
  "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA",
  "https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA"
];

export const generateImage = async (
  prompt: string,
  settings: GenerationSettings = DEFAULT_SETTINGS
): Promise<string> => {
  console.log(`Generating image with prompt: ${prompt}`);
  console.log(`Settings: ${JSON.stringify(settings)}`);
  
  try {
    // Using the free public Pollinations.ai API - no API key needed
    // Create the URL with the prompt and settings
    const encodedPrompt = encodeURIComponent(prompt);
    
    // Extract resolution values
    const [width, height] = settings.resolution.split("x").map(Number);
    
    // Construct the API URL with parameters
    // Pollinations.ai provides a simple URL-based API for image generation
    const imageUrl = `https://image.pollinations.ai/prompt/${encodedPrompt}?width=${width}&height=${height}&noStore=true&quality=${settings.quality}`;
    
    // Add our watermark to the generated image
    const watermarkedUrl = addWatermark(imageUrl);
    
    // Return the URL with watermark - the image will be generated when loaded
    return watermarkedUrl;
    
  } catch (error) {
    console.error("Error generating image:", error);
    // Fallback to sample images if the API fails
    const randomImageUrl = sampleImages[Math.floor(Math.random() * sampleImages.length)];
    return randomImageUrl;
  }
};
