
import React, { useState } from 'react';
import { ArrowLeft, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { MeditationTopicSelection } from './MeditationTopicSelection';
import { MeditationContent } from './MeditationContent';
import { ReminderSettings } from '../reminders/ReminderSettings';

interface MeditationFlowProps {
  topic: string;
  onBack: () => void;
}

export const MeditationFlow: React.FC<MeditationFlowProps> = ({ topic, onBack }) => {
  const [selectedTopic, setSelectedTopic] = useState(topic);
  const [currentStep, setCurrentStep] = useState<'selection' | 'schedule' | 'content'>(
    topic ? 'schedule' : 'selection'
  );

  const handleTopicSelect = (newTopic: string) => {
    setSelectedTopic(newTopic);
    setCurrentStep('schedule');
  };

  const handleScheduleComplete = () => {
    setCurrentStep('content');
  };

  const handleBackToTopics = () => {
    if (currentStep === 'content') {
      setCurrentStep('schedule');
    } else if (currentStep === 'schedule') {
      setCurrentStep('selection');
      setSelectedTopic('');
    } else {
      onBack();
    }
  };

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center mb-8">
          <Button
            variant="ghost"
            onClick={handleBackToTopics}
            className="mr-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <div className="flex items-center">
            <Sparkles className="w-8 h-8 text-purple-600 mr-3" />
            <h1 className="text-3xl font-bold text-gray-800">Daily Meditation</h1>
          </div>
        </div>

        {currentStep === 'selection' && (
          <MeditationTopicSelection onTopicSelect={handleTopicSelect} />
        )}
        
        {currentStep === 'schedule' && (
          <ReminderSettings 
            onScheduleComplete={handleScheduleComplete}
            programType="Meditation"
            topic={selectedTopic}
          />
        )}
        
        {currentStep === 'content' && (
          <MeditationContent topic={selectedTopic} />
        )}
      </div>
    </div>
  );
};
