
// Text generation service using Hugging Face Transformers.js
import { addWatermark } from './watermarkService';
import { pipeline } from '@huggingface/transformers';

export interface TextGenerationSettings {
  maxLength?: number;
  temperature?: number;
  format?: string;
  prompt?: string;
}

// Default settings
const DEFAULT_SETTINGS: TextGenerationSettings = {
  maxLength: 500,
  temperature: 0.7,
  format: 'paragraph'
};

// Loading state for the model
let modelLoading = false;
let model = null;

// Initialize the text generation model
const initModel = async () => {
  if (model !== null || modelLoading) return model;
  
  try {
    modelLoading = true;
    console.log('Initializing text generation model...');
    
    // Using a lightweight model that works well in the browser
    model = await pipeline('text-generation', 'Xenova/distilgpt2-spanish');
    console.log('Model initialized successfully');
    return model;
  } catch (error) {
    console.error('Error initializing model:', error);
    throw new Error('Error al cargar el modelo de generación de texto');
  } finally {
    modelLoading = false;
  }
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
    
    if (prompt.trim().length === 0) {
      return "Por favor proporciona un prompt para generar texto.";
    }
    
    // Format prompt based on the selected format
    const formattedPrompt = formatPromptForModel(prompt, finalSettings.format || 'paragraph');
    
    // Initialize model if not already done
    const textGenerator = await initModel();
    
    if (!textGenerator) {
      throw new Error("El modelo de generación de texto no se pudo cargar correctamente.");
    }
    
    // Generate text using the model
    const result = await textGenerator(formattedPrompt, {
      max_new_tokens: finalSettings.maxLength,
      temperature: finalSettings.temperature,
      do_sample: true,
      return_full_text: false
    });
    
    // Extract and clean up the generated text
    let generatedText = '';
    if (Array.isArray(result) && result[0] && result[0].generated_text) {
      generatedText = result[0].generated_text;
    } else {
      generatedText = String(result);
    }
    
    // Clean up the output text
    generatedText = generatedText.trim();
    
    // Add watermark for attribution
    return generatedText;
  } catch (error) {
    console.error("Error generating text:", error);
    return `Lo siento, ha ocurrido un error al generar el texto: ${error.message}. Por favor, intenta de nuevo con un prompt diferente.`;
  }
};

// Format prompt based on the selected format
function formatPromptForModel(prompt: string, format: string): string {
  switch (format) {
    case 'story':
      return `Escribe una breve historia sobre: ${prompt}`;
    case 'poem':
      return `Escribe un poema sobre: ${prompt}`;
    case 'essay':
      return `Escribe un breve ensayo sobre: ${prompt}`;
    default:
      return `Escribe un párrafo sobre: ${prompt}`;
  }
}
