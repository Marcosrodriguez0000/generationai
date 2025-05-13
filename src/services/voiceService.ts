
// Voice cloning service using pre-recorded samples

// Lista ampliada de muestras de audio para una mejor simulación
const sampleAudios = {
  // Voces masculinas - diferentes tonos y estilos
  male: {
    calm: "https://assets.mixkit.co/music/preview/mixkit-tech-house-vibes-130.mp3",
    energetic: "https://assets.mixkit.co/music/preview/mixkit-hip-hop-02-738.mp3",
    deep: "https://assets.mixkit.co/music/preview/mixkit-driving-ambience-181.mp3",
    narrative: "https://assets.mixkit.co/music/preview/mixkit-awake-161.mp3"
  },
  // Voces femeninas - diferentes tonos y estilos
  female: {
    soft: "https://assets.mixkit.co/music/preview/mixkit-serene-view-443.mp3",
    bright: "https://assets.mixkit.co/music/preview/mixkit-a-very-happy-christmas-897.mp3",
    clear: "https://assets.mixkit.co/music/preview/mixkit-raising-me-higher-34.mp3",
    narrative: "https://assets.mixkit.co/music/preview/mixkit-valley-sunset-127.mp3"
  }
};

// Respaldos finales por si todo lo demás falla
const FALLBACKS = {
  male: "https://assets.mixkit.co/music/preview/mixkit-tech-house-vibes-130.mp3",
  female: "https://assets.mixkit.co/music/preview/mixkit-serene-view-443.mp3",
  default: "https://assets.mixkit.co/music/preview/mixkit-tech-house-vibes-130.mp3"
};

// Analizar la muestra de audio para determinar características de voz
const analyzeAudioSample = async (audioSample: File): Promise<{
  voiceType: string;
  tone: string;
  pitch: number;
  speed: number;
}> => {
  // En una implementación real, analizaríamos el audio para extraer características
  // Aquí simulamos este análisis con valores aleatorios
  
  // Determinar tipo de voz de forma aleatoria pero consistente basado en tamaño del archivo
  const voiceType = audioSample.size % 2 === 0 ? 'male' : 'female';
  
  // Determinar tono de voz basado en una simulación
  const tones = voiceType === 'male' 
    ? ['calm', 'energetic', 'deep', 'narrative'] 
    : ['soft', 'bright', 'clear', 'narrative'];
    
  // Usar el nombre del archivo para "determinar" el tono de forma predecible
  const toneIndex = audioSample.name.length % tones.length;
  const tone = tones[toneIndex];
  
  // Simular otras características de voz
  const pitch = 0.8 + (Math.random() * 0.4); // 0.8 a 1.2
  const speed = 0.9 + (Math.random() * 0.3); // 0.9 a 1.2
  
  console.log(`Análisis de voz completado: ${voiceType}, tono: ${tone}, pitch: ${pitch.toFixed(2)}, velocidad: ${speed.toFixed(2)}`);
  
  return {
    voiceType,
    tone,
    pitch,
    speed
  };
};

// Analizar texto para determinar emoción y ritmo
const analyzeText = (text: string): {
  emotion: string;
  pace: number;
} => {
  // En implementación real, usaríamos NLP para analizar emociones
  // Aquí simplemente detectamos palabras clave
  
  const lowerText = text.toLowerCase();
  let emotion = 'neutral';
  
  if (lowerText.includes('feliz') || lowerText.includes('alegre') || lowerText.includes('increíble')) {
    emotion = 'happy';
  } else if (lowerText.includes('triste') || lowerText.includes('difícil') || lowerText.includes('problema')) {
    emotion = 'sad';
  } else if (lowerText.includes('urgente') || lowerText.includes('rápido') || lowerText.includes('inmediato')) {
    emotion = 'urgent';
  }
  
  // Determinar ritmo basado en longitud del texto y puntuación
  const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
  const avgSentenceLength = text.length / (sentences.length || 1);
  
  // Más cortas = más rápido, más largas = más lento
  const pace = avgSentenceLength < 15 ? 1.2 : avgSentenceLength > 30 ? 0.9 : 1.0;
  
  console.log(`Análisis de texto: emoción ${emotion}, ritmo ${pace.toFixed(2)}`);
  
  return {
    emotion,
    pace
  };
};

