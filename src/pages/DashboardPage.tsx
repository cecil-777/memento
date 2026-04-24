import React, { useMemo, useEffect } from 'react';
import { useStore } from '@/lib/store';
import shallow from 'zustand/react/shallow';
import { Link } from 'react-router-dom';
import { addDays, differenceInDays, parseISO } from 'date-fns';
import { Progress } from '@/components/ui/progress';
import { Sparkles, ShoppingBag, Clock, ArrowRight, Edit3 } from 'lucide-react';
import { EntryEditDrawer } from '@/components/EntryEditDrawer';
export function DashboardPage() {
  const entries = useStore(s => s.entries, shallow);
  const checkReadyStates = useStore(s => s.checkReadyStates);
  useEffect(() => {
    checkReadyStates();
    const handleFocus = () => checkReadyStates();
    window.addEventListener('focus', handleFocus);
    return () => {
      window.removeEventListener('focus', handleFocus);
    };
  }, [checkReadyStates]);
  const incubating = useMemo(() =>
    entries.filter(e => e.status === 'incubating'),
    [entries]
  );
  const readyItemsCount = useMemo(() =>
    entries.filter(e => e.status === 'ready').length,
    [entries]
  );
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="py-8 md:py-10 lg:py-12 space-y-12">
        <header className="flex justify-between items-center px-2">
          <div>
            <h1 className="text-3xl font-bold font-copernicus text-text-heading">Memento</h1>
            <p className="text-[10px] font-styrene text-text-caption uppercase tracking-widest font-bold">Your Intellectual Wardrobe</p>
          </div>
          <div className="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center border border-neutral-border">
            <ShoppingBag size={20} className="text-primary-dark" />
          </div>
        </header>
        {readyItemsCount > 0 ? (
          <Link to="/distill" className="block group px-2">
            <div className="p-10 bg-premium-gradient rounded-[3rem] shadow-vibrant relative overflow-hidden transition-all active:scale-[0.97]">
              <div className="absolute top-[-20%] right-[-10%] opacity-20 group-hover:rotate-12 transition-transform duration-1000 pointer-events-none text-white">
                <Sparkles size={280} />
              </div>
              <div className="relative z-10 space-y-6">
                <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-1.5 rounded-full text-[9px] font-styrene font-bold text-white uppercase tracking-widest">
                  <Clock size={12} /> Ready for Review
                </div>
                <h2 className="text-3xl font-copernicus text-white leading-tight">
                  {readyItemsCount} Fresh Insights <br /> Ready to be Sealed.
                </h2>
                <div className="flex items-center gap-2 text-white/90 font-styrene text-[10px] uppercase tracking-widest font-bold pt-2 group-hover:translate-x-2 transition-transform">
                  Claim your wisdom <ArrowRight size={14} />
                </div>
              </div>
            </div>
          </Link>
        ) : (
          <div className="mx-2 p-12 glass-panel rounded-[3rem] text-center border-dashed border-2 border-primary/20">
            <p className="text-text-body font-tiempos italic text-lg">
              Your collection is currently maturing.<br />
              <span className="text-sm opacity-60">Check back soon for fresh arrivals.</span>
            </p>
          </div>
        )}
        <section className="space-y-8 px-2">
          <div className="flex justify-between items-end border-b border-neutral-border pb-4">
            <h3 className="font-copernicus text-xl font-bold text-text-heading">Holding Pen</h3>
            <span className="font-styrene text-[10px] uppercase tracking-widest text-primary-dark font-bold">
              {incubating.length} Items Aging
            </span>
          </div>
          {incubating.length === 0 ? (
            <div className="py-24 text-center text-text-caption font-tiempos italic text-lg">
              Your intellectual catalog is empty.<br />
              Add a new thought to start.
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-8">
              {incubating.map((entry) => {
                const addedDate = entry.dateAdded ? parseISO(entry.dateAdded) : new Date(0);
                const unlockDate = addDays(addedDate, 14);
                const daysPassed = differenceInDays(new Date(), addedDate);
                const daysRemaining = Math.max(0, differenceInDays(unlockDate, new Date()));
                const progress = Math.min(100, (daysPassed / 14) * 100);
                return (
                  <div key={entry.id} className="product-card p-8 flex flex-col gap-6 relative">
                    <div className="flex justify-between items-start">
                      <span className="px-4 py-1.5 bg-primary-light/30 rounded-full text-[9px] font-styrene font-bold text-primary-dark uppercase tracking-widest border border-primary-light">
                        {entry.topic || 'General'}
                      </span>
                      <div className="flex items-center gap-3">
                        <EntryEditDrawer entry={entry}>
                          <button
                            className="w-10 h-10 rounded-full bg-neutral-bg flex items-center justify-center text-text-caption hover:text-primary-dark transition-all active:scale-90 border border-neutral-border"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <Edit3 size={16} />
                          </button>
                        </EntryEditDrawer>
                        <div className="text-right">
                          <span className="text-[10px] font-styrene text-text-caption font-bold uppercase tracking-tighter block">
                            Unlock in
                          </span>
                          <span className="text-xl font-copernicus font-bold text-text-heading">
                            {daysRemaining}D
                          </span>
                        </div>
                      </div>
                    </div>
                    <h4 className="text-xl font-tiempos leading-relaxed text-text-body line-clamp-3">
                      {entry.notes}
                    </h4>
                    <div className="space-y-3 mt-auto pt-4">
                      <div className="flex justify-between text-[8px] font-styrene uppercase tracking-widest text-text-caption font-bold">
                        <span>Fermentation Progress</span>
                        <span>{Math.round(progress)}% Complete</span>
                      </div>
                      <Progress value={progress} className="h-2 bg-neutral-section" />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}