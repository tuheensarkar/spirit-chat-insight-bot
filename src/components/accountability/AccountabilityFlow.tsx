
import React, { useState } from 'react';
import { ArrowLeft, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AccountabilityTopicSelection } from './AccountabilityTopicSelection';
import { AccountabilityContent } from './AccountabilityContent';

interface AccountabilityFlowProps {
  topic: string;
  onBack: () => void;
}

export const AccountabilityFlow: React.FC<AccountabilityFlowProps> = ({ topic, onBack }) => {
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
            <Shield className="w-8 h-8 text-green-600 mr-3" />
            <h1 className="text-3xl font-bold text-gray-800">Daily Accountability</h1>
          </div>
        </div>

        {showContent ? (
          <AccountabilityContent topic={selectedTopic} />
        ) : (
          <AccountabilityTopicSelection onTopicSelect={handleTopicSelect} />
        )}
      </div>
    </div>
  );
};
