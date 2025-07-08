
import React from 'react';
import { Lotus, Heart, Star, Sun } from 'lucide-react';

export const WelcomeCard: React.FC = () => {
  const suggestions = [
    "How can I find inner peace?",
    "What is my life's purpose?",
    "Help me with meditation guidance",
    "I'm feeling overwhelmed, need support"
  ];

  return (
    <div className="text-center py-8 animate-in fade-in duration-500">
      <div className="mb-6">
        <div className="flex items-center justify-center gap-4 mb-4">
          <Lotus className="w-12 h-12 text-purple-500" />
          <Heart className="w-10 h-10 text-pink-500" />
          <Star className="w-8 h-8 text-yellow-500" />
          <Sun className="w-10 h-10 text-orange-500" />
        </div>
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">
          Welcome to Your Spiritual Journey
        </h2>
        <p className="text-gray-600 max-w-md mx-auto leading-relaxed">
          I'm here to offer guidance, wisdom, and support on your path to inner peace and spiritual growth. 
          What's on your mind today?
        </p>
      </div>

      <div className="space-y-2">
        <p className="text-sm font-medium text-gray-700 mb-3">Try asking me about:</p>
        <div className="grid grid-cols-1 gap-2 max-w-md mx-auto">
          {suggestions.map((suggestion, index) => (
            <div
              key={index}
              className="px-4 py-2 bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-100 rounded-lg text-sm text-gray-700 hover:from-purple-100 hover:to-pink-100 transition-colors cursor-pointer"
            >
              {suggestion}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
