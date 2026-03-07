'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-white border-t border-slate-100 pt-24 pb-12 overflow-hidden">
      {/* Decorative Blobs - Matching Homepage */}
      <div className="absolute top-0 left-1/4 w-64 h-64 bg-blue-100/40 rounded-full filter blur-3xl opacity-50 -z-10 animate-pulse" />
      <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-indigo-100/40 rounded-full filter blur-3xl opacity-50 -z-10" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-20">
          
          {/* Brand & Identity - Larger Span */}
          <div className="md:col-span-5 space-y-6">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center text-white font-black shadow-lg shadow-blue-200 group-hover:scale-105 transition-transform">
                CP
              </div>
              <span className="text-2xl font-black tracking-tighter text-slate-900">
                Chat<span className="bg-gradient-to-r from-blue-600 to-indigo-500 bg-clip-text text-transparent">PDF</span>
              </span>
            </Link>
            
            <p className="text-slate-500 text-base leading-relaxed max-w-sm">
              Architected by <span className="font-bold text-slate-900">Muhammad Hassan</span>. 
              A professional-grade RAG pipeline turning static documents into active intelligence.
            </p>
            
            <div className="flex gap-3">
              <SocialLink href="https://github.com/MuhammadHassan03" icon={<GithubIcon />} label="GitHub" color="hover:bg-slate-900" />
              <SocialLink href="https://linkedin.com/in/muhammadhassan03" icon={<LinkedInIcon />} label="LinkedIn" color="hover:bg-blue-600" />
              <SocialLink href="mailto:engineermirzahassan@gmail.com" icon={<MailIcon />} label="Email" color="hover:bg-rose-500" />
            </div>
          </div>

          {/* Tech Stack */}
          <div className="md:col-span-2">
            <h4 className="text-xs font-black uppercase tracking-[0.2em] text-slate-900 mb-6">Tech Stack</h4>
            <ul className="space-y-4 text-sm font-bold text-slate-500">
              <li className="hover:text-blue-600 transition-colors cursor-default">Next.js 15</li>
              <li className="hover:text-blue-600 transition-colors cursor-default">FastAPI</li>
              <li className="hover:text-blue-600 transition-colors cursor-default">Gemini 2.0</li>
              <li className="hover:text-blue-600 transition-colors cursor-default">ChromaDB</li>
            </ul>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-2">
            <h4 className="text-xs font-black uppercase tracking-[0.2em] text-slate-900 mb-6">Explore</h4>
            <ul className="space-y-4 text-sm font-bold text-slate-500">
              <li><Link href="/" className="hover:text-blue-600 transition-colors">Home</Link></li>
              <li><Link href="/upload" className="hover:text-blue-600 transition-colors">Upload</Link></li>
              <li><Link href="/chat" className="hover:text-blue-600 transition-colors">Chat Interface</Link></li>
            </ul>
          </div>

          {/* Hire Me Card - Modern Glassmorphism */}
          <div className="md:col-span-3">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-500 rounded-2xl blur opacity-10 group-hover:opacity-20 transition duration-500"></div>
              <div className="relative bg-white border border-slate-200 p-6 rounded-2xl shadow-sm">
                <h4 className="font-black text-slate-900 mb-2">Hire the Dev</h4>
                <p className="text-xs text-slate-500 mb-4 leading-relaxed font-medium">
                  Looking for a Software Engineer to build AI-powered solutions?
                </p>
                <a 
                  href="mailto:engineermirzahassan@gmail.com"
                  className="flex items-center justify-center w-full bg-slate-900 text-white py-3 rounded-xl text-xs font-black hover:bg-blue-600 transition-all shadow-lg active:scale-95"
                >
                  Let's Talk
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-10 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-slate-400 text-[11px] font-bold uppercase tracking-widest">
            © {currentYear} ALL RIGHTS RESERVED • BUILT IN LAHORE
          </p>
          
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 px-3 py-1 bg-green-50 rounded-full border border-green-100">
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
              <span className="text-[10px] font-black text-green-700 uppercase tracking-tighter">Open for Work</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* Reusable Components for Cleanliness */
function SocialLink({ href, icon, label, color }: { href: string, icon: any, label: string, color: string }) {
  return (
    <a 
      href={href} 
      target="_blank" 
      className={`p-2.5 rounded-xl bg-slate-50 text-slate-600 transition-all ${color} hover:text-white hover:-translate-y-1 shadow-sm`}
      title={label}
    >
      {icon}
    </a>
  );
}

{/* Icons with slightly better sizing */}
function GithubIcon() { return <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>; }
function LinkedInIcon() { return <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>; }
function MailIcon() { return <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>; }