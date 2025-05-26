
// Flux AI service for Pixar-style image transformation
export interface FluxTransformSettings {
  style: string;
  strength: number;
}

const DEFAULT_SETTINGS: FluxTransformSettings = {
  style: "pixar",
  strength: 0.8
};

export const transformToPixar = async (
  imageFile: File,
  settings: FluxTransformSettings = DEFAULT_SETTINGS
): Promise<string> => {
  console.log(`Transforming image to Pixar style using Flux AI`);
  
  try {
    // Convert file to base64
    const base64Image = await fileToBase64(imageFile);
    
    // For now, we'll use a placeholder API endpoint
    // This needs to be replaced with the actual Flux AI API endpoint
    const apiUrl = 'https://api.flux-ai.com/v1/transform'; // Placeholder URL
    
    const formData = new FormData();
    formData.append('image', imageFile);
    formData.append('style', 'pixar_cartoon');
    formData.append('strength', settings.strength.toString());
    
    const response = await fetch(apiUrl, {
      method: 'POST',
      body: formData,
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const result = await response.json();
    
    // Return the transformed image URL
    return result.imageUrl || result.url || base64Image; // Fallback to original if API fails
    
  } catch (error) {
    console.error("Error transforming image with Flux AI:", error);
    // For development, return the original image as base64
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
