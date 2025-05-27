
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { prompt, characterName } = await req.json()
    
    console.log('🎨 Generando personaje Pixar:', characterName)
    console.log('📝 Prompt recibido:', prompt)
    
    // Obtener la API key de Hugging Face desde los secretos de Supabase
    const hfApiKey = Deno.env.get('HUGGINGFACE_API_KEY')
    if (!hfApiKey) {
      throw new Error('API key de Hugging Face no configurada')
    }
    
    // Usar Pollinations.ai como alternativa gratuita y confiable
    const enhancedPrompt = `${prompt}, pixar disney style, 3d cartoon character, disney pixar animation, colorful, vibrant colors, smooth 3d rendering, high quality, professional disney animation style, cute, detailed, masterpiece`
    
    // Construir URL de Pollinations.ai
    const params = new URLSearchParams({
      width: '512',
      height: '512',
      model: 'flux',
      enhance: 'true',
      nologo: 'true',
      private: 'true',
      seed: Math.floor(Math.random() * 1000000).toString()
    })
    
    const imageUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(enhancedPrompt)}?${params.toString()}`
    
    console.log('✅ URL de imagen generada:', imageUrl)
    
    return new Response(
      JSON.stringify({ 
        imageUrl,
        prompt: enhancedPrompt,
        characterName 
      }),
      { 
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        } 
      }
    )
    
  } catch (error) {
    console.error('❌ Error en Edge Function:', error)
    return new Response(
      JSON.stringify({ 
        error: error.message || 'Error interno del servidor' 
      }),
      { 
        status: 500,
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        } 
      }
    )
  }
})
