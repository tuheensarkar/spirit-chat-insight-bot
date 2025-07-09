
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Play, Pause, RotateCcw, CheckCircle } from 'lucide-react';

interface MeditationContentProps {
  topic: string;
}

export const MeditationContent: React.FC<MeditationContentProps> = ({ topic }) => {
  const [currentPhase, setCurrentPhase] = useState<'scripture' | 'reflection' | 'breathing' | 'complete'>('scripture');
  const [breathingActive, setBreathingActive] = useState(false);
  const [breathingPhase, setBreathingPhase] = useState<'inhale' | 'hold' | 'exhale'>('inhale');
  const [breathingCount, setBreathingCount] = useState(4);

  const meditationContent = {
    scripture: {
      verse: "Psalm 46:10",
      text: "Be still and know that I am God; I will be exalted among the nations, I will be exalted in the earth."
    },
    reflectionPrompts: [
      "What does this verse reveal about God's character?",
      "How can I experience God's presence in stillness?",
      "What areas of my life need to be surrendered to God?",
      "How can I live this truth out today?"
    ]
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (breathingActive) {
      interval = setInterval(() => {
        setBreathingCount(prev => {
          if (prev === 1) {
            setBreathingPhase(current => {
              if (current === 'inhale') return 'hold';
              if (current === 'hold') return 'exhale';
              return 'inhale';
            });
            return 4;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [breathingActive]);

  const startBreathing = () => {
    setBreathingActive(true);
    setBreathingPhase('inhale');
    setBreathingCount(4);
  };

  const pauseBreathing = () => {
    setBreathingActive(false);
  };

  const resetBreathing = () => {
    setBreathingActive(false);
    setBreathingPhase('inhale');
    setBreathingCount(4);
  };

  const renderCurrentPhase = () => {
    switch (currentPhase) {
      case 'scripture':
        return (
          <Card className="bg-purple-50 border-purple-200">
            <CardHeader>
              <CardTitle className="text-purple-800 text-center">Scripture Focus</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center mb-6">
                <h3 className="text-xl font-semibold text-purple-800 mb-4">
                  {meditationContent.scripture.verse}
                </h3>
                <p className="text-lg text-purple-700 italic leading-relaxed">
                  "{meditationContent.scripture.text}"
                </p>
              </div>
              <div className="bg-white p-4 rounded-lg mb-4">
                <p className="text-purple-800 text-sm">
                  Read this verse slowly three times. Let each word sink into your heart and mind. 
                  Focus on what God is saying to you through these words.
                </p>
              </div>
              <Button 
                onClick={() => setCurrentPhase('reflection')} 
                className="w-full bg-purple-600 hover:bg-purple-700"
              >
                Continue to Reflection
              </Button>
            </CardContent>
          </Card>
        );

      case 'reflection':
        return (
          <Card className="bg-indigo-50 border-indigo-200">
            <CardHeader>
              <CardTitle className="text-indigo-800 text-center">Meditation Prompts</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 mb-6">
                {meditationContent.reflectionPrompts.map((prompt, index) => (
                  <div key={index} className="bg-white p-4 rounded-lg">
                    <p className="text-indigo-800 font-medium">{prompt}</p>
                  </div>
                ))}
              </div>
              <div className="bg-indigo-100 p-4 rounded-lg mb-4">
                <p className="text-indigo-800 text-sm">
                  Take time to ponder these questions. Don't rush to find answers - simply rest in God's presence 
                  and let Him speak to your heart.
                </p>
              </div>
              <Button 
                onClick={() => setCurrentPhase('breathing')} 
                className="w-full bg-indigo-600 hover:bg-indigo-700"
              >
                Begin Breathing Guide
              </Button>
            </CardContent>
          </Card>
        );

      case 'breathing':
        return (
          <Card className="bg-teal-50 border-teal-200">
            <CardHeader>
              <CardTitle className="text-teal-800 text-center">Breathing Guide</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center mb-8">
                <div className={`w-32 h-32 mx-auto rounded-full flex items-center justify-center mb-4 transition-all duration-1000 ${
                  breathingPhase === 'inhale' ? 'bg-teal-200 scale-110' :
                  breathingPhase === 'hold' ? 'bg-teal-300 scale-110' :
                  'bg-teal-100 scale-90'
                }`}>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-teal-800 mb-1">
                      {breathingCount}
                    </div>
                    <div className="text-sm text-teal-700 font-medium capitalize">
                      {breathingPhase}
                    </div>
                  </div>
                </div>
                
                <p className="text-teal-800 text-lg mb-2">
                  {breathingPhase === 'inhale' && 'Breathe in God\'s peace'}
                  {breathingPhase === 'hold' && 'Hold and rest in His presence'}
                  {breathingPhase === 'exhale' && 'Release your worries to Him'}
                </p>
              </div>

              <div className="flex justify-center gap-3 mb-6">
                {!breathingActive ? (
                  <Button onClick={startBreathing} className="bg-teal-600 hover:bg-teal-700">
                    <Play className="w-4 h-4 mr-2" />
                    Start
                  </Button>
                ) : (
                  <Button onClick={pauseBreathing} variant="outline">
                    <Pause className="w-4 h-4 mr-2" />
                    Pause
                  </Button>
                )}
                <Button onClick={resetBreathing} variant="outline">
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Reset
                </Button>
              </div>

              <div className="bg-white p-4 rounded-lg mb-4">
                <p className="text-teal-800 text-sm text-center">
                  <strong>Pattern:</strong> Inhale 4s → Hold 4s → Exhale 4s<br />
                  Continue for 5-10 cycles, focusing on God's presence with each breath.
                </p>
              </div>

              <Button 
                onClick={() => setCurrentPhase('complete')} 
                className="w-full bg-teal-600 hover:bg-teal-700"
              >
                Complete Meditation
              </Button>
            </CardContent>
          </Card>
        );

      case 'complete':
        return (
          <Card className="bg-gradient-to-r from-purple-50 to-teal-50 border-purple-200">
            <CardContent className="text-center p-8">
              <CheckCircle className="w-20 h-20 text-purple-600 mx-auto mb-6" />
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">Meditation Complete</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                You have spent time in God's presence meditating on {topic}. 
                Carry this peace and the truths He revealed to you throughout your day.
              </p>
              <div className="bg-white p-4 rounded-lg mb-6">
                <p className="text-purple-800 italic">
                  "But when you pray, go into your room, close the door and pray to your Father, 
                  who is unseen. Then your Father, who sees what is done in secret, will reward you." 
                  - Matthew 6:6
                </p>
              </div>
              <div className="flex gap-3 justify-center">
                <Button 
                  variant="outline" 
                  onClick={() => setCurrentPhase('scripture')}
                  className="flex items-center"
                >
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Meditate Again
                </Button>
                <Button className="bg-purple-600 hover:bg-purple-700">
                  Journal Insights
                </Button>
              </div>
            </CardContent>
          </Card>
        );

      default:
        return null;
    }
  };

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">Meditation: {topic}</h2>
        <p className="text-gray-600">
          Take time to be still before God and meditate on His word and character.
        </p>
      </div>

      {/* Progress Indicator */}
      <div className="flex justify-center mb-8">
        <div className="flex items-center space-x-4">
          {['scripture', 'reflection', 'breathing', 'complete'].map((phase, index) => (
            <div key={phase} className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                currentPhase === phase 
                  ? 'bg-purple-600 text-white' 
                  : ['scripture', 'reflection', 'breathing'].indexOf(currentPhase) > index
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-200 text-gray-500'
              }`}>
                {index + 1}
              </div>
              {index < 3 && (
                <div className={`w-8 h-0.5 ${
                  ['scripture', 'reflection', 'breathing'].indexOf(currentPhase) > index
                    ? 'bg-green-500'
                    : 'bg-gray-200'
                }`} />
              )}
            </div>
          ))}
        </div>
      </div>

      {renderCurrentPhase()}
    </div>
  );
};
