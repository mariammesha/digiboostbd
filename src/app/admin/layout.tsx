import type { Metadata } from 'next';
import Link from 'next/link';
import SignOutButton from '@/app/(auth)/dashboard/SignOutButton';
import Logo from '@/components/Logo';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'DigiBoost BD — Admin Panel',
  description: 'Internal admin panel for DigiBoost BD.',
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`${inter.className} min-h-screen flex bg-slate-900 text-slate-50`}>
      {/* Sidebar */}
      <aside className="w-64 bg-slate-950 border-r border-slate-800 flex flex-col hidden md:flex">
        <div className="h-16 flex items-center px-6 border-b border-slate-800">
          <Link href="/admin" className="font-bold text-lg text-white flex items-center gap-2.5">
            <Logo variant="icon" size="sm" href={null} /> Admin Panel
          </Link>
        </div>
        
        <nav className="flex-1 py-6 px-4 flex flex-col gap-2">
          <Link href="/admin" className="px-4 py-2 rounded hover:bg-slate-800 transition-colors">
            Overview
          </Link>
          <Link href="/admin/clients" className="px-4 py-2 rounded hover:bg-slate-800 transition-colors">
            Clients
          </Link>
          <Link href="/admin/settings" className="px-4 py-2 rounded hover:bg-slate-800 transition-colors">
            Settings
          </Link>
        </nav>
        
        <div className="p-4 border-t border-slate-800">
          <Link href="/" className="text-sm text-slate-400 hover:text-white transition-colors block mb-4">
            ← Back to Site
          </Link>
          <SignOutButton />
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile Header */}
        <header className="h-16 bg-slate-950 border-b border-slate-800 flex items-center justify-between px-4 md:hidden">
          <Link href="/admin" className="font-bold text-white flex items-center gap-2">
            <Logo variant="icon" size="sm" href={null} /> Admin Panel
          </Link>
          <div className="flex gap-4 items-center">
            <Link href="/admin/clients" className="text-sm text-slate-300">Clients</Link>
            <Link href="/admin/settings" className="text-sm text-slate-300">Settings</Link>
            <SignOutButton />
          </div>
        </header>

        <main className="flex-1 p-6 md:p-10 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
