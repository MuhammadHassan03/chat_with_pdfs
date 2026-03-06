'use client';
import { ReactNode, useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ChatBox({ children }: { children: ReactNode }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [docName, setDocName] = useState<string>('');

  useEffect(() => {
    const name = localStorage.getItem('current_pdf_name') || 'Document.pdf';
    setDocName(name);
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [children]);

  const isEmpty = !children || (Array.isArray(children) && children.length === 0);

  return (
    <div 
      ref={scrollRef}
      className="flex-1 overflow-y-auto bg-slate-50/50 custom-scrollbar relative scroll-smooth"
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-blue-400/5 rounded-full blur-[120px]" />
        <div className="absolute -bottom-[10%] -right-[10%] w-[40%] h-[40%] bg-indigo-400/5 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-4xl mx-auto w-full min-h-full flex flex-col px-6 py-10 relative z-10">
        <AnimatePresence mode="wait">
          {isEmpty ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex-1 flex flex-col items-center justify-center text-center space-y-6"
            >
              <div className="relative">
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                  className="absolute -inset-4 border border-dashed border-blue-200/60 rounded-full"
                />
                <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center shadow-2xl shadow-blue-100 border border-slate-100 relative z-10 text-3xl">
                  👋
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-2xl font-black text-slate-900 tracking-tight">
                  I'm ready to help!
                </h3>
                <p className="text-sm text-slate-500 max-w-[280px] leading-relaxed">
                  I've finished reading <span className="font-bold text-blue-600">"{docName}"</span>. What would you like to know?
                </p>
              </div>

              <div className="flex flex-wrap justify-center gap-2 max-w-md pt-4">
                {["Summarize", "Main Points", "Action Items"].map((tag) => (
                  <span key={tag} className="px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-[10px] font-black uppercase tracking-widest text-slate-400 shadow-sm">
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ) : (
            <div className="flex flex-col gap-8 pb-10">
              <motion.div 
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="sticky top-0 z-30 flex justify-center"
              >
                <div className="bg-white/70 backdrop-blur-md border border-slate-200/60 px-4 py-2 rounded-2xl shadow-xl shadow-slate-200/50 flex items-center gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-[10px] font-black text-slate-700 uppercase tracking-tighter">
                    Chatting about: <span className="text-blue-600">{docName}</span>
                  </span>
                </div>
              </motion.div>

              {children}
            </div>
          )}
        </AnimatePresence>

        <div className="h-4 flex-shrink-0" />
      </div>
    </div>
  );
}