
// Image generation service using Hugging Face API
// https://huggingface.co/docs/api-inference/detailed_parameters#text-to-image

export interface GenerationSettings {
  resolution: string;
  quality: number;
}

// Fallback sample images in case API fails
const sampleImages = [
  "https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA",
  "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA",
  "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA",
  "https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA"
];

export const generateImage = async (
  prompt: string,
  settings: GenerationSettings,
  apiKey?: string
): Promise<string> => {
  console.log(`Generating image with prompt: ${prompt}`);
  console.log(`Settings: ${JSON.stringify(settings)}`);
  
  try {
    // If no API key is provided, fall back to sample images
    if (!apiKey) {
      throw new Error("No API key provided");
    }

    // Convert resolution string to numbers for the API call
    const [width, height] = settings.resolution.split("x").map(Number);
    
    // Use HuggingFace inference API (stable-diffusion-2)
    const response = await fetch(
      "https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-2",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          inputs: prompt,
          parameters: {
            width: width,
            height: height,
            guidance_scale: settings.quality, // Using quality as guidance scale
          }
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    // The API returns the image directly as binary data
    const blob = await response.blob();
    return URL.createObjectURL(blob);
  } catch (error) {
    console.error("Error generating image:", error);
    // Fallback to sample images if the API fails
    const randomImageUrl = sampleImages[Math.floor(Math.random() * sampleImages.length)];
    return randomImageUrl;
  }
};
