
// Image generation service using a public API that doesn't require authentication
// Fallback to sample images if the API fails
import { addWatermark } from "./watermarkService";

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
];

// Fetch a random image from the given API
export const generateImage = async (prompt: string, settings: Partial<GenerationSettings> = {}): Promise<string> => {
  const mergedSettings = { ...DEFAULT_SETTINGS, ...settings };
  const [width, height] = mergedSettings.resolution.split("x").map(Number);

  try {
    // Use Pollinations.ai for image generation
    const baseUrl = "https://image.pollinations.ai/prompt/";
    const encodedPrompt = encodeURIComponent(prompt);
    const imageParams = `width=${width},height=${height},seed=${Math.floor(Math.random() * 1000)}`;
    const apiUrl = `${baseUrl}${encodedPrompt}?${imageParams}`;

    // First get the raw image URL
    const rawImageUrl = apiUrl;
    
    // Then add our custom watermark
    const watermarkedImageUrl = await addWatermark(rawImageUrl, "GenerationAi");
    
    return watermarkedImageUrl;
  } catch (error) {
    console.error("Error generating image:", error);
    
    // Return a random sample image as fallback
    return sampleImages[Math.floor(Math.random() * sampleImages.length)];
  }
};
