
import React from 'react';
import { BookOpen, MessageSquare, Heart, Shield, Sparkles } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { DSCPLMode } from './DSCPLApp';

interface InitialSelectionProps {
  onModeSelect: (mode: DSCPLMode) => void;
}

export const InitialSelection: React.FC<InitialSelectionProps> = ({ onModeSelect }) => {
  const options = [
    {
      id: 'devotion' as DSCPLMode,
      title: 'Daily Devotion',
      description: 'Bible reading, prayer, and faith declarations',
      icon: BookOpen,
      color: 'from-blue-500 to-blue-600'
    },
    {
      id: 'prayer' as DSCPLMode,
      title: 'Daily Prayer',
      description: 'Guided prayer using the ACTS model',
      icon: Heart,
      color: 'from-pink-500 to-pink-600'
    },
    {
      id: 'meditation' as DSCPLMode,
      title: 'Daily Meditation',
      description: 'Scripture-focused meditation and breathing',
      icon: Sparkles,
      color: 'from-purple-500 to-purple-600'
    },
    {
      id: 'accountability' as DSCPLMode,
      title: 'Daily Accountability',
      description: 'Strength and support for spiritual growth',
      icon: Shield,
      color: 'from-green-500 to-green-600'
    },
    {
      id: 'chat' as DSCPLMode,
      title: 'Just Chat',
      description: 'Open conversation with your spiritual companion',
      icon: MessageSquare,
      color: 'from-indigo-500 to-indigo-600'
    }
  ];

  return (
    <div className="min-h-screen p-4 flex flex-col items-center justify-center">
      <div className="max-w-4xl w-full">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
            DSCPL
          </h1>
          <p className="text-xl text-gray-600 mb-2">Your Personal Spiritual Assistant</p>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            Guiding you daily through devotionals, prayer, meditation, and accountability. 
            What do you need today?
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {options.map((option) => (
            <Card 
              key={option.id}
              className="hover:shadow-xl transition-all duration-300 cursor-pointer group border-0 bg-white/80 backdrop-blur-sm"
              onClick={() => onModeSelect(option.id)}
            >
              <CardHeader className="text-center">
                <div className={`w-16 h-16 mx-auto rounded-full bg-gradient-to-r ${option.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <option.icon className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-xl font-semibold text-gray-800">
                  {option.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-center leading-relaxed">
                  {option.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-sm text-gray-500">
            DSCPL isn't just an app — it's a companion for your spiritual journey.
          </p>
        </div>
      </div>
    </div>
  );
};