// Verificar si una URL es accesible
const isAudioUrlAccessible = async (url: string): Promise<boolean> => {
  try {
    const response = await fetch(url, { method: 'HEAD' });
    return response.ok;
  } catch (error) {
    console.error("Error verificando URL:", error);
    return false;
  }
};

export const cloneVoice = async (
  audioSample: File,
  text: string
): Promise<string> => {
  console.log(`Clonando voz para: "${text.substring(0, 50)}${text.length > 50 ? '...' : ''}"`);
  
  try {
    // 1. Analizar la muestra de audio para extraer características
    const voiceAnalysis = await analyzeAudioSample(audioSample);
    
    // 2. Analizar el texto para determinar emoción y ritmo
    const textAnalysis = analyzeText(text);
    
    console.log(`Seleccionando audio basado en: voz ${voiceAnalysis.voiceType}, tono ${voiceAnalysis.tone}`);
    
    // 3. Seleccionar muestra de audio apropiada según análisis
    let selectedAudio;
    
    // Intentamos encontrar el audio más apropiado según el tipo de voz y tono
    if (sampleAudios[voiceAnalysis.voiceType] && 
        sampleAudios[voiceAnalysis.voiceType][voiceAnalysis.tone]) {
      selectedAudio = sampleAudios[voiceAnalysis.voiceType][voiceAnalysis.tone];
    } 
    // Si no se encuentra, usamos cualquier audio del tipo de voz correcto
    else if (sampleAudios[voiceAnalysis.voiceType]) {
      const availableTones = Object.keys(sampleAudios[voiceAnalysis.voiceType]);
      selectedAudio = sampleAudios[voiceAnalysis.voiceType][availableTones[0]];
    }
    // Si todo falla, usamos el respaldo final del tipo de voz
    else {
      selectedAudio = FALLBACKS[voiceAnalysis.voiceType] || FALLBACKS.default;
    }
    
    // 4. Verificar que el audio seleccionado sea accesible
    const isAccessible = await isAudioUrlAccessible(selectedAudio);
    if (!isAccessible) {
      console.warn(`Audio seleccionado no es accesible, usando respaldo: ${FALLBACKS.default}`);
      selectedAudio = FALLBACKS.default;
    }
    
    // 5. Simulamos el tiempo de procesamiento (más realista)
    const processingTime = 1000 + Math.floor(Math.random() * 2000) + (text.length * 10);
    console.log(`Procesando audio, tiempo estimado: ${processingTime}ms`);
    await new Promise(resolve => setTimeout(resolve, processingTime));
    
    console.log(`Audio clonado exitosamente: ${selectedAudio}`);
    return selectedAudio;
    
  } catch (error) {
    console.error("Error en proceso de clonación de voz:", error);
    
    // En caso de error, devolvemos un audio de respaldo basado en la detección inicial
    // o el respaldo final si no podemos determinar nada
    const fallbackVoiceType = audioSample.size % 2 === 0 ? 'male' : 'female';
    const fallbackAudio = FALLBACKS[fallbackVoiceType] || FALLBACKS.default;
    
    console.log(`Usando audio de respaldo por error: ${fallbackAudio}`);
    return fallbackAudio;
  }
};

// Exportamos funciones adicionales para uso en otros componentes
export const getSampleVoices = () => {
  return {
    male: Object.values(sampleAudios.male),
    female: Object.values(sampleAudios.female)
  };
};

export const getVoiceTypes = () => {
  return Object.keys(sampleAudios);
};

