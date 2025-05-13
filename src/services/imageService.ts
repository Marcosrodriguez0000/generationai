
// This is a mock service to simulate image generation
// In a real application, this would connect to an API or Python backend

export interface GenerationSettings {
  resolution: string;
  quality: number;
}

// Sample images to simulate generation
const sampleImages = [
  "https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA",
  "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA",
  "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA",
  "https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA"
];

export const generateImage = async (
  prompt: string,
  settings: GenerationSettings
): Promise<string> => {
  console.log(`Generating image with prompt: ${prompt}`);
  console.log(`Settings: ${JSON.stringify(settings)}`);
  
  // Simulate API delay
  return new Promise((resolve) => {
    setTimeout(() => {
      // In a real application, this would call a Python API
      const randomImageUrl = sampleImages[Math.floor(Math.random() * sampleImages.length)];
      resolve(randomImageUrl);
    }, 2000); // 2 second delay to simulate processing
  });
};
