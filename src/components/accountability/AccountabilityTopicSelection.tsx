import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertTriangle, Shield } from 'lucide-react';

interface AccountabilityTopicSelectionProps {
  onTopicSelect: (topic: string) => void;
}

export const AccountabilityTopicSelection: React.FC<AccountabilityTopicSelectionProps> = ({ onTopicSelect }) => {
  const accountabilityAreas = [
    { id: 'pornography', title: 'Pornography', description: 'Freedom from sexual addiction', sensitive: true },
    { id: 'alcohol', title: 'Alcohol', description: 'Healthy relationship with alcohol', sensitive: true },
    { id: 'drugs', title: 'Drugs', description: 'Breaking free from substance abuse', sensitive: true },
    { id: 'sex', title: 'Sexual Purity', description: 'Honor God with your body', sensitive: true },
    { id: 'addiction', title: 'General Addiction', description: 'Overcoming compulsive behaviors', sensitive: true },
    { id: 'laziness', title: 'Laziness', description: 'Developing discipline and productivity', sensitive: false },
    { id: 'custom', title: 'Something else...', description: 'Custom accountability area', sensitive: false }
  ];

  return (
    <div>
      <div className="text-center mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">Choose Your Accountability Area</h2>
        <p className="text-gray-600">What area of your life needs strength and support?</p>
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mt-4 max-w-2xl mx-auto">
          <div className="flex items-center justify-center mb-2">
            <AlertTriangle className="w-5 h-5 text-yellow-600 mr-2" />
            <span className="font-medium text-yellow-800">Safe & Confidential</span>
          </div>
          <p className="text-yellow-700 text-sm">
            Your struggles are kept private. This is a judgment-free space for growth and healing.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {accountabilityAreas.map((area) => (
          <Card
            key={area.id}
            className="hover:shadow-lg transition-all duration-300 cursor-pointer group border-0 bg-white/80 backdrop-blur-sm"
            onClick={() => onTopicSelect(area.title)}
          >
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-800 group-hover:text-green-600 transition-colors flex items-center">
                {area.title}
                {area.sensitive && (
                  <Shield className="w-4 h-4 ml-2 text-gray-400" />
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 text-sm">{area.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
