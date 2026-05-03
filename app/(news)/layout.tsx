'use client';
import { usePathname, useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/use-auth-store';
import Link from 'next/link';

export default function ShellLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { signOut } = useAuthStore();
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut();
    router.push('/sign-in');
  };

  const tabs = [
    { name: 'ホーム', href: '/' },
    { name: 'お気に入り', href: '/favorites' },
  ];

  return (
    <div className="flex flex-col h-screen bg-gray-950 text-gray-100 overflow-hidden">
      <header className="flex-none h-14 bg-gray-900 border-b border-gray-800 flex items-center justify-between px-4 z-10">
        <h1 className="font-bold text-lg">ニュースビューアー</h1>
        <button
          onClick={() => handleSignOut()}
          className="text-sm font-medium text-gray-400 hover:text-red-400 hover:bg-gray-800 px-3 py-1.5 rounded-md transition-colors"
        >
          ログアウト
        </button>
      </header>

      <main className="flex-1 overflow-y-auto bg-gray-950">{children}</main>

      <nav className="flex-none h-20 bg-gray-900 border-t border-gray-800 flex justify-around items-center z-10">
        {tabs.map((tab) => {
          const isActive = pathname === tab.href;
          return (
            <Link
              key={tab.href}
              href={tab.href}
              className="flex flex-col items-center justify-center w-full h-full transition-colors"
            >
              <span
                className={`text-sm transition-colors ${
                  isActive
                    ? 'text-blue-400 font-bold'
                    : 'text-gray-400 hover:text-gray-200'
                }`}
              >
                {tab.name}
              </span>
              {isActive && (
                <div className="w-1 h-1 bg-blue-400 rounded-full mt-1"></div>
              )}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
