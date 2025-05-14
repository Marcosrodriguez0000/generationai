
// Image transformation service using Pollinations.ai
import { addWatermark } from './watermarkService';

export interface TransformationSettings {
  stylizeStrength: number; // Controls how strong the cartoon/anime style is applied
  resolution: string;
}

// Default settings
const DEFAULT_SETTINGS: TransformationSettings = {
  stylizeStrength: 0.7,
  resolution: "512x512"
};

export const transformToCartoon = async (
  imageUrl: string,
  settings: TransformationSettings = DEFAULT_SETTINGS
): Promise<string> => {
  console.log(`Transforming image to cartoon style`);
  console.log(`Source image: ${imageUrl}`);
  console.log(`Settings: ${JSON.stringify(settings)}`);
  
  try {
    // Base pollinations.ai API for cartoon/anime transformation
    // We'll use a more specific prompt for better cartoon transformation
    const stylePrompt = encodeURIComponent("Convert to anime style, detailed cartoon, Ghibli style, vibrant colors, illustration");
    
    // Extract resolution values
    const [width, height] = settings.resolution.split("x").map(Number);
    
    // For image transformation, we need to pass the source image URL as part of the query
    // We'll URL encode the image URL to be able to pass it as a parameter
    const encodedImageUrl = encodeURIComponent(imageUrl);
    
    // Add a randomness parameter to prevent caching
    const cacheBuster = Date.now();
    
    // Construct the URL with all parameters including image source
    // The noCache parameter helps ensure we get a unique transformation each time
    const transformationUrl = `https://image.pollinations.ai/prompt/${stylePrompt}?img=${encodedImageUrl}&width=${width}&height=${height}&stylize=${settings.stylizeStrength}&noCache=${cacheBuster}`;
    
    console.log(`Generated transformation URL: ${transformationUrl}`);
    
    // Process the image to add our own watermark
    const processedUrl = addWatermark(transformationUrl);
    
    return processedUrl;
    
  } catch (error) {
    console.error("Error transforming image:", error);
    // If transformation fails, return the original image
    return imageUrl;
  }
};
