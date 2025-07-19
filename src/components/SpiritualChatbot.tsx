
import React, { useState, useRef, useEffect } from 'react';
import { Send, Sparkles, Heart, Flower, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ChatMessage } from './ChatMessage';
import { TypingIndicator } from './TypingIndicator';
import { WelcomeCard } from './WelcomeCard';
import Groq from 'groq-sdk';

interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
}

interface SpiritualChatbotProps {
  onBack?: () => void;
}

const groq = new Groq({
  apiKey: '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',
  dangerouslyAllowBrowser: true
});

export const SpiritualChatbot: React.FC<SpiritualChatbotProps> = ({ onBack }) => {
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
    try {
      const completion = await groq.chat.completions.create({
        messages: [
          {
            role: "system",
            content: `You are DSCPL, a compassionate spiritual guide and counselor AI assistant. Your role is to provide wisdom, comfort, and guidance to those seeking spiritual growth and inner peace. 

Key guidelines for your responses:
- Always respond with empathy, warmth, and understanding
- Use gentle, nurturing language that feels supportive
- Include relevant spiritual wisdom from various traditions when appropriate
- Offer practical advice alongside spiritual insights
- Use emojis occasionally to add warmth (🙏, ✨, 🌸, 💖, etc.)
- Keep responses thoughtful but not overly long
- Ask meaningful follow-up questions to encourage self-reflection
- Always maintain a tone of unconditional love and acceptance
- Focus on inner peace, mindfulness, purpose, love, and spiritual growth
- Avoid being preachy or prescriptive - instead, offer gentle suggestions

Remember: You are here to support, not to judge. Every person's spiritual journey is unique and sacred.`
          },
          {
            role: "user",
            content: userMessage
          }
        ],
        model: "llama3-8b-8192",
        temperature: 0.7,
        max_tokens: 500,
      });

      return completion.choices[0]?.message?.content || "I'm here to listen and support you on your spiritual journey. Please share what's on your heart. 🙏";
    } catch (error) {
      console.error('Error calling Groq API:', error);
      return "I'm experiencing some technical difficulties right now, but I'm still here with you in spirit. Sometimes these moments of pause remind us to breathe deeply and find peace within ourselves. 🌸 Please try again in a moment.";
    }
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

    try {
      const response = await generateSpiritualResponse(messageToSend);
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: response,
        isUser: false,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Error generating response:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "I apologize, but I'm having trouble connecting right now. Please try again in a moment. In the meantime, remember that you carry infinite wisdom within you. 🙏",
        isUser: false,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50 p-4">
      <div className="max-w-4xl mx-auto">
        {onBack && (
          <div className="mb-6">
            <Button variant="ghost" onClick={onBack} className="mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to DSCPL
            </Button>
          </div>
        )}
        
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Flower className="w-8 h-8 text-purple-600" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              DSCPL Chat
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
