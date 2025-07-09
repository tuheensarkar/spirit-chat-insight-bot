
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface MeditationTopicSelectionProps {
  onTopicSelect: (topic: string) => void;
}

export const MeditationTopicSelection: React.FC<MeditationTopicSelectionProps> = ({ onTopicSelect }) => {
  const meditationTopics = [
    { id: 'peace', title: 'Peace', description: 'Find rest in God\'s perfect peace' },
    { id: 'presence', title: 'God\'s Presence', description: 'Experience the nearness of God' },
    { id: 'strength', title: 'Strength', description: 'Draw power from the Almighty' },
    { id: 'wisdom', title: 'Wisdom', description: 'Seek understanding and discernment' },
    { id: 'faith', title: 'Faith', description: 'Grow in trust and belief' },
    { id: 'custom', title: 'Something else...', description: 'Custom meditation focus' }
  ];

  return (
    <div>
      <div className="text-center mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">Choose Your Meditation Focus</h2>
        <p className="text-gray-600">What aspect of God's character would you like to meditate on?</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {meditationTopics.map((topic) => (
          <Card
            key={topic.id}
            className="hover:shadow-lg transition-all duration-300 cursor-pointer group border-0 bg-white/80 backdrop-blur-sm"
            onClick={() => onTopicSelect(topic.title)}
          >
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-800 group-hover:text-purple-600 transition-colors">
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
