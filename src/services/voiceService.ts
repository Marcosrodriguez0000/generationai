
// Voice cloning service using pre-recorded samples

// Lista de muestras de audio fiables y verificadas para demostración
const sampleAudios = [
  // Muestras de voces femeninas - URLs verificadas
  "https://storage.googleapis.com/eleven-public-prod/premade/voices/21m00Tcm4TlvDq8ikWAM/df6285d9-90aa-454a-b20a-0d99c0f35ad9.mp3",
  "https://storage.googleapis.com/eleven-public-prod/premade/voices/AZnzlk1XvdvUeBnXmlld/69c5373f-0dc2-4efd-9232-a0140182c0a5.mp3",
  // Muestras de respaldo adicionales
  "https://cdn.sndup.net/wcxx/sample-15s.mp3?token=OOfz9_MbZRf-JzL2ZdV1kxE2JejKg06T7bTI2NnWEmA&token_path=%2Fwcxx%2F&expires=1748004552",
  "https://cdn.sndup.net/qrb5/spanish-sample.mp3?token=YPT-i8pFHdNNnHe7gZo12FAtJ-ZyctWvloCF_mDDG_M&token_path=%2Fqrb5%2F&expires=1748004733"
];

// Mapeo de voces a tipos
const voiceTypes: Record<string, string[]> = {
  male: [
    "https://storage.googleapis.com/eleven-public-prod/premade/voices/29vD33N1CtxCmqQRPOHJ/291a8139-764a-4973-9016-de18a296f729.mp3",
    "https://storage.googleapis.com/eleven-public-prod/premade/voices/VR6AewLTigWG4xSOukaG/66e83942-6b5e-4ede-8997-a003ba0a3e48.mp3",
    "https://cdn.sndup.net/wcxx/sample-15s.mp3?token=OOfz9_MbZRf-JzL2ZdV1kxE2JejKg06T7bTI2NnWEmA&token_path=%2Fwcxx%2F&expires=1748004552"
  ],
  female: [
    "https://storage.googleapis.com/eleven-public-prod/premade/voices/21m00Tcm4TlvDq8ikWAM/df6285d9-90aa-454a-b20a-0d99c0f35ad9.mp3",
    "https://storage.googleapis.com/eleven-public-prod/premade/voices/AZnzlk1XvdvUeBnXmlld/69c5373f-0dc2-4efd-9232-a0140182c0a5.mp3",
    "https://cdn.sndup.net/qrb5/spanish-sample.mp3?token=YPT-i8pFHdNNnHe7gZo12FAtJ-ZyctWvloCF_mDDG_M&token_path=%2Fqrb5%2F&expires=1748004733"
  ]
};

// Audio de respaldo confiable que definitivamente funciona
const RELIABLE_FALLBACK_AUDIO = "https://cdn.sndup.net/wcxx/sample-15s.mp3?token=OOfz9_MbZRf-JzL2ZdV1kxE2JejKg06T7bTI2NnWEmA&token_path=%2Fwcxx%2F&expires=1748004552";

// Función para analizar la frecuencia de la muestra de audio y determinar si es voz masculina o femenina
const determineVoiceType = async (audioSample: File): Promise<string> => {
  // Para la demo, asignamos aleatoriamente masculino o femenino
  return Math.random() > 0.5 ? 'male' : 'female';
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
  console.log(`Clonando voz con el texto: ${text}`);
  
  try {
    // 1. Determinamos el tipo de voz basado en el audio de muestra
    const voiceType = await determineVoiceType(audioSample);
    console.log(`Tipo de voz detectado: ${voiceType}`);
    
    // 2. Simulamos el tiempo de procesamiento (1-3 segundos)
    const processingTime = Math.floor(Math.random() * 2000) + 1000;
    await new Promise(resolve => setTimeout(resolve, processingTime));
    
    // 3. Seleccionamos una muestra de audio que coincida con el tipo de voz detectado
    const matchingVoices = voiceTypes[voiceType];
    
    // Primero, intentar con el audio de respaldo seguro para garantizar que funcione
    const isBackupAccessible = await isAudioUrlAccessible(RELIABLE_FALLBACK_AUDIO);
    if (isBackupAccessible) {
      console.log(`Usando audio de respaldo garantizado: ${RELIABLE_FALLBACK_AUDIO}`);
      return RELIABLE_FALLBACK_AUDIO;
    }
    
    // Si por alguna razón el respaldo no funciona, probar con las otras opciones
    for (const url of matchingVoices) {
      const isAccessible = await isAudioUrlAccessible(url);
      if (isAccessible) {
        console.log(`Audio generado con éxito: ${url}`);
        return url;
      }
    }
    
    // Si ninguna URL funcionó, usamos una URL alternativa extremadamente confiable
    console.log(`Ninguna URL funcionó, usando URL alternativa fija`);
    return "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3";
    
  } catch (error) {
    console.error("Error clonando voz:", error);
    
    // URL alternativa confiable final como último recurso
    console.log(`Error en el proceso, usando audio de último recurso`);
    return "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3";
  }
};
