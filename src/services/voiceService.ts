
// Voice cloning service using pre-recorded samples

// Lista de muestras de audio de alta calidad para demostración
const sampleAudios = [
  // Muestras de voces femeninas
  "https://storage.googleapis.com/eleven-public-prod/premade/voices/21m00Tcm4TlvDq8ikWAM/df6285d9-90aa-454a-b20a-0d99c0f35ad9.mp3",
  "https://storage.googleapis.com/eleven-public-prod/premade/voices/AZnzlk1XvdvUeBnXmlld/69c5373f-0dc2-4efd-9232-a0140182c0a5.mp3",
  // Muestras de voces masculinas
  "https://storage.googleapis.com/eleven-public-prod/premade/voices/29vD33N1CtxCmqQRPOHJ/291a8139-764a-4973-9016-de18a296f729.mp3",
  "https://storage.googleapis.com/eleven-public-prod/premade/voices/VR6AewLTigWG4xSOukaG/66e83942-6b5e-4ede-8997-a003ba0a3e48.mp3",
  // Muestras adicionales con frases más largas
  "https://storage.googleapis.com/eleven-public-prod/premade/voices/pNInz6obpgDQGcFmaJgB/a35d05f9-59e7-4fcc-bba2-ba26e89cde6e.mp3",
  "https://storage.googleapis.com/eleven-public-prod/premade/voices/yoZ06aMxZJJ28mfd3POQ/11688dd6-5b8e-4fc0-a784-a762c7fb80b3.mp3",
  "https://storage.googleapis.com/eleven-public-prod/premade/voices/flq6f7yk4E4fJM5XTYuZ/0b357355-db73-4e04-a33e-e9276b29e76c.mp3"
];

// Mapeo de voces a tipos
const voiceTypes: Record<string, string[]> = {
  male: [
    "https://storage.googleapis.com/eleven-public-prod/premade/voices/29vD33N1CtxCmqQRPOHJ/291a8139-764a-4973-9016-de18a296f729.mp3",
    "https://storage.googleapis.com/eleven-public-prod/premade/voices/VR6AewLTigWG4xSOukaG/66e83942-6b5e-4ede-8997-a003ba0a3e48.mp3",
    "https://storage.googleapis.com/eleven-public-prod/premade/voices/flq6f7yk4E4fJM5XTYuZ/0b357355-db73-4e04-a33e-e9276b29e76c.mp3"
  ],
  female: [
    "https://storage.googleapis.com/eleven-public-prod/premade/voices/21m00Tcm4TlvDq8ikWAM/df6285d9-90aa-454a-b20a-0d99c0f35ad9.mp3",
    "https://storage.googleapis.com/eleven-public-prod/premade/voices/AZnzlk1XvdvUeBnXmlld/69c5373f-0dc2-4efd-9232-a0140182c0a5.mp3",
    "https://storage.googleapis.com/eleven-public-prod/premade/voices/pNInz6obpgDQGcFmaJgB/a35d05f9-59e7-4fcc-bba2-ba26e89cde6e.mp3",
    "https://storage.googleapis.com/eleven-public-prod/premade/voices/yoZ06aMxZJJ28mfd3POQ/11688dd6-5b8e-4fc0-a784-a762c7fb80b3.mp3"
  ]
};

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
    
    // Verificar cada URL hasta encontrar una que funcione
    for (const url of matchingVoices) {
      const isAccessible = await isAudioUrlAccessible(url);
      if (isAccessible) {
        console.log(`Audio generado con éxito: ${url}`);
        return url;
      }
    }
    
    // Si ninguna URL funcionó, usamos una URL alternativa confiable
    const fallbackUrl = "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3";
    console.log(`Usando URL alternativa: ${fallbackUrl}`);
    return fallbackUrl;
    
  } catch (error) {
    console.error("Error clonando voz:", error);
    
    // URL alternativa confiable
    const fallbackUrl = "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3";
    console.log(`Usando audio de fallback: ${fallbackUrl}`);
    return fallbackUrl;
  }
};
