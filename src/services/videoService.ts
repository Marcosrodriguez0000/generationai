
// Video generation service using API keys
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
const sampleVideos = [
  "https://storage.googleapis.com/gen-2-samples/dog.mp4",
  "https://storage.googleapis.com/gen-2-samples/sunset.mp4",
  "https://storage.googleapis.com/gen-2-samples/beach.mp4",
  "https://storage.googleapis.com/gen-2-samples/city.mp4"
];

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
      return getSampleVideo(prompt);
    }
    
    // In a real implementation, we would make an API call here
    // For demo purposes, we'll use a simulated API call that returns after a short delay
    await simulateApiCall(settings.apiKey);
    
    // Return a sample video for demonstration
    return getSampleVideo(prompt);
    
  } catch (error) {
    console.error("Error generating video:", error);
    // Fallback to sample videos if the API fails
    return getSampleVideo(prompt);
  }
};

// Simulate an API call with a delay
const simulateApiCall = async (apiKey: string): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(`Simulated API call with key: ${apiKey.substring(0, 4)}****`);
      resolve();
    }, 2000);
  });
};

// Get a sample video based on the prompt
const getSampleVideo = (prompt: string): string => {
  const promptLower = prompt.toLowerCase();
  
  // Match prompt keywords to specific sample videos
  if (promptLower.includes('perro') || promptLower.includes('dog')) {
    return sampleVideos[0];
  } else if (promptLower.includes('atardecer') || promptLower.includes('sunset')) {
    return sampleVideos[1];
  } else if (promptLower.includes('playa') || promptLower.includes('beach')) {
    return sampleVideos[2];
  } else if (promptLower.includes('ciudad') || promptLower.includes('city')) {
    return sampleVideos[3];
  }
  
  // If no specific match, return a random sample
  return sampleVideos[Math.floor(Math.random() * sampleVideos.length)];
};
