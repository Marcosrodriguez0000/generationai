
/**
 * Service to add watermark to generated images
 */

// Function to add our watermark over any existing watermark
export const addWatermark = (imageUrl: string): string => {
  // Create a URL object to add parameters
  try {
    const url = new URL(imageUrl);
    
    // Add watermark text (will be rendered by image.pollinations.ai or any proxy we use)
    const watermarkText = "Generation.AI";
    const watermarkParams = new URLSearchParams({
      watermark: watermarkText,
      watermarkPosition: 'bottomRight', // Position of our watermark
      watermarkSize: '30',              // Size of the watermark text
      watermarkColor: 'd8af32',         // Gold color (to match our theme)
      watermarkBg: '000000e6',          // Semi-transparent black background
      watermarkPadding: '10'            // Padding around the watermark text
    });
    
    // Append parameters to the URL
    const urlWithWatermark = `${url.toString()}${url.search ? '&' : '?'}${watermarkParams.toString()}`;
    
    return urlWithWatermark;
  } catch (error) {
    // If invalid URL, return original URL
    console.error("Error adding watermark:", error);
    return imageUrl;
  }
};
