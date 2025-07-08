
import React, { useState, useRef, useEffect } from 'react';
import { Send, Sparkles, Heart, Flower } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ChatMessage } from './ChatMessage';
import { TypingIndicator } from './TypingIndicator';
import { WelcomeCard } from './WelcomeCard';

interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
}

export const SpiritualChatbot = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateSpiritualResponse = async (userMessage: string): Promise<string> => {
    const lowerMessage = userMessage.toLowerCase();
    
    // More comprehensive response system based on keywords
    if (lowerMessage.includes('meditation') || lowerMessage.includes('meditate')) {
      return "🧘‍♀️ Meditation is a beautiful gateway to inner peace. I recommend starting with just 5-10 minutes daily. Find a quiet space, sit comfortably, and focus on your breath. When thoughts arise, gently acknowledge them and return to your breathing. Remember, meditation is not about stopping thoughts but observing them without judgment. Would you like me to guide you through a simple breathing exercise?";
    }
    
    if (lowerMessage.includes('purpose') || lowerMessage.includes('meaning') || lowerMessage.includes('life')) {
      return "✨ Your life's purpose is like a seed planted deep within your soul. It often reveals itself through what brings you joy, what challenges inspire you to grow, and how you naturally want to serve others. Ask yourself: What activities make you lose track of time? What problems do you feel called to solve? Your purpose isn't something you find—it's something you remember. What resonates with your heart when you think about making a difference?";
    }

    if (lowerMessage.includes('peace') || lowerMessage.includes('calm') || lowerMessage.includes('inner peace')) {
      return "🕊️ Inner peace is your natural state, dear soul. It's always there beneath the surface, waiting for you to come home to it. Try this simple practice: Place your hand on your heart, close your eyes, and breathe deeply. With each breath, imagine roots growing from your feet into the earth, grounding you. Peace isn't the absence of storms—it's finding stillness within them. What helps you feel most centered?";
    }

    if (lowerMessage.includes('stress') || lowerMessage.includes('anxiety') || lowerMessage.includes('overwhelmed') || lowerMessage.includes('worried')) {
      return "🌸 I hear you, and I want you to know that what you're feeling is valid. When we're overwhelmed, our spirit contracts, but remember—you are stronger than any storm. Try this: Take three deep breaths, and with each exhale, imagine releasing what doesn't serve you. Ground yourself by feeling your feet on the earth. You don't have to carry everything at once. What's one small thing you can do right now to show yourself compassion?";
    }

    if (lowerMessage.includes('love') || lowerMessage.includes('relationship') || lowerMessage.includes('heart')) {
      return "💖 Love is the highest vibration and the essence of who you are. Whether you're seeking love or deepening existing relationships, remember that it all begins with self-love. You cannot pour from an empty cup. How do you show kindness to yourself? When you radiate love from within, you naturally attract and give love more freely. What does love mean to you in your spiritual journey?";
    }

    if (lowerMessage.includes('guidance') || lowerMessage.includes('help') || lowerMessage.includes('support')) {
      return "🌟 You've taken a beautiful step by seeking guidance. The universe responds to those who ask with an open heart. Trust that you have all the wisdom you need within you—sometimes we just need a gentle reminder to listen. Your intuition is your inner compass. What does your heart tell you when you quiet your mind? I'm here to walk alongside you on this journey.";
    }

    if (lowerMessage.includes('grateful') || lowerMessage.includes('gratitude') || lowerMessage.includes('thankful')) {
      return "🙏 Gratitude is one of the most powerful spiritual practices. It shifts our vibration and opens our hearts to abundance. When we focus on what we're grateful for, we align with the frequency of joy. Even in difficult times, there are small blessings to acknowledge. What are three things you're grateful for today, no matter how small?";
    }

    if (lowerMessage.includes('fear') || lowerMessage.includes('afraid') || lowerMessage.includes('scared')) {
      return "🌅 Fear is often just love in disguise—love for something we don't want to lose, or love for growth we're not ready for. But remember, you are braver than you believe and stronger than you seem. Fear loses its power when we face it with compassion. What if this fear is trying to protect something precious in you? What would you do if you knew you were divinely supported?";
    }

    // Default spiritual responses for general queries
    const defaultResponses = [
      "🙏 Thank you for sharing your thoughts with me. Every question you ask is a step deeper into your spiritual awakening. The fact that you're here, seeking guidance, shows the beautiful light within you. What aspect of your spiritual journey feels most important to explore right now?",
      "✨ Your soul is speaking through your words, and I'm honored to listen. On the spiritual path, every experience—joyful or challenging—is a teacher. What lessons do you feel life is trying to share with you lately?",
      "🌸 I sense a beautiful spirit in you, one that's ready to grow and expand. Sometimes the most profound spiritual insights come through our everyday experiences. What has been stirring in your heart recently?",
      "🕯️ In the sacred space of this conversation, know that you are exactly where you need to be. Your spiritual journey is uniquely yours, and every step has meaning. What would bring you the most peace right now?",
      "🌙 The universe has a way of bringing us exactly what we need when we need it. Your presence here is no coincidence. What draws you to seek spiritual guidance today?",
      "💫 Every soul has its own rhythm and timing for awakening. Trust the process, even when the path seems unclear. What does your inner wisdom whisper to you when you listen closely?"
    ];

    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputValue(suggestion);
    handleSubmit(null, suggestion);
  };

  const handleSubmit = async (e: React.FormEvent | null, messageText?: string) => {
    if (e) e.preventDefault();
    
    const messageToSend = messageText || inputValue;
    if (!messageToSend.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: messageToSend,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate more realistic processing time
    const processingTime = 1000 + Math.random() * 2000; // 1-3 seconds
    
    setTimeout(async () => {
      const response = await generateSpiritualResponse(messageToSend);
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: response,
        isUser: false,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, processingTime);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Flower className="w-8 h-8 text-purple-600" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Spiritual Guide
            </h1>
            <Sparkles className="w-8 h-8 text-pink-600" />
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Welcome to your personal spiritual companion. Share your thoughts, seek guidance, 
            and explore the depths of your spiritual journey with compassion and wisdom.
          </p>
        </div>

        <Card className="shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader className="bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-t-lg">
            <CardTitle className="flex items-center gap-2">
              <Heart className="w-5 h-5" />
              Spiritual Conversation
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <ScrollArea 
              className="h-96 p-4" 
              ref={scrollAreaRef}
            >
              {messages.length === 0 ? (
                <WelcomeCard onSuggestionClick={handleSuggestionClick} />
              ) : (
                <div className="space-y-4">
                  {messages.map((message) => (
                    <ChatMessage key={message.id} message={message} />
                  ))}
                  {isTyping && <TypingIndicator />}
                </div>
              )}
            </ScrollArea>
            
            <div className="border-t bg-gray-50/50 p-4">
              <form onSubmit={handleSubmit} className="flex gap-2">
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Share your thoughts or ask for spiritual guidance..."
                  className="flex-1 border-purple-200 focus:border-purple-400 focus:ring-purple-400"
                  disabled={isTyping}
                />
                <Button 
                  type="submit" 
                  disabled={!inputValue.trim() || isTyping}
                  className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </form>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
