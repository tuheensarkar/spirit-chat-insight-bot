
import React, { useState, useRef } from 'react';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';
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
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const handlePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const handleMute = () => {
    setIsMuted(!isMuted);
  };

  // Extract video ID from YouTube URL for proper embedding
  const getYouTubeEmbedUrl = (url: string) => {
    const videoId = url.includes('embed/') 
      ? url.split('embed/')[1].split('?')[0]
      : url.split('v=')[1]?.split('&')[0];
    
    return `https://www.youtube.com/embed/${videoId}`;
  };

  return (
    <div className="relative w-full">
      <div className="aspect-video bg-gray-900 rounded-lg overflow-hidden relative">
        {!isPlaying ? (
          <div 
            className="w-full h-full flex items-center justify-center cursor-pointer relative"
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
                className="rounded-full w-16 h-16 bg-white/90 hover:bg-white text-gray-900 shadow-lg"
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
          <div className="w-full h-full relative">
            <iframe
              ref={iframeRef}
              src={`${getYouTubeEmbedUrl(videoUrl)}?autoplay=1&mute=${isMuted ? 1 : 0}&rel=0&modestbranding=1`}
              title={title}
              className="w-full h-full"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
            
            <div className="absolute bottom-4 left-4 flex gap-2 z-10">
              <Button
                size="sm"
                variant="secondary"
                className="bg-black/70 hover:bg-black/90 text-white border-0"
                onClick={handlePlay}
              >
                <Pause className="w-4 h-4" />
              </Button>
              <Button
                size="sm"
                variant="secondary"
                className="bg-black/70 hover:bg-black/90 text-white border-0"
                onClick={handleMute}
              >
                {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
