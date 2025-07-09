
import React, { useState } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface VideoPlayerProps {
  title: string;
  videoUrl?: string;
  thumbnail?: string;
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({ 
  title, 
  videoUrl = "https://www.youtube.com/embed/dQw4w9WgXcQ", 
  thumbnail 
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  const handlePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const handleMute = () => {
    setIsMuted(!isMuted);
  };

  return (
    <div className="relative w-full">
      <div className="aspect-video bg-gray-900 rounded-lg overflow-hidden relative">
        {!isPlaying ? (
          <div 
            className="w-full h-full flex items-center justify-center cursor-pointer"
            onClick={handlePlay}
            style={{
              backgroundImage: thumbnail ? `url(${thumbnail})` : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          >
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
              <Button 
                size="lg" 
                className="rounded-full w-16 h-16 bg-white/90 hover:bg-white text-gray-900"
                onClick={handlePlay}
              >
                <Play className="w-8 h-8 ml-1" />
              </Button>
            </div>
            <div className="absolute bottom-4 left-4 right-4">
              <h4 className="text-white font-semibold text-lg drop-shadow-lg">
                {title}
              </h4>
            </div>
          </div>
        ) : (
          <iframe
            src={`${videoUrl}?autoplay=1&mute=${isMuted ? 1 : 0}`}
            title={title}
            className="w-full h-full"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        )}
        
        {isPlaying && (
          <div className="absolute bottom-4 left-4 flex gap-2">
            <Button
              size="sm"
              variant="secondary"
              className="bg-black/50 hover:bg-black/70 text-white"
              onClick={handlePlay}
            >
              <Pause className="w-4 h-4" />
            </Button>
            <Button
              size="sm"
              variant="secondary"
              className="bg-black/50 hover:bg-black/70 text-white"
              onClick={handleMute}
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
