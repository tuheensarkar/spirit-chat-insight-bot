
import React, { useState, useRef, useEffect } from 'react';
import { Send, Sparkles, Heart, Lotus } from 'lucide-react';
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
    // Simulate AI processing with spiritual context
    const spiritualResponses = [
      "🙏 Thank you for sharing your thoughts. In moments of uncertainty, remember that peace comes from within. What aspect of your spiritual journey would you like to explore today?",
      "✨ Your question touches the heart of spiritual wisdom. Like a lotus flower rising from muddy waters, we too can find beauty and growth in challenging times. How can I guide you further?",
      "🧘‍♀️ I sense you're seeking deeper understanding. The path to enlightenment is unique for each soul. What spiritual practices bring you the most peace?",
      "💫 Every step on your spiritual journey has purpose. Sometimes the universe speaks to us through quiet moments of reflection. What signs have you noticed in your life recently?",
      "🌅 Your spiritual awakening is a beautiful process. Like the dawn breaking after a long night, clarity often comes when we least expect it. What would you like to explore together?",
      "🕉️ The ancient wisdom reminds us that we are all connected. Your question reflects a deep desire for spiritual growth. How can I support your journey today?",
    ];

    // Simple keyword-based responses for demo
    if (userMessage.toLowerCase().includes('meditation')) {
      return "🧘‍♀️ Meditation is a sacred practice that connects us to our inner wisdom. Start with just 5 minutes daily, focusing on your breath. As you breathe in, imagine drawing in peace and light. As you exhale, release any tension or worries. Would you like guidance on specific meditation techniques?";
    }
    
    if (userMessage.toLowerCase().includes('purpose') || userMessage.toLowerCase().includes('meaning')) {
      return "✨ Your purpose is like a seed within you, waiting to bloom. Often, our true calling reveals itself through what brings us joy and what we feel called to contribute to the world. What activities make you feel most alive and connected to something greater?";
    }

    if (userMessage.toLowerCase().includes('stress') || userMessage.toLowerCase().includes('anxiety')) {
      return "🌸 I understand you're experiencing challenging emotions. Remember, like clouds passing through the sky, these feelings are temporary. Try this: Place your hand on your heart, take three deep breaths, and remind yourself 'This too shall pass.' What spiritual practices help you find calm?";
    }

    // Return a random spiritual response
    return spiritualResponses[Math.floor(Math.random() * spiritualResponses.length)];
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate processing time
    setTimeout(async () => {
      const response = await generateSpiritualResponse(inputValue);
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: response,
        isUser: false,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500 + Math.random() * 1000); // Random delay between 1.5-2.5 seconds
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Lotus className="w-8 h-8 text-purple-600" />
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
                <WelcomeCard />
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
