import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles } from 'lucide-react';
export function HomePage() {
  const navigate = useNavigate();
  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/', { replace: true });
    }, 1200); // Slightly longer for a deliberate splash feel
    return () => clearTimeout(timer);
  }, [navigate]);
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-neutral-bg text-text-heading p-4 overflow-hidden relative">
      <div className="text-center space-y-6 relative z-10 animate-in fade-in zoom-in duration-700">
        <div className="flex justify-center">
          <div className="w-16 h-16 rounded-2xl bg-premium-gradient flex items-center justify-center shadow-vibrant">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
        </div>
        <div className="space-y-2">
          <h1 className="text-3xl font-copernicus font-bold">Memento</h1>
          <p className="text-[10px] font-styrene text-text-caption uppercase tracking-widest font-bold">
            Unlocking your Vault...
          </p>
        </div>
      </div>
    </div>
  );
}