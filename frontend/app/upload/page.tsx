'use client';
import FileUpload from '../components/FileUpload';
import { useRouter } from 'next/navigation';

export default function UploadPage() {
  const router = useRouter();

  return (
    <div className="relative min-h-[calc(100vh-64px)] flex flex-col items-center justify-center px-4 overflow-hidden bg-slate-50">
      {/* Background Accents to match Home Page */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000" />

      <div className="relative z-10 w-full max-w-2xl text-center">
        {/* Stepper / Progress Indicator */}
        <div className="flex items-center justify-center gap-4 mb-12">
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-bold shadow-lg shadow-blue-200">1</span>
            <span className="text-sm font-semibold text-slate-900">Upload</span>
          </div>
          <div className="w-12 h-[2px] bg-slate-200" />
          <div className="flex items-center gap-2 opacity-40">
            <span className="w-8 h-8 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center text-sm font-bold">2</span>
            <span className="text-sm font-semibold text-slate-500">Analyze</span>
          </div>
          <div className="w-12 h-[2px] bg-slate-200" />
          <div className="flex items-center gap-2 opacity-40">
            <span className="w-8 h-8 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center text-sm font-bold">3</span>
            <span className="text-sm font-semibold text-slate-500">Chat</span>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-4xl font-black text-slate-900 mb-3 tracking-tight">
            Analyze your Document
          </h2>
          <p className="text-slate-500 text-lg">
            Upload a PDF and our AI will index its contents for instant querying.
          </p>
        </div>

        {/* The Component Wrapper with Glassmorphism */}
        <div className="glass-card p-4 sm:p-8 rounded-3xl border-white/50 shadow-2xl">
          <FileUpload onUploadSuccess={() => router.push('/chat')} />
          
          <div className="mt-6 flex items-center justify-center gap-6 text-xs text-slate-400 font-medium uppercase tracking-widest">
            <div className="flex items-center gap-2">
              <ShieldIcon /> Secure & Private
            </div>
            <div className="flex items-center gap-2">
              <BoltIcon /> Fast Processing
            </div>
          </div>
        </div>

        <button 
          onClick={() => router.back()}
          className="mt-8 text-sm font-semibold text-slate-400 hover:text-slate-600 transition flex items-center gap-2 mx-auto"
        >
          <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path d="M15 19l-7-7 7-7" /></svg>
          Go Back
        </button>
      </div>
    </div>
  );
}

function ShieldIcon() {
  return <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>;
}

function BoltIcon() {
  return <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" /></svg>;
}