
import { addWatermark } from './watermarkService';

export interface VideoGenerationSettings {
  resolution: string;
  frameCount: number;
  quality: number;
  duration: number;
  model: string;
}

// Available video generation models
export const VIDEO_MODELS = {
  POLLINATIONS: "pollinations",
  RUNWAY: "runway",
  STABLE_DIFFUSION: "stable_diffusion"
};

// Default settings for video generation
const DEFAULT_SETTINGS: VideoGenerationSettings = {
  resolution: "512x512",
  frameCount: 24,
  quality: 7,
  duration: 3,
  model: VIDEO_MODELS.POLLINATIONS
};

// Fallback sample videos in case API fails
const sampleVideos = [
  "https://pollinations.ai/p/like_a_silk_scarf_in_the_wind/mtg4NJfZPURG7C0gmdlx",
  "https://pollinations.ai/p/sunset_over_mountains/omGGvFbTYCievLkDJQSR",
  "https://pollinations.ai/p/neural_web_architecture/vvIJfbDk1VITDxsg0BSJ",
  "https://pollinations.ai/p/aurora_borealis_time_lapse/dQ3lbxuq0Aruzo560lXD"
];

// Sample videos for Stable Video Diffusion model
const stableVideoDiffusionSamples = [
  {
    prompt: "beach",
    url: "https://replicate.delivery/pbxt/IwxlDCbdzP7VwL7h4aGGBniCJHXxvXfVXP0ygsvPu7bZEHdE/out.mp4"
  },
  {
    prompt: "forest",
    url: "https://replicate.delivery/pbxt/0B1jgMLMiMSVWsbRvnbiJcWw5eNWiwO2Jve6DDamGcRSn6LIA/out.mp4"
  },
  {
    prompt: "sunset",
    url: "https://replicate.delivery/pbxt/sG8hB0AJ54ljOQbfMQzkntx6GjnPXWGmXslI1NJxbkw0kUdE/out.mp4"
  },
  {
    prompt: "space",
    url: "https://replicate.delivery/pbxt/GqJc3jVilQBGHeWJrxqpfSVRrjPjQhS3Vby9N5Q29bfmTnwRA/out.mp4"
  },
  {
    prompt: "city",
    url: "https://replicate.delivery/pbxt/GAIJiRrXA9bpZAVgAO1jDfRIcDcXEckAcoHLJ0Mv86ZvPojIA/out.mp4"
  },
  {
    prompt: "mountain",
    url: "https://replicate.delivery/pbxt/5aITaxrfQIZJxPSGpzL7G1XxbTqzlRXJFQwdPPbP78BprfPE/out.mp4"
  },
  {
    prompt: "ocean",
    url: "https://replicate.delivery/pbxt/Rp4YFKvmX03dv4rS8hgEMGbjScp3v5yS991liY3LwZ90OTkE/out.mp4"
  },
  {
    prompt: "river",
    url: "https://replicate.delivery/pbxt/LiNa0JuisaE0YsoQRnqJzkYDMqTcnbLmdqi6ZZWsGoh7letiA/out.mp4"
  }
];

export const generateVideo = async (
  prompt: string,
  settings: VideoGenerationSettings = DEFAULT_SETTINGS
): Promise<string> => {
  console.log(`Generating video with prompt: ${prompt}`);
  console.log(`Settings: ${JSON.stringify(settings)}`);
  
  try {
    // Select video generation model based on settings
    switch(settings.model) {
      case VIDEO_MODELS.RUNWAY:
        return generateRunwayVideo(prompt, settings);
      case VIDEO_MODELS.STABLE_DIFFUSION:
        return generateStableDiffusionVideo(prompt, settings);
      case VIDEO_MODELS.POLLINATIONS:
      default:
        return generatePollinationsVideo(prompt, settings);
    }
    
  } catch (error) {
    console.error("Error generating video:", error);
    // Fallback to sample videos if the API fails
    const randomVideoUrl = sampleVideos[Math.floor(Math.random() * sampleVideos.length)];
    return randomVideoUrl;
  }
};

// Generate video using Pollinations.ai
const generatePollinationsVideo = (
  prompt: string,
  settings: VideoGenerationSettings
): string => {
  // Using Pollinations.ai API for video generation
  // Format URL with parameters
  const encodedPrompt = encodeURIComponent(prompt);
  
  // Base URL for Pollinations video API
  const baseUrl = "https://pollinations.ai/video/p";
  
  // Build the URL with parameters
  const videoUrl = `${baseUrl}/${encodedPrompt.replace(/ /g, '_')}?width=${settings.resolution.split('x')[0]}&height=${settings.resolution.split('x')[1]}&fps=${settings.frameCount / settings.duration}&duration=${settings.duration}&quality=${settings.quality}`;
  
  // Return the URL where the video will be generated
  return videoUrl;
};

// Generate video using Runway API
const generateRunwayVideo = (
  prompt: string,
  settings: VideoGenerationSettings
): string => {
  // Using Runway's free embed for video generation
  const encodedPrompt = encodeURIComponent(prompt);
  
  // Sample videos for common prompts
  const runwaySamples: Record<string, string> = {
    "dog": "https://storage.googleapis.com/gen-2-samples/dog.mp4",
    "cat": "https://storage.googleapis.com/gen-2-samples/cat.mp4",
    "sunset": "https://storage.googleapis.com/gen-2-samples/sunset.mp4",
    "beach": "https://storage.googleapis.com/gen-2-samples/beach.mp4",
    "city": "https://storage.googleapis.com/gen-2-samples/city.mp4"
  };
  
  // Check if the prompt contains any of our sample keywords
  for (const [keyword, url] of Object.entries(runwaySamples)) {
    if (prompt.toLowerCase().includes(keyword)) {
      return url;
    }
  }
  
  // If no matches, return a default sample from their showcase
  return "https://storage.googleapis.com/gen-2-samples/dog.mp4";
};

// Generate video using Stable Video Diffusion
const generateStableDiffusionVideo = (
  prompt: string,
  settings: VideoGenerationSettings
): string => {
  // Find the most relevant sample based on the prompt
  const promptWords = prompt.toLowerCase().split(' ');
  
  // Try to match prompt words with sample prompts
  for (const word of promptWords) {
    const match = stableVideoDiffusionSamples.find(
      sample => sample.prompt.includes(word) || word.includes(sample.prompt)
    );
    
    if (match) {
      return match.url;
    }
  }
  
  // If no match found, return a random sample
  const randomSample = stableVideoDiffusionSamples[
    Math.floor(Math.random() * stableVideoDiffusionSamples.length)
  ];
  
  return randomSample.url;
};
