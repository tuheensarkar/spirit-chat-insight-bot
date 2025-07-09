
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Shield, AlertTriangle, Heart, Phone, CheckCircle, MessageSquare } from 'lucide-react';

interface AccountabilityContentProps {
  topic: string;
}

export const AccountabilityContent: React.FC<AccountabilityContentProps> = ({ topic }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [showSOS, setShowSOS] = useState(false);

  const accountabilityContent = {
    scripture: {
      verse: "1 Corinthians 10:13",
      text: "No temptation has overtaken you except what is common to mankind. And God is faithful; he will not let you be tempted beyond what you can bear. But when you are tempted, he will also provide a way out so that you can endure it."
    },
    truthDeclarations: [
      "I am not a slave to temptation; I am free in Christ",
      "God's power in me is greater than any weakness",
      "I am chosen, beloved, and strong in the Lord",
      "Every day I grow stronger in my faith and resolve"
    ],
    alternativeActions: [
      "Go for a walk or exercise",
      "Call a trusted friend or mentor",
      "Read scripture or pray",
      "Engage in a creative hobby",
      "Serve others in your community"
    ]
  };

  const steps = [
    { id: 0, title: 'Scripture for Strength', icon: Shield },
    { id: 1, title: 'Truth Declarations', icon: Heart },
    { id: 2, title: 'Alternative Actions', icon: CheckCircle }
  ];

  const handleStepComplete = (stepId: number) => {
    if (stepId < steps.length - 1) {
      setCurrentStep(stepId + 1);
    }
  };

  const renderSOSCard = () => (
    <Card className="bg-red-50 border-red-200 mb-6">
      <CardHeader>
        <CardTitle className="flex items-center text-red-800">
          <AlertTriangle className="w-5 h-5 mr-2" />
          Need Help Right Now?
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-red-700 mb-4">
          If you're struggling with immediate temptation, you're not alone. God is with you, and help is available.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <Button className="bg-red-600 hover:bg-red-700 text-white">
            <Phone className="w-4 h-4 mr-2" />
            Emergency Prayer Line
          </Button>
          <Button variant="outline" className="border-red-300 text-red-700 hover:bg-red-50">
            <MessageSquare className="w-4 h-4 mr-2" />
            Chat with Mentor
          </Button>
        </div>
        <div className="mt-4 p-3 bg-white rounded-lg">
          <p className="text-red-800 font-medium text-sm">
            "Call upon me in the day of trouble; I will deliver you, and you will honor me." - Psalm 50:15
          </p>
        </div>
      </CardContent>
    </Card>
  );

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <Card className="bg-blue-50 border-blue-200">
            <CardHeader>
              <CardTitle className="flex items-center text-blue-800">
                <Shield className="w-5 h-5 mr-2" />
                Scripture for Strength
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-white p-4 rounded-lg mb-4">
                <h4 className="font-semibold text-blue-800 mb-2">
                  {accountabilityContent.scripture.verse}
                </h4>
                <p className="text-blue-700 italic leading-relaxed">
                  "{accountabilityContent.scripture.text}"
                </p>
              </div>
              <div className="bg-blue-100 p-4 rounded-lg mb-4">
                <h4 className="font-semibold text-blue-800 mb-2">Remember:</h4>
                <ul className="text-blue-700 space-y-1">
                  <li>• God understands your struggle</li>
                  <li>• You are not alone in this battle</li>
                  <li>• There is always a way out of temptation</li>
                  <li>• God's strength is made perfect in your weakness</li>
                </ul>
              </div>
              <Button onClick={() => handleStepComplete(0)} className="w-full bg-blue-600 hover:bg-blue-700">
                Continue to Truth Declarations
              </Button>
            </CardContent>
          </Card>
        );
      case 1:
        return (
          <Card className="bg-green-50 border-green-200">
            <CardHeader>
              <CardTitle className="flex items-center text-green-800">
                <Heart className="w-5 h-5 mr-2" />
                Truth Declarations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-white p-4 rounded-lg mb-4">
                <h4 className="font-semibold text-green-800 mb-3">Speak these truths over your life:</h4>
                <div className="space-y-3">
                  {accountabilityContent.truthDeclarations.map((declaration, index) => (
                    <div key={index} className="bg-green-100 p-3 rounded-lg">
                      <p className="text-green-800 font-medium">"{declaration}"</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-green-100 p-3 rounded-lg mb-4">
                <p className="text-green-800 text-sm">
                  <strong>Tip:</strong> Say these declarations out loud with conviction. 
                  Your words have power and help renew your mind with God's truth.
                </p>
              </div>
              <Button onClick={() => handleStepComplete(1)} className="w-full bg-green-600 hover:bg-green-700">
                Continue to Alternative Actions
              </Button>
            </CardContent>
          </Card>
        );
      case 2:
        return (
          <Card className="bg-purple-50 border-purple-200">
            <CardHeader>
              <CardTitle className="flex items-center text-purple-800">
                <CheckCircle className="w-5 h-5 mr-2" />
                Alternative Actions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-white p-4 rounded-lg mb-4">
                <h4 className="font-semibold text-purple-800 mb-3">
                  Instead of giving in to {topic.toLowerCase()}, try these healthy alternatives:
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {accountabilityContent.alternativeActions.map((action, index) => (
                    <div key={index} className="bg-purple-100 p-3 rounded-lg">
                      <p className="text-purple-800 text-sm">• {action}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-purple-100 p-4 rounded-lg mb-4">
                <h4 className="font-semibold text-purple-800 mb-2">Create Your Action Plan:</h4>
                <p className="text-purple-700 text-sm">
                  Choose 2-3 alternatives that resonate with you. Write them down and keep them easily accessible 
                  for moments when you need to redirect your energy toward something positive.
                </p>
              </div>
              <Button onClick={() => handleStepComplete(2)} className="w-full bg-purple-600 hover:bg-purple-700">
                Complete Accountability Session
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
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">Accountability: {topic}</h2>
        <p className="text-gray-600">
          Building strength and resilience in your spiritual journey. You are not defined by your struggles.
        </p>
      </div>

      {/* SOS Button */}
      <div className="text-center mb-6">
        <Button
          onClick={() => setShowSOS(!showSOS)}
          variant="outline"
          className="border-red-300 text-red-700 hover:bg-red-50"
        >
          <AlertTriangle className="w-4 h-4 mr-2" />
          I Need Help Now!
        </Button>
      </div>

      {/* SOS Card */}
      {showSOS && renderSOSCard()}

      {/* Progress Steps */}
      <div className="flex justify-between mb-8 bg-white p-4 rounded-lg shadow-sm">
        {steps.map((step, index) => (
          <div key={step.id} className="flex flex-col items-center">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
              currentStep >= step.id 
                ? 'bg-green-100 text-green-600' 
                : 'bg-gray-100 text-gray-400'
            }`}>
              <step.icon className="w-6 h-6" />
            </div>
            <span className={`text-sm mt-2 text-center font-medium ${
              currentStep >= step.id ? 'text-gray-800' : 'text-gray-500'
            }`}>
              {step.title}
            </span>
          </div>
        ))}
      </div>

      {/* Current Step Content */}
      {renderStepContent()}

      {/* Completion Message */}
      {currentStep >= steps.length - 1 && (
        <Card className="mt-6 bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
          <CardContent className="text-center p-6">
            <Shield className="w-16 h-16 text-green-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">You Are Strong!</h3>
            <p className="text-gray-600 mb-4">
              You've completed your accountability session for {topic}. Remember, every small step toward freedom is a victory.
            </p>
            <div className="bg-white p-4 rounded-lg mb-4">
              <p className="text-green-800 italic">
                "The Lord your God is with you, the Mighty Warrior who saves. 
                He will take great delight in you; in his love he will no longer rebuke you, 
                but will rejoice over you with singing." - Zephaniah 3:17
              </p>
            </div>
            <div className="flex gap-3 justify-center">
              <Button variant="outline">
                Track Progress
              </Button>
              <Button className="bg-green-600 hover:bg-green-700">
                Set Daily Reminder
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
