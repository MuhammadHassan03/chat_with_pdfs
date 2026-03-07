'use client';

import { usePathname } from 'next/navigation';
import Footer from '@/components/Footor';

export default function ClientLayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const hideFooterRoutes = ['/chat'];
  const shouldHideFooter = hideFooterRoutes.includes(pathname);

  return (
    <>
      <main className="flex-grow">
        {children}
      </main>
      {!shouldHideFooter && <Footer />}
    </>
  );
}