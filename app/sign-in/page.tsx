'use client';

import { useAuthStore } from '@/store/use-auth-store';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const LoadingSpinner = () => (
  <svg
    className="animate-spin h-5 w-5 text-white"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
  >
    <circle
      className="opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="4"
    ></circle>
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
    ></path>
  </svg>
);

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signIn, signInAnonymously, isLoading } = useAuthStore();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signIn(email, password);
      router.push('/');
    } catch (error) {
      console.error(error);
    }
  };

  const handleGuestLogin = async () => {
    try {
      await signInAnonymously();
      router.push('/');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-900 px-4">
      <div className="w-full max-w-md p-8 space-y-6 bg-gray-800 rounded-xl shadow-2xl border border-gray-700">
        <h2 className="text-3xl font-extrabold text-center text-white">
          ログイン
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block mb-1.5 text-sm font-medium text-gray-300">
              メールアドレス
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example@mail.com"
              className="w-full px-4 py-2.5 bg-gray-700 border border-gray-600 text-white placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:outline-none transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              required
              disabled={isLoading}
            />
          </div>

          <div>
            <label className="block mb-1.5 text-sm font-medium text-gray-300">
              パスワード
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-2.5 bg-gray-700 border border-gray-600 text-white placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:outline-none transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              required
              disabled={isLoading}
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="flex items-center justify-center w-full py-2.5 font-bold text-white bg-blue-600 rounded-lg hover:bg-blue-500 active:scale-[0.98] transition-all shadow-lg shadow-blue-900/20 disabled:bg-blue-800 disabled:cursor-not-allowed disabled:active:scale-100"
          >
            {isLoading ? <LoadingSpinner /> : 'ログイン'}
          </button>
        </form>

        <div className="relative flex items-center py-2">
          <div className="flex-grow border-t border-gray-700"></div>
          <span className="flex-shrink mx-4 text-gray-500 text-xs uppercase tracking-widest">
            または
          </span>
          <div className="flex-grow border-t border-gray-700"></div>
        </div>

        <button
          onClick={handleGuestLogin}
          disabled={isLoading}
          className="flex items-center justify-center w-full py-2.5 font-bold border-2 border-emerald-500 text-emerald-500 rounded-lg hover:bg-emerald-500 hover:text-white active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100"
        >
          {isLoading ? <LoadingSpinner /> : 'ゲストログイン'}
        </button>
      </div>
    </div>
  );
}
