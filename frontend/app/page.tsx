'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Home() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };

  return (
    <main className="bg-slate-50 overflow-x-hidden">
      {/* HERO SECTION */}
      <section className="relative min-h-screen flex items-center justify-center pt-20">
        <div className="absolute top-0 -left-4 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" />
        <div className="absolute top-0 -right-4 w-72 h-72 bg-indigo-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000" />
        
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="relative z-10 flex flex-col items-center max-w-6xl mx-auto px-4 text-center"
        >
          <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-slate-200 shadow-sm text-blue-600 text-xs font-bold mb-8">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            AI-POWERED PDF ANALYSIS
          </motion.div>

          <motion.h1 variants={itemVariants} className="text-6xl md:text-8xl font-black tracking-tight text-slate-900 mb-6 leading-[1.05] text-balance">
            Your Documents. <br />
            <span className="bg-gradient-to-r from-blue-600 to-indigo-500 bg-clip-text text-transparent">
              Now Talkative.
            </span>
          </motion.h1>

          <motion.p variants={itemVariants} className="text-lg md:text-xl text-slate-600 max-w-2xl mb-12 leading-relaxed">
            The ultimate RAG-powered assistant. Upload any PDF and get instant, 
            cited answers. Perfect for researchers, students, and professionals.
          </motion.p>

          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 mb-20 w-full justify-center">
            <Link href="/upload" className="bg-blue-600 text-white rounded-xl text-lg px-12 py-4 shadow-2xl shadow-blue-200 flex items-center justify-center gap-2 group hover:bg-blue-700 transition-all">
              <UploadIcon />
              Get Started
              <motion.span animate={{ x: [0, 5, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>
                 →
              </motion.span>
            </Link>
            <Link href="#how-it-works" className="px-12 py-4 bg-white text-slate-900 border border-slate-200 rounded-xl font-bold hover:bg-slate-50 transition-all flex items-center justify-center gap-2">
              Learn More
            </Link>
          </motion.div>

          {/* Feature Dashboard Preview */}
          <motion.div variants={itemVariants} whileHover={{ scale: 1.01 }} className="relative w-full max-w-5xl group">
             <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-500 rounded-2xl blur opacity-20 group-hover:opacity-30 transition duration-1000"></div>
             <div className="relative bg-white rounded-2xl overflow-hidden border border-slate-200 p-3 shadow-2xl">
               <div className="bg-slate-900 rounded-xl aspect-video flex overflow-hidden border border-slate-800">
                  <div className="w-64 border-r border-slate-800 p-4 space-y-4 hidden md:block">
                    {[1,2,3].map(i => <div key={i} className="h-8 w-full bg-slate-800/50 rounded animate-pulse" />)}
                  </div>
                  <div className="flex-1 p-8 space-y-6">
                    <div className="h-4 w-1/4 bg-slate-800 rounded animate-pulse" />
                    <div className="space-y-3">
                      <div className="h-4 w-full bg-slate-800/50 rounded" />
                      <div className="h-4 w-full bg-slate-800/50 rounded" />
                      <div className="h-4 w-2/3 bg-slate-800/50 rounded" />
                    </div>
                    <div className="h-40 w-full bg-blue-600/10 border border-blue-500/20 rounded-xl flex items-center justify-center">
                       <span className="text-blue-400 text-sm font-mono">Analyzing PDF Structure...</span>
                    </div>
                  </div>
               </div>
             </div>
          </motion.div>
        </motion.div>
      </section>

      {/* STATS SECTION */}
      <section className="py-20 bg-white border-y border-slate-100">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { label: 'Accuracy', value: '99.9%' },
            { label: 'Processing Speed', value: '< 2s' },
            { label: 'Users Worldwide', value: '10k+ 😂' },
            { label: 'PDFs Analyzed', value: '1M+ 😂' },
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <div className="text-3xl font-black text-slate-900 mb-1">{stat.value}</div>
              <div className="text-slate-500 text-sm font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS SECTION */}
      <section id="how-it-works" className="py-32 max-w-6xl mx-auto px-4">
        <div className="text-center mb-20">
          <h2 className="text-4xl font-black text-slate-900 mb-4">Three simple steps</h2>
          <p className="text-slate-600">From raw data to intelligent insights in seconds.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-12">
          {[
            { title: 'Upload', desc: 'Securely drop your PDFs into our encrypted storage.', icon: '📁' },
            { title: 'Process', desc: 'Our AI vectorizes and chunks your data for fast retrieval.', icon: '⚡' },
            { title: 'Chat', desc: 'Ask questions and get answers with direct citations.', icon: '💬' },
          ].map((step, i) => (
            <div key={i} className="relative group">
              <div className="text-5xl mb-6">{step.icon}</div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">{step.title}</h3>
              <p className="text-slate-600 leading-relaxed">{step.desc}</p>
              {i < 2 && <div className="hidden md:block absolute top-8 -right-6 text-slate-300 text-4xl">→</div>}
            </div>
          ))}
        </div>
      </section>

      {/* FEATURES GRID */}
      {/* <section className="py-32 bg-slate-900 text-white rounded-[3rem] mx-4 mb-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="mb-20">
            <h2 className="text-4xl font-black mb-4">Engineered for Precision</h2>
            <p className="text-slate-400">Advanced RAG architecture ensures zero hallucinations.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: 'Semantic Search', desc: 'Finds meaning, not just keywords, across thousands of pages.' },
              { title: 'Source Citations', desc: 'Every answer includes page numbers and direct quotes.' },
              { title: 'Multi-PDF Context', desc: 'Chat with multiple documents simultaneously for cross-analysis.' },
              { title: 'Private & Secure', desc: 'Your documents are encrypted and never used for training.' },
              { title: 'OCR Support', desc: 'Scanned documents and images are fully searchable.' },
              { title: 'Export Insights', desc: 'Save your chat history and generated summaries in one click.' },
            ].map((feat, i) => (
              <div key={i} className="p-8 rounded-2xl bg-slate-800/50 border border-slate-700 hover:border-blue-500 transition-colors">
                <h3 className="text-xl font-bold mb-3">{feat.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{feat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* CTA SECTION */}
      {/* <section className="py-32 text-center">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-5xl font-black text-slate-900 mb-8">Ready to unlock your data?</h2>
          <Link href="/upload" className="inline-flex bg-blue-600 text-white rounded-xl text-lg px-12 py-4 shadow-2xl shadow-blue-200 font-bold hover:scale-105 transition-transform">
            Start Free Today
          </Link>
          <p className="mt-6 text-slate-500 text-sm">No credit card required • Unlimited free trial</p>
        </div>
      </section> */}
    </main>
  );
}

function UploadIcon() {
  return (
    <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
    </svg>
  );
}