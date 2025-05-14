
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
let modelFailed = false;

// Initialize the text generation model
const initModel = async () => {
  if (model !== null) return model;
  if (modelLoading) return null;
  
  try {
    modelLoading = true;
    console.log('Initializing text generation model...');
    
    // Try different models in case one fails
    const modelOptions = [
      'distilgpt2',
      'gpt2',
      'Xenova/distilgpt2-spanish'
    ];
    
    // Try each model until one works
    for (const modelName of modelOptions) {
      try {
        console.log(`Trying to load model: ${modelName}`);
        model = await pipeline('text-generation', modelName);
        console.log(`Model ${modelName} initialized successfully`);
        return model;
      } catch (err) {
        console.warn(`Failed to load ${modelName}:`, err);
        // Continue to next model
      }
    }
    
    // If we get here, all models failed
    throw new Error('No se pudo cargar ningún modelo de generación de texto');
  } catch (error) {
    console.error('Error initializing models:', error);
    modelFailed = true;
    throw new Error('Error al cargar el modelo de generación de texto');
  } finally {
    modelLoading = false;
  }
};

// Fallback text generation when model fails to load
const generateFallbackText = (prompt: string, format: string, maxLength: number): string => {
  console.log('Using fallback text generation');
  
  // Basic templates for different formats
  const templates = {
    paragraph: [
      "Este es un texto generado en modo offline. El servicio de generación IA no está disponible en este momento. ",
      "Como alternativa, estamos proporcionando este texto de ejemplo. ",
      "En circunstancias normales, aquí verías un texto personalizado basado en tu prompt: '",
      prompt,
      "'. Por favor, intenta de nuevo más tarde cuando la conexión a Internet esté disponible."
    ],
    story: [
      "Érase una vez, en un mundo donde la IA funcionaba sin conexión, alguien pidió una historia sobre '",
      prompt,
      "'. Lamentablemente, la conexión al modelo de lenguaje falló, así que esta es una historia generada localmente. ",
      "El protagonista esperaba ansiosamente un cuento fascinante, pero tendrá que intentarlo de nuevo cuando la conexión se restablezca."
    ],
    poem: [
      "Poema sin conexión\n\n",
      "Palabras que esperan ser escritas,\n",
      "Sobre '", prompt, "' querías leer.\n",
      "Cuando la red vuelva a estar lista,\n",
      "La IA podrá complacer.\n"
    ],
    essay: [
      "Ensayo preliminar sobre '", prompt, "'\n\n",
      "Este es un texto generado localmente debido a problemas de conexión con el modelo de IA. ",
      "En un ensayo real, exploraríamos a fondo el tema propuesto, analizando sus diversas facetas e implicaciones. ",
      "Le invitamos a intentar generar un ensayo completo cuando la conexión al modelo esté disponible."
    ]
  };
  
  // Select appropriate template
  const template = templates[format] || templates.paragraph;
  
  // Join template parts and limit to maxLength
  return template.join('').substring(0, maxLength);
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
    
    try {
      // Initialize model if not already done
      const textGenerator = await initModel();
      
      // If model initialization succeeded
      if (textGenerator) {
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
        return generatedText;
      }
    } catch (modelError) {
      console.error("Error with model generation:", modelError);
      // Fall through to fallback generation
    }
    
    // Fallback: Generate text without model
    return generateFallbackText(prompt, finalSettings.format, finalSettings.maxLength);
  } catch (error) {
    console.error("Error generating text:", error);
    return `Lo siento, ha ocurrido un error al generar el texto: ${error instanceof Error ? error.message : 'Error desconocido'}. Por favor, intenta de nuevo con un prompt diferente.`;
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
