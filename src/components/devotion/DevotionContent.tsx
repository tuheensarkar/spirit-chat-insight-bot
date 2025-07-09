
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookOpen, Heart, Sparkles, Play, Calendar, CheckCircle } from 'lucide-react';
import { VideoPlayer } from './VideoPlayer';
import { QuoteImageGenerator } from './QuoteImageGenerator';

interface DevotionContentProps {
  topic: string;
}

export const DevotionContent: React.FC<DevotionContentProps> = ({ topic }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  const devotionContent = {
    scripture: {
      verse: "Philippians 4:6-7",
      text: "Do not be anxious about anything, but in every situation, by prayer and petition, with thanksgiving, present your requests to God. And the peace of God, which transcends all understanding, will guard your hearts and your minds in Christ Jesus."
    },
    prayer: "Lord, help me release my anxieties and trust in You. Give me Your peace that surpasses all understanding.",
    declaration: "God is my refuge, and I will not be shaken. His peace guards my heart and mind.",
    videoTitle: "Overcoming Fear with God's Promises",
    videoUrl: "https://www.youtube.com/embed/JGigs6CPR_o"
  };

  const steps = [
    { id: 0, title: '5-Minute Bible Reading', icon: BookOpen, color: 'text-blue-600' },
    { id: 1, title: 'Short Prayer', icon: Heart, color: 'text-pink-600' },
    { id: 2, title: 'Faith Declaration', icon: Sparkles, color: 'text-purple-600' },
    { id: 3, title: 'Recommended Video', icon: Play, color: 'text-green-600' }
  ];

  const handleStepComplete = (stepId: number) => {
    if (!completedSteps.includes(stepId)) {
      setCompletedSteps([...completedSteps, stepId]);
    }
    if (stepId < steps.length - 1) {
      setCurrentStep(stepId + 1);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-6">
            <Card className="bg-blue-50 border-blue-200">
              <CardHeader>
                <CardTitle className="flex items-center text-blue-800">
                  <BookOpen className="w-5 h-5 mr-2" />
                  Scripture Reading - {devotionContent.scripture.verse}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-blue-700 text-lg leading-relaxed mb-6 italic">
                  "{devotionContent.scripture.text}"
                </p>
                <div className="bg-white p-4 rounded-lg mb-4">
                  <h4 className="font-semibold text-blue-800 mb-2">Reflection Questions:</h4>
                  <ul className="text-blue-700 space-y-1">
                    <li>• What is God saying to me through this verse?</li>
                    <li>• How can I apply this truth to my current situation?</li>
                    <li>• What anxieties can I surrender to God today?</li>
                  </ul>
                </div>
                <Button onClick={() => handleStepComplete(0)} className="w-full bg-blue-600 hover:bg-blue-700">
                  Complete Reading
                </Button>
              </CardContent>
            </Card>
            
            <QuoteImageGenerator 
              quote={devotionContent.scripture.text}
              verse={devotionContent.scripture.verse}
            />
          </div>
        );
      case 1:
        return (
          <Card className="bg-pink-50 border-pink-200">
            <CardHeader>
              <CardTitle className="flex items-center text-pink-800">
                <Heart className="w-5 h-5 mr-2" />
                Prayer Time
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-white p-4 rounded-lg mb-4">
                <p className="text-pink-700 text-lg leading-relaxed italic mb-4">
                  "{devotionContent.prayer}"
                </p>
                <div className="space-y-3">
                  <div>
                    <h4 className="font-semibold text-pink-800">Take a moment to pray:</h4>
                    <ul className="text-pink-700 mt-2 space-y-1">
                      <li>• Thank God for His peace and presence</li>
                      <li>• Confess any worries or fears you're holding</li>
                      <li>• Ask for His strength for today's challenges</li>
                    </ul>
                  </div>
                </div>
              </div>
              <Button onClick={() => handleStepComplete(1)} className="w-full bg-pink-600 hover:bg-pink-700">
                Finish Prayer
              </Button>
            </CardContent>
          </Card>
        );
      case 2:
        return (
          <Card className="bg-purple-50 border-purple-200">
            <CardHeader>
              <CardTitle className="flex items-center text-purple-800">
                <Sparkles className="w-5 h-5 mr-2" />
                Faith Declaration
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-white p-6 rounded-lg mb-4 text-center">
                <p className="text-purple-700 text-xl font-semibold leading-relaxed">
                  "{devotionContent.declaration}"
                </p>
              </div>
              <div className="bg-purple-100 p-4 rounded-lg mb-4">
                <p className="text-purple-800 font-medium mb-2">Speak this declaration aloud with confidence:</p>
                <p className="text-purple-700 text-sm">
                  Declarations help renew your mind and align your thoughts with God's truth. 
                  Speaking His promises over your life builds faith and transforms your perspective.
                </p>
              </div>
              <Button onClick={() => handleStepComplete(2)} className="w-full bg-purple-600 hover:bg-purple-700">
                Declaration Complete
              </Button>
            </CardContent>
          </Card>
        );
      case 3:
        return (
          <Card className="bg-green-50 border-green-200">
            <CardHeader>
              <CardTitle className="flex items-center text-green-800">
                <Play className="w-5 h-5 mr-2" />
                Recommended Video
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <VideoPlayer 
                  title={devotionContent.videoTitle}
                  videoUrl={devotionContent.videoUrl}
                />
                <div className="bg-white p-4 rounded-lg">
                  <h4 className="font-semibold text-green-800 mb-2">{devotionContent.videoTitle}</h4>
                  <p className="text-green-700 text-sm">
                    This video provides additional encouragement and practical insights related to your chosen topic.
                  </p>
                </div>
              </div>
              <Button onClick={() => handleStepComplete(3)} className="w-full bg-green-600 hover:bg-green-700 mt-4">
                Complete Devotion
              </Button>
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
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">Daily Devotion: {topic}</h2>
        <p className="text-gray-600">
          By the end of this devotion, you will feel more connected to God and confident in His promises.
        </p>
      </div>

      {/* Progress Steps */}
      <div className="flex justify-between mb-8 bg-white p-4 rounded-lg shadow-sm">
        {steps.map((step, index) => (
          <div key={step.id} className="flex flex-col items-center">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
              completedSteps.includes(step.id) 
                ? 'bg-green-100 text-green-600' 
                : currentStep === step.id 
                  ? 'bg-blue-100 text-blue-600' 
                  : 'bg-gray-100 text-gray-400'
            }`}>
              {completedSteps.includes(step.id) ? (
                <CheckCircle className="w-5 h-5" />
              ) : (
                <step.icon className="w-5 h-5" />
              )}
            </div>
            <span className={`text-sm mt-2 text-center ${
              completedSteps.includes(step.id) || currentStep === step.id 
                ? 'text-gray-800 font-medium' 
                : 'text-gray-500'
            }`}>
              {step.title}
            </span>
          </div>
        ))}
      </div>

      {/* Current Step Content */}
      {renderStepContent()}

      {/* Completion Summary */}
      {completedSteps.length === steps.length && (
        <Card className="mt-6 bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
          <CardContent className="text-center p-6">
            <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Devotion Complete!</h3>
            <p className="text-gray-600 mb-4">
              You've completed today's devotion on {topic}. May God's peace and strength be with you throughout the day.
            </p>
            <div className="flex gap-3 justify-center">
              <Button variant="outline" className="flex items-center">
                <Calendar className="w-4 h-4 mr-2" />
                Schedule Tomorrow
              </Button>
              <Button className="bg-green-600 hover:bg-green-700">
                Share Reflection
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
