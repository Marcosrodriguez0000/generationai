
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
  console.log(`Transforming image to Pixar style using Pollinations.ai img2img`);
  
  try {
    // Convert file to base64 for processing
    const base64Image = await fileToBase64(imageFile);
    
    // Create form data for img2img transformation
    const formData = new FormData();
    formData.append('image', imageFile);
    
    // Create Pixar-style transformation prompt
    const pixarPrompt = `pixar disney style, 3d cartoon character, same person, same face, same composition, colorful, vibrant, smooth 3d rendering, keep original features, maintain identity`;
    
    // Use Pollinations.ai img2img endpoint with your image as base
    const params = new URLSearchParams({
      prompt: pixarPrompt,
      width: '512',
      height: '512',
      model: 'flux',
      strength: settings.strength.toString(),
      enhance: 'true',
      nologo: 'true',
      private: 'true',
      seed: Math.floor(Math.random() * 1000000).toString()
    });
    
    try {
      // Try the img2img approach first
      const response = await fetch(`https://image.pollinations.ai/prompt/${encodeURIComponent(pixarPrompt)}?${params.toString()}`, {
        method: 'POST',
        body: formData
      });
      
      if (response.ok) {
        const finalUrl = response.url;
        console.log("Generated Pixar-style image URL with img2img:", finalUrl);
        return finalUrl;
      }
    } catch (imgError) {
      console.log("img2img failed, trying alternative approach:", imgError);
    }
    
    // Fallback: Use a more specific prompt that describes the image content
    const alternativePrompt = `transform this into pixar disney 3d cartoon style: same person, same pose, same background, but as 3d animated character, colorful, vibrant, smooth rendering, keep all original details and composition`;
    
    // Alternative approach using base64 in the URL (some services support this)
    const encodedImage = encodeURIComponent(base64Image);
    const fallbackUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(alternativePrompt)}?width=512&height=512&model=flux&enhance=true&nologo=true&private=true&reference=${encodedImage}`;
    
    console.log("Using fallback approach with image reference");
    return fallbackUrl;
    
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
