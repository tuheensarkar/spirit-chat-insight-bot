
import React, { useState } from 'react';
import { ArrowLeft, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { TopicSelection } from './TopicSelection';
import { DevotionContent } from './DevotionContent';
import { ReminderSettings } from '../reminders/ReminderSettings';

interface DevotionFlowProps {
  topic: string;
  onBack: () => void;
}

export const DevotionFlow: React.FC<DevotionFlowProps> = ({ topic, onBack }) => {
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
            <BookOpen className="w-8 h-8 text-blue-600 mr-3" />
            <h1 className="text-3xl font-bold text-gray-800">Daily Devotion</h1>
          </div>
        </div>

        {currentStep === 'selection' && (
          <TopicSelection onTopicSelect={handleTopicSelect} />
        )}
        
        {currentStep === 'schedule' && (
          <ReminderSettings 
            onScheduleComplete={handleScheduleComplete}
            programType="Devotion"
            topic={selectedTopic}
          />
        )}
        
        {currentStep === 'content' && (
          <DevotionContent topic={selectedTopic} />
        )}
      </div>
    </div>
  );
};
