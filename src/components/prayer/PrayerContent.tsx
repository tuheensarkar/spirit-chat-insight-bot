
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Heart, Sparkles, CheckCircle, Calendar } from 'lucide-react';

interface PrayerContentProps {
  topic: string;
}

export const PrayerContent: React.FC<PrayerContentProps> = ({ topic }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  const actsSteps = [
    { id: 0, title: 'Adoration', subtitle: 'Praise God', color: 'bg-yellow-50 border-yellow-200', textColor: 'text-yellow-800' },
    { id: 1, title: 'Confession', subtitle: 'Repentance', color: 'bg-red-50 border-red-200', textColor: 'text-red-800' },
    { id: 2, title: 'Thanksgiving', subtitle: 'Gratitude', color: 'bg-green-50 border-green-200', textColor: 'text-green-800' },
    { id: 3, title: 'Supplication', subtitle: 'Requests', color: 'bg-blue-50 border-blue-200', textColor: 'text-blue-800' }
  ];

  const handleStepComplete = (stepId: number) => {
    if (!completedSteps.includes(stepId)) {
      setCompletedSteps([...completedSteps, stepId]);
    }
    if (stepId < actsSteps.length - 1) {
      setCurrentStep(stepId + 1);
    }
  };

  const renderStepContent = () => {
    const step = actsSteps[currentStep];
    
    switch (currentStep) {
      case 0: // Adoration
        return (
          <Card className={step.color}>
            <CardHeader>
              <CardTitle className={`flex items-center ${step.textColor}`}>
                <Sparkles className="w-5 h-5 mr-2" />
                Adoration - Praise God
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-white p-4 rounded-lg mb-4">
                <h4 className={`font-semibold mb-2 ${step.textColor}`}>Focus on God's character and attributes:</h4>
                <ul className="text-gray-700 space-y-2">
                  <li>• "God, You are faithful and never-changing"</li>
                  <li>• "You are my refuge and strength"</li>
                  <li>• "Your love is unfailing and eternal"</li>
                  <li>• "You are worthy of all praise and honor"</li>
                </ul>
              </div>
              <div className="bg-yellow-100 p-3 rounded-lg mb-4">
                <p className="text-yellow-800 text-sm">
                  Take 2-3 minutes to worship God for who He is, not what He's done.
                </p>
              </div>
              <Button onClick={() => handleStepComplete(0)} className="w-full bg-yellow-600 hover:bg-yellow-700">
                Continue to Confession
              </Button>
            </CardContent>
          </Card>
        );
      case 1: // Confession
        return (
          <Card className={step.color}>
            <CardHeader>
              <CardTitle className={`flex items-center ${step.textColor}`}>
                <Heart className="w-5 h-5 mr-2" />
                Confession - Repentance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-white p-4 rounded-lg mb-4">
                <h4 className={`font-semibold mb-2 ${step.textColor}`}>Honestly confess before God:</h4>
                <ul className="text-gray-700 space-y-2">
                  <li>• Areas where you've fallen short</li>
                  <li>• Thoughts, words, or actions that don't honor God</li>
                  <li>• Times you've relied on yourself instead of Him</li>
                  <li>• Relationships that need healing</li>
                </ul>
              </div>
              <div className="bg-red-100 p-3 rounded-lg mb-4">
                <p className="text-red-800 text-sm">
                  Remember: God's grace is greater than any sin. He forgives and cleanses completely.
                </p>
              </div>
              <Button onClick={() => handleStepComplete(1)} className="w-full bg-red-600 hover:bg-red-700">
                Continue to Thanksgiving
              </Button>
            </CardContent>
          </Card>
        );
      case 2: // Thanksgiving
        return (
          <Card className={step.color}>
            <CardHeader>
              <CardTitle className={`flex items-center ${step.textColor}`}>
                <Heart className="w-5 h-5 mr-2" />
                Thanksgiving - Gratitude
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-white p-4 rounded-lg mb-4">
                <h4 className={`font-semibold mb-2 ${step.textColor}`}>Give thanks for:</h4>
                <ul className="text-gray-700 space-y-2">
                  <li>• Specific blessings from this week</li>
                  <li>• People God has placed in your life</li>
                  <li>• Challenges that have grown your faith</li>
                  <li>• God's provision and protection</li>
                  <li>• The gift of salvation and new life</li>
                </ul>
              </div>
              <div className="bg-green-100 p-3 rounded-lg mb-4">
                <p className="text-green-800 text-sm">
                  Gratitude transforms our perspective and fills our hearts with joy.
                </p>
              </div>
              <Button onClick={() => handleStepComplete(2)} className="w-full bg-green-600 hover:bg-green-700">
                Continue to Supplication
              </Button>
            </CardContent>
          </Card>
        );
      case 3: // Supplication
        return (
          <Card className={step.color}>
            <CardHeader>
              <CardTitle className={`flex items-center ${step.textColor}`}>
                <Heart className="w-5 h-5 mr-2" />
                Supplication - Requests
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-white p-4 rounded-lg mb-4">
                <h4 className={`font-semibold mb-2 ${step.textColor}`}>Bring your requests to God:</h4>
                <div className="space-y-3">
                  <div>
                    <p className="font-medium text-gray-700">Related to {topic}:</p>
                    <ul className="text-gray-600 text-sm ml-4 mt-1">
                      <li>• Ask for wisdom and guidance</li>
                      <li>• Pray for strength and perseverance</li>
                      <li>• Request God's intervention</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-medium text-gray-700">For others:</p>
                    <ul className="text-gray-600 text-sm ml-4 mt-1">
                      <li>• Family members and friends</li>
                      <li>• Those who are struggling</li>
                      <li>• Your church and community</li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="bg-blue-100 p-3 rounded-lg mb-4">
                <p className="text-blue-800 text-sm">
                  Cast all your anxieties on Him, because He cares for you. - 1 Peter 5:7
                </p>
              </div>
              <Button onClick={() => handleStepComplete(3)} className="w-full bg-blue-600 hover:bg-blue-700">
                Complete Prayer
              </Button>
            </CardContent>
          </Card>
        );
      default:
        return null;
    }
  };

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">Prayer Focus: {topic}</h2>
        <p className="text-gray-600">
          Follow the ACTS model of prayer: Adoration, Confession, Thanksgiving, Supplication
        </p>
      </div>

      {/* Progress Steps */}
      <div className="flex justify-between mb-8 bg-white p-4 rounded-lg shadow-sm">
        {actsSteps.map((step, index) => (
          <div key={step.id} className="flex flex-col items-center">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
              completedSteps.includes(step.id) 
                ? 'bg-green-100 text-green-600' 
                : currentStep === step.id 
                  ? 'bg-pink-100 text-pink-600' 
                  : 'bg-gray-100 text-gray-400'
            }`}>
              {completedSteps.includes(step.id) ? (
                <CheckCircle className="w-6 h-6" />
              ) : (
                <span className="font-bold text-lg">{step.title[0]}</span>
              )}
            </div>
            <span className={`text-sm mt-2 text-center font-medium ${
              completedSteps.includes(step.id) || currentStep === step.id 
                ? 'text-gray-800' 
                : 'text-gray-500'
            }`}>
              {step.title}
            </span>
            <span className="text-xs text-gray-500">{step.subtitle}</span>
          </div>
        ))}
      </div>

      {/* Current Step Content */}
      {renderStepContent()}

      {/* Completion Summary */}
      {completedSteps.length === actsSteps.length && (
        <Card className="mt-6 bg-gradient-to-r from-pink-50 to-purple-50 border-pink-200">
          <CardContent className="text-center p-6">
            <CheckCircle className="w-16 h-16 text-pink-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Prayer Complete!</h3>
            <p className="text-gray-600 mb-4">
              You've completed your prayer time focusing on {topic}. God has heard every word and cares deeply about your concerns.
            </p>
            <div className="flex gap-3 justify-center">
              <Button variant="outline" className="flex items-center">
                <Calendar className="w-4 h-4 mr-2" />
                Schedule Daily Prayer
              </Button>
              <Button className="bg-pink-600 hover:bg-pink-700">
                Journal Reflection
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
