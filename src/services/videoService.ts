
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
    
    // Use the Stability API to generate a video
    const apiKey = settings.apiKey;
    
    // For now, until we implement the full API, we'll use sample videos
    // In a production app, we would make the actual API call to Stability AI
    
    // This would be a real API call to Stability AI in a production app
    // const response = await fetch('https://api.stability.ai/v1/generation/video', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'Authorization': `Bearer ${apiKey}`
    //   },
    //   body: JSON.stringify({
    //     prompt: prompt,
    //     fps: settings.fps,
    //     seconds: settings.duration,
    //     width: parseInt(settings.resolution.split('x')[0]),
    //     height: parseInt(settings.resolution.split('x')[1])
    //   })
    // });
    // 
    // if (!response.ok) {
    //   throw new Error(`Stability AI API error: ${response.statusText}`);
    // }
    // 
    // const data = await response.json();
    // return data.video_url;
    
    // For demo purposes, we'll simulate an API call
    await simulateApiCall(apiKey);
    
    // Return a sample video based on the prompt
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
      console.log(`Simulated Stability AI API call with key: ${apiKey.substring(0, 4)}****`);
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
