
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
    const { prompt, settings } = await req.json()
    
    // Get Hugging Face API key from secrets
    const HUGGINGFACE_API_KEY = Deno.env.get('HUGGINGFACE_API_KEY')
    
    if (!HUGGINGFACE_API_KEY) {
      throw new Error('Hugging Face API key not configured in Supabase secrets')
    }

    console.log('🚀 Generating Pixar character with Hugging Face')
    console.log('📝 Prompt:', prompt)

    const response = await fetch("https://api-inference.huggingface.co/models/Lykon/DreamShaper", {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${HUGGINGFACE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        inputs: prompt,
        parameters: {
          num_inference_steps: settings?.steps || 25,
          guidance_scale: settings?.cfgScale || 7,
          width: 512,
          height: 512
        }
      })
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error('❌ Hugging Face error:', response.status, errorText)
      throw new Error(`Hugging Face API error: ${response.status} - ${errorText}`)
    }

    // Get the image blob
    const blob = await response.blob()
    const arrayBuffer = await blob.arrayBuffer()
    
    console.log('✅ Image generated successfully')
    
    return new Response(arrayBuffer, {
      headers: {
        ...corsHeaders,
        'Content-Type': 'image/png',
      },
    })

  } catch (error) {
    console.error('💥 Error in generate-pixar function:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    )
  }
})
