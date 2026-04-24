import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Plus, Layers, GitCommit, Settings } from 'lucide-react';
import { cn } from '@/lib/utils';
export function MobileLayout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const navItems = [
    { path: '/', icon: Home, label: 'Home' },
    { path: '/distill', icon: GitCommit, label: 'Distill' },
    { path: '/capture', icon: Plus, label: 'Capture', primary: true },
    { path: '/tree', icon: Layers, label: 'Tree' },
    { path: '/settings', icon: Settings, label: 'Settings' },
  ];
  return (
    <div className="min-h-screen bg-stone-100 font-sans">
      <div className="mobile-container flex flex-col">
        <main className="flex-1 pb-24 overflow-y-auto">
          {children}
        </main>
        <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-parchment/90 backdrop-blur-md border-t border-ink/5 h-20 flex items-center justify-around px-6 z-50">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;
            if (item.primary) {
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className="flex items-center justify-center -translate-y-6 w-14 h-14 rounded-full bg-ink text-parchment shadow-xl transition-transform active:scale-95"
                >
                  <Icon size={24} />
                </Link>
              );
            }
            return (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex flex-col items-center gap-1 transition-colors",
                  isActive ? "text-ink" : "text-muted"
                )}
              >
                <Icon size={20} strokeWidth={isActive ? 2.5 : 2} />
                <span className="text-[10px] font-styrene font-medium uppercase tracking-wider">
                  {item.label}
                </span>
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
}