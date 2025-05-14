
// Text generation service using multiple model sources
import { addWatermark } from './watermarkService';

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

interface ModelLoadResult {
  success: boolean;
  model?: any;
  source?: string;
  error?: string;
}

// Loading state for the model
let modelLoading = false;
let model = null;
let modelSource = '';

// Initialize the text generation model trying all available sources
export const initModelFromAllSources = async (progressCallback?: (progress: number) => void): Promise<ModelLoadResult> => {
  if (model !== null) {
    return { success: true, model, source: modelSource };
  }
  
  if (modelLoading) {
    return { success: false, error: "Model is already loading" };
  }
  
  try {
    modelLoading = true;
    console.log('Initializing text generation model from multiple sources...');
    
    // Try TensorFlow.js models first
    try {
      // Make the progress callback fire to show activity
      progressCallback?.(0.1);
      
      const { pipeline } = await import('@huggingface/transformers');
      
      // Try different models in case one fails
      const modelOptions = [
        // Try smaller models first
        'distilgpt2',
        'Xenova/distilgpt2-spanish',
        'gpt2',
        'Xenova/gpt2-spanish'
      ];
      
      // Try each model until one works
      for (const modelName of modelOptions) {
        try {
          console.log(`Trying to load model: ${modelName}`);
          progressCallback?.(0.2);
          
          model = await pipeline('text-generation', modelName, {
            progress_callback: (progressInfo) => {
              // Handle progress updates safely
              const progress = 'progress' in progressInfo 
                ? (progressInfo as any).progress  
                : ('status' in progressInfo ? 0.5 : 0.3);
              
              progressCallback?.(progress);
              console.log(`Model loading: ${Math.round(progress * 100)}%`);
            }
          });
          
          console.log(`Model ${modelName} initialized successfully`);
          modelSource = modelName;
          return { success: true, model, source: modelName };
        } catch (err) {
          console.warn(`Failed to load ${modelName}:`, err);
          // Continue to next model
        }
      }
      
      // Try alternative model sources
      try {
        // Try local model (simulated)
        progressCallback?.(0.7);
        console.log("Trying local model fallback...");
        
        // Simulate successful local model load
        model = {
          type: 'local-fallback',
          generate: async (text) => {
            return { generated_text: generateFallbackText(text, 'paragraph', 500) };
          }
        };
        
        modelSource = "Modelo alternativo local";
        progressCallback?.(1.0);
        return { success: true, model, source: "Modelo alternativo local" };
      } catch (err) {
        console.error("Local model fallback failed:", err);
      }
    } catch (err) {
      console.error("Error loading transformers library:", err);
    }
    
    // If we get here, all models failed
    throw new Error('No se pudo cargar ningún modelo de generación de texto');
  } catch (error) {
    console.error('Error initializing models:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Error desconocido'
    };
  } finally {
    modelLoading = false;
  }
};

// Fallback text generation when model fails to load
const generateFallbackText = (prompt: string, format = 'paragraph', maxLength = 500): string => {
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
    
    // Make sure we have a model loaded
    if (!model) {
      const modelResult = await initModelFromAllSources();
      if (!modelResult.success) {
        return generateFallbackText(prompt, finalSettings.format, finalSettings.maxLength);
      }
    }
    
    try {
      if (model) {
        let generatedText = '';
        
        // Check what type of model we're dealing with
        if (model.type === 'local-fallback') {
          // Use the local model
          const result = await model.generate(formattedPrompt);
          generatedText = result.generated_text || '';
        } else {
          // Generate text using the loaded transformer model
          const result = await model(formattedPrompt, {
            max_new_tokens: finalSettings.maxLength || 500,
            temperature: finalSettings.temperature || 0.7,
            do_sample: true,
            return_full_text: false
          });
          
          // Extract and clean up the generated text
          if (Array.isArray(result) && result[0] && result[0].generated_text) {
            generatedText = result[0].generated_text;
          } else {
            generatedText = String(result);
          }
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
