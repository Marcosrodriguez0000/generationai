
/**
 * Service to add watermark to generated images and remove external watermarks
 */

// Function to add our watermark and remove existing watermarks
export const addWatermark = (imageUrl: string): string => {
  try {
    const url = new URL(imageUrl);
    
    // Extract the base URL and prompt parameters
    const baseUrl = `${url.origin}/prompt/`;
    const promptPart = url.pathname.replace('/prompt/', '');
    
    // Parameters to specify a crop that completely removes the Pollinations.ai watermark
    // Using a much more aggressive crop at the bottom of the image
    const cropParams = {
      crop: '100p,90p,nowe', // Crop 0% from width but 10% from bottom height
    };
    
    // Add our own watermark text
    const watermarkText = "Generation.AI";
    const watermarkParams = {
      watermark: watermarkText,
      watermarkPosition: 'bottomRight',
      watermarkSize: '30',
      watermarkColor: 'd8af32',
      watermarkBg: '000000e6',
      watermarkPadding: '10'
    };
    
    // Combine all parameters
    const allParams = new URLSearchParams({
      ...cropParams,
      ...watermarkParams,
      width: url.searchParams.get('width') || '512',
      height: url.searchParams.get('height') || '512',
      quality: url.searchParams.get('quality') || '7',
      noStore: url.searchParams.get('noStore') || 'true'
    });
    
    // Construct the new URL with both our watermark and crop settings
    const processedUrl = `${baseUrl}${promptPart}?${allParams.toString()}`;
    
    return processedUrl;
  } catch (error) {
    // If invalid URL, return original URL
    console.error("Error processing image:", error);
    return imageUrl;
  }
};
