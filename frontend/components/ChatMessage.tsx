'use client';
import { motion } from 'framer-motion';
import { Message } from '@/types/chat';
import { useEffect, useState } from 'react';

export default function ChatMessage({ message }: { message: Message }) {
  const isUser = message.isUser;
  const [time, setTime] = useState<string>('');

  // Fix Hydration mismatch by setting time only on client mount
  useEffect(() => {
    setTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
  }, []);
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-6 w-full`}
    >
      <div className={`flex gap-3 max-w-[85%] md:max-w-[75%] ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
        
        {/* Avatar */}
        <div className={`w-8 h-8 rounded-lg flex-shrink-0 flex items-center justify-center text-[10px] font-bold shadow-sm ${
          isUser ? 'bg-blue-600 text-white' : 'bg-slate-900 text-white'
        }`}>
          {isUser ? 'MH' : 'AI'}
        </div>
        
        <div className={`flex flex-col gap-2 ${isUser ? 'items-end' : 'items-start'}`}>
          {/* Bubble */}
          <div className={`px-4 py-3 rounded-2xl shadow-sm text-sm leading-relaxed ${
            isUser 
              ? 'bg-blue-600 text-white rounded-tr-none' 
              : 'bg-white border border-slate-200 text-slate-800 rounded-tl-none'
          }`}>
            {message.text}
          </div>

          {/* Sources Rendering - Logic fix for the error */}
          {!isUser && message.sources && message.sources.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-1">
              {message.sources.map((source, index) => (
                <span 
                  key={index} 
                  className="text-[10px] px-2 py-1 bg-slate-100 border border-slate-200 rounded-md text-slate-500 font-medium hover:bg-blue-50 hover:text-blue-600 transition-colors cursor-default"
                >
                  Page {source.page}
                </span>
              ))}
            </div>
          )}

          {/* Timestamp */}
          {time && (
            <span className="text-[10px] text-slate-400 font-medium px-1">
              {time}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
}