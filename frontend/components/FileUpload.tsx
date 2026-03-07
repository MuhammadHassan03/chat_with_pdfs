'use client';

import { useState, useRef } from 'react';
import { uploadPDF } from '@/lib/api';
import { motion, AnimatePresence } from 'framer-motion';

type UploadStatus = 'idle' | 'uploading' | 'processing' | 'success' | 'error';

export default function FileUpload({ onUploadSuccess }: { onUploadSuccess: (name: string) => void }) {
  const [isDragging, setIsDragging] = useState(false);
  const [status, setStatus] = useState<UploadStatus>('idle');
  const [fileName, setFileName] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = async (file: File | undefined) => {
    if (!file) return;

    // Basic Validation
    if (file.type !== 'application/pdf') {
      alert('Please upload a PDF file.');
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      alert('File is too large! Maximum limit is 10MB.');
      return;
    }

    setFileName(file.name);
    setStatus('uploading');
    
    try {
      // Step 1: API Call (FastAPI + Pinecone)
      const res = await uploadPDF(file);
      console.log('res', )
      // Step 2: Artificial "Processing" state for indexing feel
      setStatus('processing');
      await new Promise(resolve => setTimeout(resolve, 2000)); 
      
      setStatus('success');

      // Step 3: Callback after a short delay for success animation
      setTimeout(() => {
        onUploadSuccess(res.filename);
      }, 1500);

    } catch (err) {
      console.error("Upload failed:", err);
      setStatus('error');
      
      // Reset after 3 seconds so user can try again
      setTimeout(() => {
        setStatus('idle');
        setFileName(null);
        if (fileInputRef.current) fileInputRef.current.value = "";
      }, 3000);
    }
  };

  return (
    <motion.div
      onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={(e) => { 
        e.preventDefault(); 
        setIsDragging(false); 
        handleFile(e.dataTransfer.files?.[0]); 
      }}
      className={`relative group w-full min-h-[350px] border-2 border-dashed rounded-[2.5rem] transition-all duration-500 flex flex-col items-center justify-center overflow-hidden ${
        isDragging ? 'border-blue-500 bg-blue-50/50 scale-[1.01]' : 'border-slate-200 bg-white hover:border-blue-300 shadow-sm'
      }`}
    >
      <AnimatePresence mode="wait">
        {status === 'idle' && (
          <motion.div 
            key="idle"
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
            className="flex flex-col items-center px-6 text-center"
          >
            <div className="w-20 h-20 bg-blue-50 text-blue-600 rounded-3xl flex items-center justify-center mb-6 group-hover:rotate-6 transition-transform duration-300">
              <UploadCloudIcon />
            </div>
            <h3 className="text-xl font-black text-slate-900 mb-2">Drop your PDF here</h3>
            <p className="text-slate-400 text-sm mb-8">Ready to analyze and chat with your document</p>
            <label className="cursor-pointer bg-slate-900 text-white px-10 py-3.5 rounded-2xl text-sm font-bold hover:bg-blue-600 transition-all active:scale-95 shadow-xl shadow-slate-200">
              Select File
              <input 
                ref={fileInputRef}
                type="file" 
                className="hidden" 
                accept=".pdf" 
                onChange={(e) => {
                  handleFile(e.target.files?.[0]);
                  e.target.value = ""; // Fix: Clear value for re-uploads
                }} 
              />
            </label>
          </motion.div>
        )}

        {(status === 'uploading' || status === 'processing') && (
          <motion.div 
            key="loading"
            initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
            className="flex flex-col items-center w-full max-w-xs text-center px-6"
          >
            <div className="relative w-20 h-20 mb-8">
              <div className="absolute inset-0 border-4 border-blue-50 rounded-full" />
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                className="absolute inset-0 border-4 border-blue-600 rounded-full border-t-transparent shadow-sm" 
              />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">
              {status === 'uploading' ? 'Sending to Server...' : 'Vectorizing Content...'}
            </h3>
            <p className="text-slate-400 text-xs mb-6 truncate w-full">{fileName}</p>
            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: "0%" }}
                animate={{ width: status === 'uploading' ? "45%" : "100%" }}
                className="bg-blue-600 h-full transition-all duration-700 ease-out"
              />
            </div>
          </motion.div>
        )}

        {status === 'success' && (
          <motion.div 
            key="success"
            initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center text-center px-6"
          >
            <div className="w-20 h-20 bg-green-50 text-green-600 rounded-full flex items-center justify-center mb-6 shadow-sm">
              <CheckIcon />
            </div>
            <h3 className="text-xl font-black text-slate-900 mb-2">Success!</h3>
            <p className="text-slate-500 text-sm italic">Knowledge base is ready for questions.</p>
          </motion.div>
        )}

        {status === 'error' && (
          <motion.div 
            key="error"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="flex flex-col items-center text-center px-6"
          >
            <div className="w-16 h-16 bg-red-50 text-red-600 rounded-full flex items-center justify-center mb-4">
               <span className="text-2xl">⚠️</span>
            </div>
            <h3 className="text-lg font-bold text-slate-900">Upload Failed</h3>
            <p className="text-red-500 text-sm">Please check your connection and try again.</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// Icons
function UploadCloudIcon() {
  return (
    <svg width="36" height="36" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v8" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="36" height="36" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3.5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  );
}