
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Download, Sparkles, Loader2 } from 'lucide-react';
import { generateQuoteImage } from '@/services/replicateService';

interface QuoteImageGeneratorProps {
  quote: string;
  verse: string;
}

export const QuoteImageGenerator: React.FC<QuoteImageGeneratorProps> = ({ quote, verse }) => {
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerateImage = async () => {
    setIsGenerating(true);
    setError(null);
    
    try {
      const imageUrl = await generateQuoteImage({
        quote: quote,
        author: verse,
        style: 'serene spiritual background, elegant golden text, peaceful atmosphere'
      });
      
      setGeneratedImage(imageUrl);
    } catch (err) {
      console.error('Failed to generate image:', err);
      setError('Failed to generate image. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownload = () => {
    if (generatedImage) {
      const link = document.createElement('a');
      link.href = generatedImage;
      link.download = 'spiritual-quote.png';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
      <CardContent className="p-6">
        <div className="text-center">
          <h4 className="text-lg font-semibold text-purple-800 mb-3 flex items-center justify-center">
            <Sparkles className="w-5 h-5 mr-2" />
            Generate Quote Image
          </h4>
          
          {!generatedImage && !isGenerating && (
            <div className="space-y-4">
              <p className="text-purple-700 text-sm">
                Create a beautiful shareable image of this spiritual quote using AI
              </p>
              <Button
                onClick={handleGenerateImage}
                className="bg-purple-600 hover:bg-purple-700"
                disabled={isGenerating}
              >
                <Sparkles className="w-4 h-4 mr-2" />
                Generate Image
              </Button>
            </div>
          )}

          {isGenerating && (
            <div className="space-y-4">
              <div className="flex items-center justify-center">
                <Loader2 className="w-8 h-8 text-purple-600 animate-spin" />
              </div>
              <p className="text-purple-700">Creating your quote image...</p>
            </div>
          )}

          {error && (
            <div className="space-y-4">
              <p className="text-red-600 text-sm">{error}</p>
              <Button
                onClick={handleGenerateImage}
                variant="outline"
                className="border-purple-300"
              >
                Try Again
              </Button>
            </div>
          )}

          {generatedImage && (
            <div className="space-y-4">
              <div className="relative">
                <img
                  src={generatedImage}
                  alt="Generated spiritual quote"
                  className="max-w-full h-auto rounded-lg shadow-lg mx-auto"
                />
              </div>
              <div className="flex gap-2 justify-center">
                <Button
                  onClick={handleDownload}
                  className="bg-green-600 hover:bg-green-700"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download
                </Button>
                <Button
                  onClick={handleGenerateImage}
                  variant="outline"
                  className="border-purple-300"
                  disabled={isGenerating}
                >
                  <Sparkles className="w-4 h-4 mr-2" />
                  Generate New
                </Button>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
