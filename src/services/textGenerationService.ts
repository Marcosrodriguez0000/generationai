
// Text generation service using Pollinations.ai
import { addWatermark } from './watermarkService';

export interface TextGenerationSettings {
  maxLength?: number;
  temperature?: number;
  format?: string;
}

// Default settings
const DEFAULT_SETTINGS: TextGenerationSettings = {
  maxLength: 500,
  temperature: 0.7,
  format: 'paragraph'
};

export const generateTextWithPollinations = async (
  prompt: string,
  settings: TextGenerationSettings = {}
): Promise<string> => {
  console.log(`Generating text with prompt: ${prompt}`);
  
  try {
    // Combine default settings with user settings
    const finalSettings = {
      ...DEFAULT_SETTINGS,
      ...settings
    };
    
    console.log(`Settings: ${JSON.stringify(finalSettings)}`);
    
    // Encode the prompt for URL
    const encodedPrompt = encodeURIComponent(prompt);
    
    // Add a randomness parameter to prevent caching
    const cacheBuster = Date.now();
    
    // Create a URL for text generation
    // Note: Using the Pollinations API for text generation
    const textApiUrl = `https://image.pollinations.ai/prompt/${encodedPrompt}?width=512&height=512&noCache=${cacheBuster}&textOnly=true&maxLength=${finalSettings.maxLength}&temperature=${finalSettings.temperature}`;
    
    console.log(`Generated text API URL: ${textApiUrl}`);
    
    // Simulate API call for text generation
    // In a real implementation, this would be an actual fetch call to the API
    return new Promise((resolve) => {
      setTimeout(() => {
        // Sample responses based on different prompts
        const sampleResponses: Record<string, string> = {
          default: `Aquí tienes un texto generado para el prompt: "${prompt}". La inteligencia artificial está revolucionando cómo creamos contenido, permitiéndonos generar textos, imágenes y videos de forma automática basados en descripciones simples. Este texto es un ejemplo de cómo Pollinations puede generar contenido textual personalizado para diferentes necesidades creativas.`,
          
          historia: `Había una vez en un pequeño pueblo costero, un faro que nadie podía ver. No porque fuera invisible, sino porque todos los habitantes habían olvidado mirar hacia el mar. Sus vidas estaban tan enfocadas en la rutina diaria que ya nadie recordaba la importancia de aquella torre luminosa. ${prompt} se convirtió en la primera persona en generaciones que decidió visitar el acantilado donde se encontraba el faro. Lo que descubrió allí cambiaría para siempre la historia del pueblo...`,
          
          poema: `Versos de luz y sombra\nEn el lienzo del tiempo,\nDonde ${prompt} encuentra\nEcos de un sentimiento.\n\nPalabras que danzan,\nEntre sueños y realidad,\nHistorias que avanzan,\nHacia la eternidad.`,
          
          descripcion: `${prompt} se presenta como una fusión perfecta entre tradición e innovación. Con líneas elegantes que evocan un sentido de movimiento perpetuo, cada detalle ha sido cuidadosamente diseñado para cautivar los sentidos. La textura combina elementos contrastantes que, sin embargo, coexisten en perfecta armonía, creando una experiencia visual rica y multifacética.`,
          
          ensayo: `El concepto de ${prompt} ha evolucionado significativamente a lo largo de las últimas décadas. Diversos estudios sugieren que su impacto en la sociedad contemporánea es mucho más profundo de lo que inicialmente se consideraba. Las investigaciones recientes apuntan a una correlación directa entre su desarrollo y los cambios paradigmáticos en nuestros modelos de interacción social. Este ensayo explora las diversas facetas de esta relación y propone un marco teórico para su análisis futuro.`
        };
        
        // Determine which response to use based on the prompt
        let responseText = sampleResponses.default;
        
        if (prompt.toLowerCase().includes('historia') || prompt.toLowerCase().includes('cuento')) {
          responseText = sampleResponses.historia;
        } else if (prompt.toLowerCase().includes('poema') || prompt.toLowerCase().includes('verso')) {
          responseText = sampleResponses.poema;
        } else if (prompt.toLowerCase().includes('describe') || prompt.toLowerCase().includes('descripción')) {
          responseText = sampleResponses.descripcion;
        } else if (prompt.toLowerCase().includes('ensayo') || prompt.toLowerCase().includes('análisis')) {
          responseText = sampleResponses.ensayo;
        }
        
        resolve(responseText);
      }, 1500); // Simulate API delay
    });
    
  } catch (error) {
    console.error("Error generating text:", error);
    return "Lo siento, ha ocurrido un error al generar el texto. Por favor, intenta de nuevo con un prompt diferente.";
  }
};
