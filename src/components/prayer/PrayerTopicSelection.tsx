
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface PrayerTopicSelectionProps {
  onTopicSelect: (topic: string) => void;
}

export const PrayerTopicSelection: React.FC<PrayerTopicSelectionProps> = ({ onTopicSelect }) => {
  const prayerTopics = [
    { id: 'growth', title: 'Personal Growth', description: 'Spiritual maturity and character development' },
    { id: 'healing', title: 'Healing', description: 'Physical, emotional, and spiritual restoration' },
    { id: 'family', title: 'Family/Friends', description: 'Relationships and loved ones' },
    { id: 'forgiveness', title: 'Forgiveness', description: 'Letting go and extending grace' },
    { id: 'finances', title: 'Finances', description: 'Provision and wise stewardship' },
    { id: 'career', title: 'Work/Career', description: 'Purpose and success in your calling' },
    { id: 'custom', title: 'Something else...', description: 'Custom prayer focus' }
  ];

  return (
    <div>
      <div className="text-center mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">Choose Your Prayer Focus</h2>
        <p className="text-gray-600">What would you like to bring before God today?</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {prayerTopics.map((topic) => (
          <Card
            key={topic.id}
            className="hover:shadow-lg transition-all duration-300 cursor-pointer group border-0 bg-white/80 backdrop-blur-sm"
            onClick={() => onTopicSelect(topic.title)}
          >
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-800 group-hover:text-pink-600 transition-colors">
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
