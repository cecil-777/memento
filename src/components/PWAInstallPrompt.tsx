import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, X, Share, PlusSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
export function PWAInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  useEffect(() => {
    // Check if app is already installed
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches 
      || (window.navigator as any).standalone 
      || document.referrer.includes('android-app://');
    if (isStandalone) return;
    // Detect iOS
    const ios = /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream;
    setIsIOS(ios);
    const handleBeforeInstallPrompt = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
      // Wait 3 seconds before showing the prompt to be less intrusive
      setTimeout(() => setShowPrompt(true), 3000);
    };
    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    // For iOS, just show based on detection
    if (ios) {
      setTimeout(() => setShowPrompt(true), 5000);
    }
    return () => window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
  }, []);
  const handleInstallClick = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      setShowPrompt(false);
    }
    setDeferredPrompt(null);
  };
  const closePrompt = () => {
    setShowPrompt(false);
    // Remember rejection for 24 hours
    localStorage.setItem('pwa-prompt-dismissed', Date.now().toString());
  };
  // Check if dismissed recently
  useEffect(() => {
    const dismissedAt = localStorage.getItem('pwa-prompt-dismissed');
    if (dismissedAt) {
      const dayInMs = 24 * 60 * 60 * 1000;
      if (Date.now() - parseInt(dismissedAt) < dayInMs) {
        setShowPrompt(false);
      }
    }
  }, []);
  return (
    <AnimatePresence>
      {showPrompt && (
        <motion.div
          initial={{ y: 100, opacity: 0, x: '-50%' }}
          animate={{ y: 0, opacity: 1, x: '-50%' }}
          exit={{ y: 100, opacity: 0, x: '-50%' }}
          className="fixed bottom-28 left-1/2 w-[90%] max-w-[340px] z-[60] glass-panel rounded-[2rem] p-6 shadow-vibrant border-primary/20"
        >
          <button 
            onClick={closePrompt}
            className="absolute top-4 right-4 text-text-caption hover:text-text-heading"
          >
            <X size={16} />
          </button>
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-premium-gradient flex items-center justify-center shrink-0 shadow-md">
              <Download className="text-white" size={20} />
            </div>
            <div className="space-y-1 pr-4">
              <h4 className="font-copernicus text-sm font-bold text-text-heading">Install Memento</h4>
              <p className="text-[10px] font-tiempos text-text-body leading-relaxed">
                Add to your home screen for the full Slow-Tech experience and offline access.
              </p>
            </div>
          </div>
          <div className="mt-4">
            {isIOS ? (
              <div className="bg-neutral-bg/50 rounded-xl p-3 border border-neutral-border flex flex-col gap-2">
                <div className="flex items-center gap-2 text-[10px] font-styrene font-bold uppercase tracking-widest text-primary-dark">
                  <Share size={12} /> 1. Tap the Share button
                </div>
                <div className="flex items-center gap-2 text-[10px] font-styrene font-bold uppercase tracking-widest text-primary-dark">
                  <PlusSquare size={12} /> 2. Select 'Add to Home Screen'
                </div>
              </div>
            ) : (
              <Button 
                onClick={handleInstallClick}
                className="w-full vibrant-btn h-10 text-[10px]"
              >
                Add to Home Screen
              </Button>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}