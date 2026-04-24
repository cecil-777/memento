import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Plus, Layers, GitCommit, Settings } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { PWAInstallPrompt } from '@/components/PWAInstallPrompt';
export function MobileLayout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const navItems = [
    { path: '/', icon: Home, label: 'Home' },
    { path: '/distill', icon: GitCommit, label: 'Distill' },
    { path: '/capture', icon: Plus, label: 'Capture', primary: true },
    { path: '/tree', icon: Layers, label: 'Vault' },
    { path: '/settings', icon: Settings, label: 'Account' },
  ];
  return (
    <div className="min-h-screen bg-neutral-bg font-sans">
      <div className="mobile-container flex flex-col">
        <main className="flex-1 pb-32 overflow-y-auto scroll-smooth">
          {children}
        </main>
        <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-[360px] bg-white/90 backdrop-blur-md border border-neutral-border h-20 rounded-[2.5rem] flex items-center justify-around px-2 z-50 shadow-glass">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;
            if (item.primary) {
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className="flex items-center justify-center w-14 h-14 rounded-full bg-premium-gradient text-white shadow-vibrant transition-transform active:scale-90"
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
                  "relative flex flex-col items-center justify-center w-12 h-12 transition-all duration-300",
                  isActive ? "text-primary-dark" : "text-text-caption"
                )}
              >
                {isActive && (
                  <motion.div
                    layoutId="nav-glow"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 500, damping: 25 }}
                    className="absolute -top-2 w-1 h-1 rounded-full bg-primary-dark shadow-[0_0_8px_rgba(167,139,250,0.8)]"
                  />
                )}
                <Icon size={22} strokeWidth={isActive ? 2.5 : 1.5} />
                <span className={cn(
                  "text-[9px] font-styrene font-bold uppercase tracking-tighter mt-1",
                  isActive ? "text-primary-dark" : "text-text-caption"
                )}>
                  {item.label}
                </span>
              </Link>
            );
          })}
        </nav>
        <PWAInstallPrompt />
      </div>
    </div>
  );
}