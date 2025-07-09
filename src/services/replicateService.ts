
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
        version: 'de21ac9ad6e7e95b8e9b4c5e3a5e5e5e5e5e5e5e',
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
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const prediction = await response.json();
    
    // Poll for completion
    let result = prediction;
    while (result.status === 'starting' || result.status === 'processing') {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const pollResponse = await fetch(`https://api.replicate.com/v1/predictions/${result.id}`, {
        headers: {
          'Authorization': `Token ${REPLICATE_API_TOKEN}`,
        },
      });
      
      result = await pollResponse.json();
    }

    if (result.status === 'succeeded' && result.output && result.output.length > 0) {
      return result.output[0];
    } else {
      throw new Error('Failed to generate image');
    }
  } catch (error) {
    console.error('Error generating quote image:', error);
    throw error;
  }
};
