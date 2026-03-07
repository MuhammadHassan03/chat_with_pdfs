'use client';
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { askQuestion } from '@/lib/api';
import { Message } from '@/types/chat';

import ChatBox from '@/components/ChatBox';
import ChatMessage from '@/components/ChatMessage';
import Loader from '@/components/Loader';

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e?: React.FormEvent, textOverride?: string) => {
    e?.preventDefault();
    const query = textOverride || input;
    if (!query.trim() || isLoading) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      text: query,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const data = await askQuestion(query);
      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        text: data.answer,
        isUser: false,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, aiMsg]);
    } catch (error: any) {
      // --- FRIENDLY ERROR HANDLING ---
      let friendlyError = "Something went wrong. Please try again.";
      
      if (error?.message?.includes('429')) {
        friendlyError = "I'm a bit overwhelmed with questions right now! Please wait a few seconds and try again.";
      } else if (error?.message?.includes('network')) {
        friendlyError = "I'm having trouble connecting to the internet. Please check your connection.";
      }

      const errorMsg: Message = {
        id: 'error',
        text: friendlyError,
        isUser: false,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-64px)] bg-slate-50/50">
      
      {/* --- SIMPLE HEADER --- */}
      <header className="bg-white/80 backdrop-blur-md border-b border-slate-200/60 px-8 py-3 flex justify-between items-center z-20">
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Assistant Ready</span>
        </div>
        <div className="flex items-center gap-4">
           <button 
            onClick={() => setMessages([])}
            className="text-[10px] font-bold text-slate-400 hover:text-red-500 transition-colors uppercase"
          >
            Clear Chat
          </button>
        </div>
      </header>

      {/* --- CHAT AREA --- */}
      <ChatBox>
        <AnimatePresence mode="wait">
          {messages.length === 0 ? (
            <motion.div
              key="empty-state"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="flex-1 flex flex-col items-center justify-center min-h-[60vh] text-center"
            >
              <div className="w-16 h-16 bg-white rounded-[1.5rem] flex items-center justify-center mb-6 shadow-xl border border-slate-100">
                <span className="text-2xl">✨</span>
              </div>
              <h2 className="text-3xl font-black text-slate-900 mb-2 tracking-tight">Ask your Document</h2>
              <p className="text-slate-400 text-sm max-w-xs mb-10 font-medium leading-relaxed">
                I've analyzed your file and I'm ready to answer your questions.
              </p>
              
              <div className="flex flex-wrap justify-center gap-2 max-w-lg px-4">
                {["Give me a summary", "What are the main points?", "Find important dates"].map((q, i) => (
                  <button
                    key={i}
                    onClick={() => handleSubmit(undefined, q)}
                    className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-600 hover:border-blue-500 hover:text-blue-600 transition-all shadow-sm active:scale-95"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div 
              key="chat-content"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col gap-2"
            >
              {messages.map((m) => (
                <ChatMessage key={m.id} message={m} />
              ))}
              
              {isLoading && (
                <div className="py-4">
                  <Loader />
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </ChatBox>

      {/* --- INPUT AREA --- */}
      <div className="p-6 bg-white border-t border-slate-100">
        <form onSubmit={handleSubmit} className="max-w-4xl mx-auto relative group">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your question here..."
            className="w-full pl-6 pr-14 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:border-slate-900 focus:ring-0 outline-none transition-all font-medium text-slate-800"
          />
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="absolute right-2 top-2 p-2.5 bg-slate-900 text-white rounded-xl hover:bg-slate-800 disabled:bg-slate-100 disabled:text-slate-300 transition-all flex items-center justify-center"
          >
            <ArrowIcon />
          </button>
        </form>
      </div>
    </div>
  );
}

function ArrowIcon() {
  return (
    <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 19V5m-7 7l7-7 7 7" />
    </svg>
  );
}