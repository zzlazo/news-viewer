'use client';

import { useAuthStore } from '@/store/use-auth-store';
import { usePathname } from 'next/navigation';
import { ReactNode, useEffect } from 'react';
import { Spinner } from '@heroui/react';

interface AuthInitializerProps {
  children: ReactNode;
}

export function AuthInitializer({ children }: AuthInitializerProps) {
  const { isLoading, initialize } = useAuthStore();
  const pathname = usePathname();

  useEffect(() => {
    const unsubscribe = initialize();
    return () => {
      if (typeof unsubscribe === 'function') unsubscribe();
    };
  }, [initialize]);

  const isPublicPage = pathname === '/sign-in' || pathname === '/sign-up';

  if (isLoading && !isPublicPage) {
    return (
      <div className="fixed inset-0 flex flex-col items-center justify-center gap-4 bg-background">
        <Spinner color="current" size="lg" />
      </div>
    );
  }

  return <>{children}</>;
}
