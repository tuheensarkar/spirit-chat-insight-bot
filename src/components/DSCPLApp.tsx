
import React, { useState } from 'react';
import { BookOpen, MessageSquare, Heart, Shield, Calendar, Settings } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { InitialSelection } from './InitialSelection';
import { DevotionFlow } from './devotion/DevotionFlow';
import { PrayerFlow } from './prayer/PrayerFlow';
import { MeditationFlow } from './meditation/MeditationFlow';
import { AccountabilityFlow } from './accountability/AccountabilityFlow';
import { SpiritualChatbot } from './SpiritualChatbot';

export type DSCPLMode = 'selection' | 'devotion' | 'prayer' | 'meditation' | 'accountability' | 'chat';

export const DSCPLApp = () => {
  const [currentMode, setCurrentMode] = useState<DSCPLMode>('selection');
  const [selectedTopic, setSelectedTopic] = useState('');

  const handleModeSelect = (mode: DSCPLMode, topic?: string) => {
    setCurrentMode(mode);
    if (topic) setSelectedTopic(topic);
  };

  const handleBack = () => {
    setCurrentMode('selection');
    setSelectedTopic('');
  };

  const renderCurrentMode = () => {
    switch (currentMode) {
      case 'devotion':
        return <DevotionFlow topic={selectedTopic} onBack={handleBack} />;
      case 'prayer':
        return <PrayerFlow topic={selectedTopic} onBack={handleBack} />;
      case 'meditation':
        return <MeditationFlow topic={selectedTopic} onBack={handleBack} />;
      case 'accountability':
        return <AccountabilityFlow topic={selectedTopic} onBack={handleBack} />;
      case 'chat':
        return <SpiritualChatbot onBack={handleBack} />;
      default:
        return <InitialSelection onModeSelect={handleModeSelect} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50">
      {renderCurrentMode()}
    </div>
  );
};
