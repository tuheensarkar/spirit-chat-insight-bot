
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface TopicSelectionProps {
  onTopicSelect: (topic: string) => void;
}

export const TopicSelection: React.FC<TopicSelectionProps> = ({ onTopicSelect }) => {
  const devotionTopics = [
    { id: 'stress', title: 'Dealing with Stress', description: 'Find peace in God\'s presence' },
    { id: 'fear', title: 'Overcoming Fear', description: 'Walk in faith, not fear' },
    { id: 'depression', title: 'Conquering Depression', description: 'Hope and healing in dark times' },
    { id: 'relationships', title: 'Relationships', description: 'Love and wisdom in connections' },
    { id: 'healing', title: 'Healing', description: 'Physical and emotional restoration' },
    { id: 'purpose', title: 'Purpose & Calling', description: 'Discover God\'s plan for your life' },
    { id: 'anxiety', title: 'Anxiety', description: 'Peace that surpasses understanding' },
    { id: 'custom', title: 'Something else...', description: 'Custom devotional topic' }
  ];

  return (
    <div>
      <div className="text-center mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">Choose Your Focus</h2>
        <p className="text-gray-600">What area of your spiritual life needs attention today?</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {devotionTopics.map((topic) => (
          <Card
            key={topic.id}
            className="hover:shadow-lg transition-all duration-300 cursor-pointer group border-0 bg-white/80 backdrop-blur-sm"
            onClick={() => onTopicSelect(topic.title)}
          >
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">
                {topic.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 text-sm">{topic.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
