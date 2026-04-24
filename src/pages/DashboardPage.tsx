import React, { useMemo } from 'react';
import { useStore } from '@/lib/store';
import { Link } from 'react-router-dom';
import { addDays, differenceInDays, parseISO } from 'date-fns';
import { Progress } from '@/components/ui/progress';
import { Sparkles, ShoppingBag, Clock, ArrowRight } from 'lucide-react';
export function DashboardPage() {
  const entries = useStore(state => state.entries);
  const incubating = useMemo(() => entries.filter(e => e.status === 'incubating'), [entries]);
  const readyItems = useMemo(() => entries.filter(e => e.status === 'ready'), [entries]);
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      <header className="flex justify-between items-center pt-4">
        <div>
          <h1 className="text-3xl font-bold font-copernicus">Memento</h1>
          <p className="text-[10px] font-styrene text-muted-foreground uppercase tracking-widest font-bold">Your Intellectual Wardrobe</p>
        </div>
        <div className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center border border-black/5">
          <ShoppingBag size={18} className="text-primary" />
        </div>
      </header>
      {readyItems.length > 0 ? (
        <Link to="/distill" className="block group">
          <div className="p-8 bg-vibrant-gradient rounded-[2.5rem] shadow-vibrant relative overflow-hidden transition-transform active:scale-[0.98]">
            <div className="absolute top-[-20%] right-[-10%] opacity-20 group-hover:rotate-12 transition-transform duration-700">
              <Sparkles size={240} />
            </div>
            <div className="relative z-10 space-y-4">
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-[9px] font-styrene font-bold text-white uppercase tracking-widest">
                <Clock size={12} /> Ready for Review
              </div>
              <h2 className="text-3xl font-copernicus text-white leading-tight">
                {readyItems.length} New Insights <br /> Await Distillation.
              </h2>
              <div className="flex items-center gap-2 text-white/90 font-styrene text-[10px] uppercase tracking-widest font-bold pt-2 group-hover:translate-x-1 transition-transform">
                Claim your wisdom <ArrowRight size={14} />
              </div>
            </div>
          </div>
        </Link>
      ) : (
        <div className="p-8 glass-panel rounded-[2.5rem] text-center border-dashed">
          <p className="text-muted-foreground font-tiempos italic">The collection is maturing. Check back soon for fresh arrivals.</p>
        </div>
      )}
      <section className="space-y-6">
        <div className="flex justify-between items-end">
          <h3 className="font-copernicus text-xl font-bold">Holding Pen</h3>
          <span className="font-styrene text-[10px] uppercase tracking-widest text-primary font-bold">
            {incubating.length} Incubating
          </span>
        </div>
        {incubating.length === 0 ? (
          <div className="py-20 text-center text-muted-foreground/30 font-tiempos italic">
            Your catalog is empty. Add a new thought to start.
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {incubating.map((entry) => {
              const addedDate = parseISO(entry.dateAdded);
              const unlockDate = addDays(addedDate, 14);
              const daysPassed = differenceInDays(new Date(), addedDate);
              const daysRemaining = Math.max(0, differenceInDays(unlockDate, new Date()));
              const progress = Math.min(100, (daysPassed / 14) * 100);
              return (
                <div key={entry.id} className="product-card p-6 flex flex-col gap-4">
                  <div className="flex justify-between items-start">
                    <span className="px-3 py-1 bg-primary/10 rounded-full text-[9px] font-styrene font-bold text-primary uppercase tracking-widest">
                      {entry.topic || 'General'}
                    </span>
                    <span className="text-[10px] font-styrene text-muted-foreground font-medium">
                      {daysRemaining}D Left
                    </span>
                  </div>
                  <h4 className="text-lg font-tiempos leading-relaxed line-clamp-2 text-foreground/90">
                    {entry.notes}
                  </h4>
                  <div className="space-y-2 mt-auto pt-2">
                    <div className="flex justify-between text-[8px] font-styrene uppercase tracking-widest text-muted-foreground/60 font-bold">
                      <span>Aging Process</span>
                      <span>{Math.round(progress)}%</span>
                    </div>
                    <Progress value={progress} className="h-1.5 bg-neutral-100" />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}