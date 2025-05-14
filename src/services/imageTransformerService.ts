
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
    // We'll use the prompt "anime style, cartoon, Ghibli style, illustration" to get a cartoon look
    const stylePrompt = encodeURIComponent("Convert to anime style, cartoon, Ghibli style, illustration");
    
    // Extract resolution values
    const [width, height] = settings.resolution.split("x").map(Number);
    
    // For image transformation, we need to pass the source image URL as part of the query
    // We'll URL encode the image URL to be able to pass it as a parameter
    const encodedImageUrl = encodeURIComponent(imageUrl);
    
    // Construct the URL with all parameters including image source
    const transformationUrl = `https://image.pollinations.ai/prompt/${stylePrompt}?img=${encodedImageUrl}&width=${width}&height=${height}&stylize=${settings.stylizeStrength}`;
    
    // Process the image to add our own watermark
    const processedUrl = addWatermark(transformationUrl);
    
    return processedUrl;
    
  } catch (error) {
    console.error("Error transforming image:", error);
    // If transformation fails, return the original image
    return imageUrl;
  }
};
