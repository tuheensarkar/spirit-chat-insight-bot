
import React, { useState } from 'react';
import { ArrowLeft, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PrayerTopicSelection } from './PrayerTopicSelection';
import { PrayerContent } from './PrayerContent';
import { ReminderSettings } from '../reminders/ReminderSettings';

interface PrayerFlowProps {
  topic: string;
  onBack: () => void;
}

export const PrayerFlow: React.FC<PrayerFlowProps> = ({ topic, onBack }) => {
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
            <Heart className="w-8 h-8 text-pink-600 mr-3" />
            <h1 className="text-3xl font-bold text-gray-800">Daily Prayer</h1>
          </div>
        </div>

        {currentStep === 'selection' && (
          <PrayerTopicSelection onTopicSelect={handleTopicSelect} />
        )}
        
        {currentStep === 'schedule' && (
          <ReminderSettings 
            onScheduleComplete={handleScheduleComplete}
            programType="Prayer"
            topic={selectedTopic}
          />
        )}
        
        {currentStep === 'content' && (
          <PrayerContent topic={selectedTopic} />
        )}
      </div>
    </div>
  );
};
