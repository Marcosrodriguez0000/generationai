
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
    
    // Parámetros para eliminar completamente la marca de agua de Pollinations.ai
    const cropParams = {
      crop: '100p,85p,nowe', // Cortar 0% del ancho pero 15% de la altura desde abajo
    };
    
    // Añadir nuestra propia marca de agua
    const watermarkText = "Generation.AI";
    const watermarkParams = {
      watermark: watermarkText,
      watermarkPosition: 'bottomRight',
      watermarkSize: '25',
      watermarkColor: 'ffffff',
      watermarkBg: '000000e6',
      watermarkPadding: '8'
    };
    
    // Combinar todos los parámetros
    const allParams = new URLSearchParams({
      ...cropParams,
      ...watermarkParams,
      width: url.searchParams.get('width') || '512',
      height: url.searchParams.get('height') || '512',
      quality: url.searchParams.get('quality') || '7',
      noStore: url.searchParams.get('noStore') || 'true'
    });
    
    // Construir la nueva URL con nuestra marca de agua y configuración de recorte
    const processedUrl = `${baseUrl}${promptPart}?${allParams.toString()}`;
    
    return processedUrl;
  } catch (error) {
    // Si la URL es inválida, devolver la URL original
    console.error("Error processing image:", error);
    return imageUrl;
  }
};
