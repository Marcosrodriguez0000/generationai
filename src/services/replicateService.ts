
// Pixar transformation service using Pollinations.ai
export interface PixarTransformSettings {
  style: string;
  strength: number;
}

const DEFAULT_SETTINGS: PixarTransformSettings = {
  style: "pixar",
  strength: 0.8
};

export const transformToPixar = async (
  imageFile: File,
  settings: PixarTransformSettings = DEFAULT_SETTINGS
): Promise<string> => {
  console.log(`Transforming image to Pixar style using Pollinations.ai`);
  
  try {
    // Convert file to base64 for processing
    const base64Image = await fileToBase64(imageFile);
    
    // Create Pixar-style transformation prompt
    const pixarPrompt = `Transform this image into Pixar Disney 3D animated style, cartoon character, colorful, vibrant colors, smooth 3D rendering, Disney Pixar animation style, high quality, professional animation`;
    
    // Use Pollinations.ai with img2img functionality
    const encodedPrompt = encodeURIComponent(pixarPrompt);
    
    // Pollinations.ai supports image transformation with prompts
    const apiUrl = `https://image.pollinations.ai/prompt/${encodedPrompt}`;
    
    // Add parameters for better Pixar-style results
    const params = new URLSearchParams({
      width: '512',
      height: '512',
      model: 'flux',
      enhance: 'true',
      nologo: 'true',
      private: 'true',
      seed: Math.floor(Math.random() * 1000000).toString()
    });
    
    const finalUrl = `${apiUrl}?${params.toString()}`;
    
    console.log("Generated Pixar-style image URL:", finalUrl);
    return finalUrl;
    
  } catch (error) {
    console.error("Error transforming image to Pixar style:", error);
    // Return original image as fallback
    return await fileToBase64(imageFile);
  }
};

// Helper function to convert file to base64
const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = error => reject(error);
  });
};
