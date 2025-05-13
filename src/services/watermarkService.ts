
/**
 * Service to add a watermark to images
 */

/**
 * Adds a watermark with the specified text to an image
 * @param imageUrl URL of the original image
 * @param watermarkText Text to display as watermark
 * @returns Promise resolving to the URL of the image with watermark
 */
export const addWatermark = async (imageUrl: string, watermarkText: string = "GenerationAi"): Promise<string> => {
  return new Promise((resolve, reject) => {
    // Load the original image
    const img = new Image();
    img.crossOrigin = "anonymous";  // Necessary for CORS
    
    img.onload = () => {
      try {
        // Create a canvas to draw the image and watermark
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        
        if (!ctx) {
          reject(new Error("Unable to create canvas context"));
          return;
        }
        
        // Set canvas dimensions to match the image
        canvas.width = img.width;
        canvas.height = img.height;
        
        // Draw the original image
        ctx.drawImage(img, 0, 0);
        
        // Configure watermark style
        const fontSize = Math.max(16, img.width / 25);
        ctx.font = `bold ${fontSize}px 'Arial', sans-serif`;
        ctx.textAlign = "right";
        
        const padding = Math.max(10, img.width / 50);
        const textWidth = ctx.measureText(watermarkText).width;
        const textHeight = fontSize;
        
        // Position in bottom-right corner
        const posX = img.width - padding;
        const posY = img.height - padding;
        
        // Draw background for better visibility
        ctx.fillStyle = "rgba(0, 0, 0, 0.5)";  // Semi-transparent black
        ctx.fillRect(
          posX - textWidth - padding/2,
          posY - textHeight - padding/2,
          textWidth + padding,
          textHeight + padding
        );
        
        // Draw text
        ctx.fillStyle = "rgba(255, 215, 0, 0.9)";  // Golden color
        ctx.fillText(watermarkText, posX, posY);
        
        // Convert canvas to data URL
        const watermarkedImageUrl = canvas.toDataURL("image/png");
        resolve(watermarkedImageUrl);
      } catch (error) {
        console.error("Error adding watermark:", error);
        reject(error);
      }
    };
    
    img.onerror = (error) => {
      console.error("Error loading image for watermarking:", error);
      reject(error);
    };
    
    // Start loading the image
    img.src = imageUrl;
  });
};
