
import React from 'react';
import { User, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
}

interface ChatMessageProps {
  message: Message;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  return (
    <div
      className={cn(
        'flex gap-3 max-w-[80%] animate-in slide-in-from-bottom-2 duration-300',
        message.isUser ? 'ml-auto flex-row-reverse' : 'mr-auto'
      )}
    >
      <div
        className={cn(
          'flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center',
          message.isUser
            ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white'
            : 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
        )}
      >
        {message.isUser ? (
          <User className="w-4 h-4" />
        ) : (
          <Sparkles className="w-4 h-4" />
        )}
      </div>
      
      <div
        className={cn(
          'px-4 py-3 rounded-2xl shadow-sm',
          message.isUser
            ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-tr-sm'
            : 'bg-white border border-purple-100 text-gray-800 rounded-tl-sm'
        )}
      >
        <p className="text-sm leading-relaxed whitespace-pre-wrap">
          {message.content}
        </p>
        <div
          className={cn(
            'text-xs mt-2 opacity-70',
            message.isUser ? 'text-blue-100' : 'text-gray-500'
          )}
        >
          {message.timestamp.toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          })}
        </div>
      </div>
    </div>
  );
};
