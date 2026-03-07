'use client'; // Add this at the top

import Navbar from '../components/Navbar';
import './globals.css';
import { usePathname } from 'next/navigation';
import Footer from '../components/Footor';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  
  // Define routes where you DO NOT want the footer to appear
  const hideFooterRoutes = ['/chat'];
  const shouldHideFooter = hideFooterRoutes.includes(pathname);

  return (
    <html lang="en">
      <body className="bg-white text-slate-900 font-sans antialiased flex flex-col min-h-screen">
        <Navbar />
        
        {/* main takes up remaining space to push footer down */}
        <main className="flex-grow">
          {children}
        </main>

        {/* Conditional Rendering */}
        {!shouldHideFooter && <Footer />}
      </body>
    </html>
  );
}