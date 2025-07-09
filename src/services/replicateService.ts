
const REPLICATE_API_TOKEN = 'r8_VUBCXN6nBtgufp74NtMaBY1pzn27OF72Bn1y0';

export interface QuoteImageRequest {
  quote: string;
  author?: string;
  style?: string;
}

export const generateQuoteImage = async (request: QuoteImageRequest): Promise<string> => {
  try {
    const prompt = `Beautiful inspirational quote image with text "${request.quote}" ${request.author ? `- ${request.author}` : ''}, elegant typography, ${request.style || 'peaceful background, soft colors, professional design'}`;
    
    const response = await fetch('https://api.replicate.com/v1/predictions', {
      method: 'POST',
      headers: {
        'Authorization': `Token ${REPLICATE_API_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        version: 'b1c17d148455c1fda435ababe9ab1e03bc0d917cc3cf4251916f22c45c83c7df',
        input: {
          prompt: prompt,
          width: 512,
          height: 512,
          num_inference_steps: 50,
          guidance_scale: 7.5,
        },
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Replicate API error:', response.status, errorText);
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const prediction = await response.json();
    console.log('Initial prediction:', prediction);
    
    // Poll for completion
    let result = prediction;
    let attempts = 0;
    const maxAttempts = 60; // 1 minute timeout
    
    while ((result.status === 'starting' || result.status === 'processing') && attempts < maxAttempts) {
      await new Promise(resolve => setTimeout(resolve, 1000));
      attempts++;
      
      const pollResponse = await fetch(`https://api.replicate.com/v1/predictions/${result.id}`, {
        headers: {
          'Authorization': `Token ${REPLICATE_API_TOKEN}`,
        },
      });
      
      if (!pollResponse.ok) {
        throw new Error(`Polling error! status: ${pollResponse.status}`);
      }
      
      result = await pollResponse.json();
      console.log('Polling result:', result);
    }

    if (result.status === 'succeeded' && result.output && result.output.length > 0) {
      return result.output[0];
    } else if (result.status === 'failed') {
      throw new Error(`Image generation failed: ${result.error || 'Unknown error'}`);
    } else {
      throw new Error('Image generation timed out or failed');
    }
  } catch (error) {
    console.error('Error generating quote image:', error);
    throw error;
  }
};
