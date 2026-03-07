import type { Metadata } from "next";
import Navbar from '@/components/Navbar';
import './globals.css';
import ClientLayoutWrapper from '@/components/ClientLayoutWrapper';

export const metadata: Metadata = {
  title: "ChatWithPDF | AI-Powered PDF Assistant",
  description: "Upload your PDFs and get instant answers with AI. Built with Next.js, FastAPI, and Pinecone.",
  icons: {
    icon: "/favicon.ico", 
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-white text-slate-900 font-sans antialiased flex flex-col min-h-screen">
        <Navbar />
        {/* Humne conditional logic ko is wrapper mein move kar diya hai */}
        <ClientLayoutWrapper>
          {children}
        </ClientLayoutWrapper>
      </body>
    </html>
  );
}