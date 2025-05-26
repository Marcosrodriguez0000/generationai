
// Replicate service for Pixar-style image transformation
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
  console.log(`Transforming image to Pixar style using Replicate API`);
  
  try {
    // Convert file to base64
    const base64Image = await fileToBase64(imageFile);
    
    // Replicate API endpoint for image transformation
    const apiUrl = 'https://api.replicate.com/v1/predictions';
    
    // Using a popular cartoon/anime style model
    const modelVersion = "cjwbw/anything-v3.0:09a5805203f4c12da649ec1923bb7729517ca25fcac790e640eaa9ed66573b65";
    
    const requestBody = {
      version: modelVersion,
      input: {
        image: base64Image,
        prompt: "pixar style, disney cartoon, 3d animated character, colorful, high quality",
        negative_prompt: "realistic, photograph, dark, blurry, low quality",
        num_inference_steps: 20,
        guidance_scale: 7.5,
        strength: settings.strength
      }
    };
    
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Token YOUR_REPLICATE_API_TOKEN', // This needs to be configured
      },
      body: JSON.stringify(requestBody),
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const prediction = await response.json();
    
    // Poll for completion
    const result = await pollForCompletion(prediction.id);
    
    return result.output?.[0] || base64Image; // Return first output image or fallback to original
    
  } catch (error) {
    console.error("Error transforming image with Replicate:", error);
    // For development, return the original image as base64
    return await fileToBase64(imageFile);
  }
};

// Poll Replicate API for prediction completion
const pollForCompletion = async (predictionId: string): Promise<any> => {
  const maxAttempts = 30; // 5 minutes max
  let attempts = 0;
  
  while (attempts < maxAttempts) {
    try {
      const response = await fetch(`https://api.replicate.com/v1/predictions/${predictionId}`, {
        headers: {
          'Authorization': 'Token YOUR_REPLICATE_API_TOKEN',
        },
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const prediction = await response.json();
      
      if (prediction.status === 'succeeded') {
        return prediction;
      } else if (prediction.status === 'failed') {
        throw new Error('Prediction failed');
      }
      
      // Wait 10 seconds before next poll
      await new Promise(resolve => setTimeout(resolve, 10000));
      attempts++;
      
    } catch (error) {
      console.error('Error polling prediction:', error);
      throw error;
    }
  }
  
  throw new Error('Prediction timed out');
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
