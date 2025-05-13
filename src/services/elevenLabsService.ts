
// ElevenLabs API service for voice cloning

const ELEVEN_LABS_API_URL = 'https://api.elevenlabs.io/v1';

// Interface for voice cloning options
export interface VoiceCloneOptions {
  voiceId?: string;
  stability?: number;
  similarity_boost?: number;
  style?: number;
  use_speaker_boost?: boolean;
  model_id?: string;
}

// Interface for the voice data
export interface VoiceData {
  voiceId: string;
  name: string;
  previewUrl?: string;
}

/**
 * Generate audio from text using ElevenLabs API
 * @param apiKey ElevenLabs API key
 * @param text Text to convert to speech
 * @param options Voice cloning options
 * @returns URL to the generated audio
 */
export const generateSpeech = async (
  apiKey: string,
  text: string,
  options: VoiceCloneOptions = {}
): Promise<string> => {
  try {
    // Default values for options
    const {
      voiceId = 'EXAVITQu4vr4xnSDxMaL', // Default to "Sarah" voice
      stability = 0.5,
      similarity_boost = 0.75,
      style = 0,
      use_speaker_boost = true,
      model_id = 'eleven_turbo_v2' // Use the fastest model by default
    } = options;

    const response = await fetch(`${ELEVEN_LABS_API_URL}/text-to-speech/${voiceId}`, {
      method: 'POST',
      headers: {
        'xi-api-key': apiKey,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        text,
        model_id,
        voice_settings: {
          stability,
          similarity_boost,
          style,
          use_speaker_boost
        }
      })
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      console.error('Error from ElevenLabs API:', errorData);
      throw new Error(`ElevenLabs API error: ${response.status} ${response.statusText}`);
    }

    // Get audio blob
    const audioBlob = await response.blob();
    
    // Create a URL for the blob
    return URL.createObjectURL(audioBlob);
  } catch (error) {
    console.error('Error generating speech:', error);
    throw error;
  }
};

/**
 * Create a voice clone from an audio sample
 * @param apiKey ElevenLabs API key
 * @param name Voice name
 * @param audioSample Audio sample file
 * @returns Voice data including ID and preview URL
 */
export const createVoiceClone = async (
  apiKey: string,
  name: string,
  audioSample: File
): Promise<VoiceData> => {
  try {
    // Create form data for the API call
    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', `Voice clone created on ${new Date().toLocaleString()}`);
    formData.append('files', audioSample);

    const response = await fetch(`${ELEVEN_LABS_API_URL}/voices/add`, {
      method: 'POST',
      headers: {
        'xi-api-key': apiKey
      },
      body: formData
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      console.error('Error from ElevenLabs API:', errorData);
      throw new Error(`ElevenLabs API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    
    return {
      voiceId: data.voice_id,
      name: data.name,
      previewUrl: data.preview_url
    };
  } catch (error) {
    console.error('Error creating voice clone:', error);
    throw error;
  }
};

/**
 * Get available voices from ElevenLabs API
 * @param apiKey ElevenLabs API key
 * @returns Array of voice data
 */
export const getVoices = async (apiKey: string): Promise<VoiceData[]> => {
  try {
    const response = await fetch(`${ELEVEN_LABS_API_URL}/voices`, {
      method: 'GET',
      headers: {
        'xi-api-key': apiKey
      }
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      console.error('Error from ElevenLabs API:', errorData);
      throw new Error(`ElevenLabs API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    
    return data.voices.map((voice: any) => ({
      voiceId: voice.voice_id,
      name: voice.name,
      previewUrl: voice.preview_url
    }));
  } catch (error) {
    console.error('Error fetching voices:', error);
    throw error;
  }
};

/**
 * Check if the API key is valid
 * @param apiKey ElevenLabs API key to validate
 * @returns Boolean indicating if the API key is valid
 */
export const validateApiKey = async (apiKey: string): Promise<boolean> => {
  try {
    const response = await fetch(`${ELEVEN_LABS_API_URL}/user/subscription`, {
      method: 'GET',
      headers: {
        'xi-api-key': apiKey
      }
    });
    
    return response.ok;
  } catch (error) {
    console.error('Error validating API key:', error);
    return false;
  }
};

// Popular voice IDs for testing
export const popularVoices = {
  female: {
    sarah: 'EXAVITQu4vr4xnSDxMaL',
    rachel: '21m00Tcm4TlvDq8ikWAM',
    domi: 'AZnzlk1XvdvUeBnXmlld',
    bella: 'EXAVITQu4vr4xnSDxMaL',
    elli: 'MF3mGyEYCl7XYWbV9V6O'
  },
  male: {
    adam: 'pNInz6obpgDQGcFmaJgB',
    antoni: 'ErXwobaYiN019PkySvjV',
    josh: 'TxGEqnHWrfWFTfGW9XjX',
    arnold: 'VR6AewLTigWG4xSOukaG',
    sam: 'yoZ06aMxZJJ28mfd3POQ'
  }
};

