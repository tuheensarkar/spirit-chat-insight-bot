
import React, { useState } from 'react';
import { ArrowLeft, BookOpen, Heart, Sparkles } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { TopicSelection } from './TopicSelection';
import { DevotionContent } from './DevotionContent';

interface DevotionFlowProps {
  topic: string;
  onBack: () => void;
}

export const DevotionFlow: React.FC<DevotionFlowProps> = ({ topic, onBack }) => {
  const [selectedTopic, setSelectedTopic] = useState(topic);
  const [showContent, setShowContent] = useState(!!topic);

  const handleTopicSelect = (newTopic: string) => {
    setSelectedTopic(newTopic);
    setShowContent(true);
  };

  const handleBackToTopics = () => {
    setShowContent(false);
    setSelectedTopic('');
  };

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center mb-8">
          <Button
            variant="ghost"
            onClick={showContent ? handleBackToTopics : onBack}
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

        {showContent ? (
          <DevotionContent topic={selectedTopic} />
        ) : (
          <TopicSelection onTopicSelect={handleTopicSelect} />
        )}
      </div>
    </div>
  );
};
