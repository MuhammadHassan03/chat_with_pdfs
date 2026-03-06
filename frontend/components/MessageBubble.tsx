'use client';
import { motion } from 'framer-motion';

export default function MessageBubble({ text }: { text: string }) {
  // Extracting page number if it exists in the text string (e.g., "Source: 1")
  const pageMatch = text.match(/source:\s*(\d+)/i);
  const pageNumber = pageMatch ? pageMatch[1] : null;

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="inline-flex items-center gap-2 bg-slate-50 border border-slate-200 text-slate-600 text-[11px] px-3 py-1.5 rounded-lg my-2 hover:bg-blue-50 hover:border-blue-100 hover:text-blue-700 transition-all cursor-default group"
    >
      <div className="flex items-center justify-center w-4 h-4 bg-slate-200 rounded text-[9px] font-bold group-hover:bg-blue-600 group-hover:text-white transition-colors">
        {pageNumber || 'i'}
      </div>
      <span className="font-medium">
        <strong className="text-slate-900 group-hover:text-blue-800">Reference:</strong> {text.replace(/\[?source:\s*\d+\]?/i, '').trim() || `Page ${pageNumber}`}
      </span>
    </motion.div>
  );
}