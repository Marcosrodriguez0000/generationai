
// Text generation service using Hugging Face Inference API
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

// Hugging Face API endpoint
const HUGGINGFACE_API = 'https://api-inference.huggingface.co/models/';

// We'll use a multilingual model that's good with Spanish
const TEXT_GENERATION_MODEL = 'mistralai/Mistral-7B-Instruct-v0.2';

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
    
    // For demo purposes without an API key, we'll simulate a real API call
    // In a production app, you would use a real API key
    const demoMode = true;
    
    if (demoMode) {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      // Generate text based on the prompt and format
      let generatedText = '';
      
      if (prompt.trim().length === 0) {
        return "Por favor proporciona un prompt para generar texto.";
      }
      
      // Create text based on the selected format and prompt
      switch (finalSettings.format) {
        case 'story':
          generatedText = generateStory(prompt, finalSettings.maxLength || 500);
          break;
        case 'poem':
          generatedText = generatePoem(prompt, finalSettings.maxLength || 500);
          break;
        case 'essay':
          generatedText = generateEssay(prompt, finalSettings.maxLength || 500);
          break;
        default:
          generatedText = generateParagraph(prompt, finalSettings.maxLength || 500);
      }
      
      // Apply temperature (creativity) - higher temperature means more variations
      if (finalSettings.temperature && finalSettings.temperature < 0.5) {
        generatedText = generatedText.replace(/\bpodría\b/g, "definitivamente");
        generatedText = generatedText.replace(/\btal vez\b/g, "ciertamente");
        generatedText = generatedText.replace(/\bquizás\b/g, "sin duda");
      } else if (finalSettings.temperature && finalSettings.temperature > 0.8) {
        generatedText = generatedText.replace(/\bes\b/g, "podría ser");
        generatedText = generatedText.replace(/\bsin duda\b/g, "quizás");
        generatedText = generatedText.replace(/\bdefinitivamente\b/g, "posiblemente");
      }
      
      return generatedText;
    }
    
    // For a real implementation, use the Hugging Face API
    const response = await fetch(`${HUGGINGFACE_API}${TEXT_GENERATION_MODEL}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // In a production app, you would include your API key here
        // 'Authorization': 'Bearer YOUR_HUGGINGFACE_API_KEY'
      },
      body: JSON.stringify({
        inputs: formatPromptForModel(prompt, finalSettings.format || 'paragraph'),
        parameters: {
          max_new_tokens: finalSettings.maxLength || 500,
          temperature: finalSettings.temperature || 0.7,
          do_sample: true,
          return_full_text: false,
        }
      })
    });

    if (!response.ok) {
      throw new Error(`Error en la API: ${response.status}`);
    }

    const result = await response.json();
    
    // Handle different response formats from the API
    let text;
    if (Array.isArray(result) && result[0] && result[0].generated_text) {
      text = result[0].generated_text;
    } else if (typeof result === 'object' && result.generated_text) {
      text = result.generated_text;
    } else {
      text = String(result);
    }
    
    return text;
    
  } catch (error) {
    console.error("Error generating text:", error);
    return "Lo siento, ha ocurrido un error al generar el texto. Por favor, intenta de nuevo con un prompt diferente.";
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

// Helper functions for demo mode
function generateParagraph(prompt: string, maxLength: number): string {
  const baseTexts = [
    `El tema de ${prompt} ha sido objeto de intenso debate en los últimos años. Algunos expertos sugieren que su impacto en la sociedad moderna es mucho más profundo de lo que inicialmente se pensaba. Al analizar las tendencias recientes, podemos observar patrones emergentes que desafían nuestras concepciones previas. Las investigaciones más recientes apuntan a nuevas posibilidades y enfoques innovadores que podrían transformar nuestra comprensión de este fascinante tema.`,
    
    `Al explorar ${prompt}, es fundamental considerar los múltiples aspectos que lo componen. Desde una perspectiva histórica, podemos trazar su evolución a través de diferentes épocas y contextos culturales. Lo que hace que este tema sea particularmente interesante es su capacidad para adaptarse y transformarse en respuesta a las cambiantes circunstancias sociales y tecnológicas. Este dinamismo inherente nos invita a reexaminar constantemente nuestras suposiciones y a desarrollar nuevos marcos conceptuales.`,
    
    `${prompt} representa uno de los desafíos más significativos y oportunidades de nuestro tiempo. A medida que navegamos por un mundo cada vez más complejo e interconectado, la importancia de comprender sus matices y implicaciones crece exponencialmente. Los expertos en el campo han identificado diversas dimensiones que requieren un análisis cuidadoso y una consideración profunda. Este tema no solo afecta a individuos, sino que tiene ramificaciones para comunidades enteras y para la sociedad global.`
  ];
  
  // Seleccionar aleatoriamente uno de los textos base
  const selectedText = baseTexts[Math.floor(Math.random() * baseTexts.length)];
  
  // Asegurar que el texto no exceda la longitud máxima
  if (selectedText.length > maxLength) {
    return selectedText.substring(0, maxLength) + "...";
  }
  
  return selectedText;
}

function generateStory(prompt: string, maxLength: number): string {
  const stories = [
    `Había una vez en un pequeño pueblo llamado Esperanza, donde ${prompt} era el tema de todas las conversaciones. Ana, una joven curiosa de ojos brillantes, decidió investigar más a fondo. Una mañana de primavera, mientras caminaba por el bosque cercano, se encontró con un anciano sentado bajo un roble centenario. "He estado esperándote", dijo el anciano con una sonrisa enigmática. "Has venido a preguntar sobre ${prompt}, ¿verdad?". Ana asintió, sorprendida. "Siéntate", continuó el anciano, "te contaré una historia que ha sido guardada por generaciones en mi familia...".`,
    
    `En el año 2150, cuando la humanidad finalmente había establecido colonias en Marte, el descubrimiento de ${prompt} cambió todo lo que creíamos saber sobre el universo. Carlos, un ingeniero de terraformación con una reputación de excéntrico, fue el primero en notar las extrañas anomalías en los datos. Sus superiores ignoraron sus informes, considerándolos producto de su imaginación. Determinado a demostrar que estaba en lo cierto, Carlos emprendió una peligrosa expedición al sector inexplorado donde había detectado las señales. Lo que encontró allí desafiaría para siempre nuestra comprensión de la realidad...`,
    
    `La pequeña librería en la esquina de la calle Roble y avenida Cerezo guardaba un secreto relacionado con ${prompt}. María, la nueva propietaria, descubrió un libro antiguo con páginas en blanco escondido detrás de un panel suelto. Al tocarlo, las páginas comenzaron a llenarse con texto ante sus ojos asombrados. "Este libro contiene respuestas", decía la primera página, "pero solo para aquellos que saben formular las preguntas correctas". Intrigada, María comenzó un viaje que la llevaría a descubrir verdades ocultas durante siglos...`
  ];
  
  const selectedStory = stories[Math.floor(Math.random() * stories.length)];
  
  if (selectedStory.length > maxLength) {
    return selectedStory.substring(0, maxLength) + "...";
  }
  
  return selectedStory;
}

function generatePoem(prompt: string, maxLength: number): string {
  const poems = [
    `Versos de luz y sombra\nEn el lienzo del tiempo,\nDonde ${prompt} encuentra\nEcos de un sentimiento.\n\nPalabras que danzan,\nEntre sueños y realidad,\nHistorias que avanzan,\nHacia la eternidad.\n\nMisterios del alma,\nSecretos por descubrir,\nEn ${prompt} halla calma,\nEl corazón al latir.`,
    
    `Entre silencios y memorias\nSe desliza ${prompt} como río,\nCon sus aguas murmurantes\nY su cauce siempre vivo.\n\nNo hay fronteras para el pensamiento\nQue vuela libre hacia lo desconocido,\nDescubriendo en cada verso\nUn universo recién nacido.\n\nAsí es ${prompt} en esencia,\nUn enigma por resolver,\nUna eterna presencia\nQue nos invita a crecer.`,
    
    `He buscado en los confines\nDel tiempo y del espacio,\nLa esencia de ${prompt}\nQue habita en lo profundo.\n\nSus colores se entrelazan\nCon los hilos del destino,\nTejiendo tapices de sueños\nEn el horizonte cristalino.\n\nY al final del camino,\nCuando el sol se oculta lento,\nAún perdura la magia\nDe ${prompt} en el viento.`
  ];
  
  const selectedPoem = poems[Math.floor(Math.random() * poems.length)];
  
  if (selectedPoem.length > maxLength) {
    return selectedPoem.substring(0, maxLength) + "...";
  }
  
  return selectedPoem;
}

function generateEssay(prompt: string, maxLength: number): string {
  const essays = [
    `El concepto de ${prompt} ha evolucionado significativamente a lo largo de las últimas décadas. Diversos estudios sugieren que su impacto en la sociedad contemporánea es mucho más profundo de lo que inicialmente se consideraba. Las investigaciones recientes apuntan a una correlación directa entre su desarrollo y los cambios paradigmáticos en nuestros modelos de interacción social.\n\nEn primer lugar, es fundamental considerar el contexto histórico en el que ${prompt} emergió como un tema de relevancia. Los antecedentes nos muestran que su génesis estuvo marcada por una confluencia de factores sociales, económicos y tecnológicos. Este enfoque multifacético es esencial para comprender su complejidad inherente.\n\nPor otra parte, las implicaciones éticas de ${prompt} no pueden ser ignoradas. El debate académico actual se centra en cómo equilibrar su potencial transformador con la necesidad de establecer marcos regulatorios adecuados. Esta tensión refleja la dualidad inherente a muchos avances significativos en la historia humana.`,
    
    `Al analizar ${prompt} desde una perspectiva interdisciplinaria, emergen patrones y conexiones que de otro modo podrían pasar desapercibidos. La literatura especializada ha identificado al menos tres dimensiones principales que merecen atención detallada.\n\nLa primera dimensión se relaciona con los aspectos estructurales de ${prompt}, que constituyen su arquitectura fundamental. Estos elementos proporcionan estabilidad y coherencia, permitiendo su desarrollo sistemático a lo largo del tiempo. Sin esta base sólida, sería imposible construir las capas más sofisticadas que observamos en la actualidad.\n\nLa segunda dimensión abarca los procesos dinámicos que caracterizan a ${prompt} en acción. Lejos de ser un constructo estático, se manifiesta a través de interacciones complejas y adaptativas. Esta cualidad le confiere una notable resiliencia frente a entornos cambiantes y desafíos emergentes.\n\nFinalmente, la tercera dimensión se refiere a las manifestaciones contextuales de ${prompt} en diferentes ámbitos de aplicación. Su versatilidad le permite trascender fronteras disciplinarias y generar valor en campos aparentemente dispares.`,
    
    `En el panorama académico contemporáneo, pocos temas han generado tanto interés y controversia como ${prompt}. Para abordar este fenómeno con el rigor que merece, es necesario adoptar una metodología que integre perspectivas cuantitativas y cualitativas.\n\nDesde el punto de vista cuantitativo, los datos disponibles revelan tendencias significativas en la evolución de ${prompt} a lo largo del tiempo. Los análisis estadísticos sugieren correlaciones robustas con indicadores de desarrollo social y económico, aunque la causalidad sigue siendo objeto de debate entre los especialistas.\n\nLa aproximación cualitativa, por su parte, nos permite acceder a las dimensiones experienciales y subjetivas de ${prompt}. Los estudios etnográficos y fenomenológicos han documentado cómo diferentes comunidades interpretan y se apropian de este concepto, adaptándolo a sus realidades específicas y dotándolo de significados culturalmente situados.\n\nLa síntesis de ambas perspectivas nos ofrece una visión más completa y matizada de ${prompt}, reconociendo tanto sus regularidades estructurales como su flexibilidad interpretativa.`
  ];
  
  const selectedEssay = essays[Math.floor(Math.random() * essays.length)];
  
  if (selectedEssay.length > maxLength) {
    return selectedEssay.substring(0, maxLength) + "...";
  }
  
  return selectedEssay;
}
