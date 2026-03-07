'use client';
import { useState } from 'react';
import { uploadPDF } from '../lib/api';
import { motion, AnimatePresence } from 'framer-motion';

type UploadStatus = 'idle' | 'uploading' | 'processing' | 'success' | 'error';

export default function FileUpload({ onUploadSuccess }: { onUploadSuccess: (name: string) => void }) {
  const [isDragging, setIsDragging] = useState(false);
  const [status, setStatus] = useState<UploadStatus>('idle');
  const [fileName, setFileName] = useState<string | null>(null);

  const handleFile = async (file: File) => {
    if (file.type !== 'application/pdf') return alert('Please upload a PDF');
    if (file.size > 10 * 1024 * 1024) return alert('File too large (Max 10MB)');

    setFileName(file.name);
    setStatus('uploading');
    
    try {
      // Step 1: Uploading to FastAPI
      const res = await uploadPDF(file);
      
      // Step 2: Simulated 'Processing' state while LangChain/ChromaDB chunks the file
      setStatus('processing');
      await new Promise(resolve => setTimeout(resolve, 1500)); 
      
      setStatus('success');
      onUploadSuccess(res.filename);
    } catch (err) {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 3000);
    }
  };

  return (
    <motion.div
      onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={(e) => { e.preventDefault(); setIsDragging(false); handleFile(e.dataTransfer.files[0]); }}
      className={`relative group w-full min-h-[320px] border-2 border-dashed rounded-[2rem] transition-all duration-500 flex flex-col items-center justify-center overflow-hidden ${
        isDragging ? 'border-blue-500 bg-blue-50/50 scale-[1.02]' : 'border-slate-200 bg-white hover:border-blue-300 shadow-sm'
      }`}
    >
      <AnimatePresence mode="wait">
        {status === 'idle' && (
          <motion.div 
            key="idle"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="flex flex-col items-center"
          >
            <div className="w-20 h-20 bg-blue-50 text-blue-600 rounded-3xl flex items-center justify-center mb-6 group-hover:rotate-6 transition-transform duration-300">
              <UploadCloudIcon />
            </div>
            <h3 className="text-xl font-black text-slate-900 mb-2">Drop your PDF here</h3>
            <p className="text-slate-400 text-sm mb-8">Scan and chat with your documents instantly</p>
            <label className="cursor-pointer bg-slate-900 text-white px-8 py-3 rounded-xl text-sm font-bold hover:bg-blue-600 transition-all active:scale-95 shadow-lg shadow-slate-200">
              Select File
              <input type="file" className="hidden" accept=".pdf" onChange={(e) => e.target.files && handleFile(e.target.files[0])} />
            </label>
          </motion.div>
        )}

        {(status === 'uploading' || status === 'processing') && (
          <motion.div 
            key="loading"
            initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center w-full max-w-xs text-center"
          >
            <div className="relative w-16 h-16 mb-6">
              <div className="absolute inset-0 border-4 border-blue-100 rounded-full" />
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                className="absolute inset-0 border-4 border-blue-600 rounded-full border-t-transparent" 
              />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-1">
              {status === 'uploading' ? 'Uploading Document...' : 'Building Vector Index...'}
            </h3>
            <p className="text-slate-400 text-xs mb-4">{fileName}</p>
            <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: "0%" }}
                animate={{ width: status === 'uploading' ? "50%" : "100%" }}
                className="bg-blue-600 h-full transition-all duration-500"
              />
            </div>
          </motion.div>
        )}

        {status === 'success' && (
          <motion.div 
            key="success"
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center text-center"
          >
            <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-4">
              <CheckIcon />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Successfully Indexed!</h3>
            <p className="text-slate-500 text-sm">Redirecting to chat...</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function UploadCloudIcon() {
  return (
    <svg width="32" height="32" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v8" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  );
}