import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles } from 'lucide-react';
export function HomePage() {
  const navigate = useNavigate();
  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/', { replace: true });
    }, 100);
    return () => clearTimeout(timer);
  }, [navigate]);
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground p-4 overflow-hidden relative">
      <div className="text-center space-y-6 relative z-10 animate-pulse">
        <div className="flex justify-center">
          <div className="w-16 h-16 rounded-2xl bg-vibrant-gradient flex items-center justify-center shadow-vibrant">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
        </div>
        <div className="space-y-2">
          <h1 className="text-2xl font-copernicus font-bold">Memento</h1>
          <p className="text-sm font-styrene text-muted-foreground uppercase tracking-widest">
            Opening your Vault...
          </p>
        </div>
      </div>
    </div>
  );
}