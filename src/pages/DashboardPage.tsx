import React, { useMemo } from 'react';
import { useStore } from '@/lib/store';
import { Link } from 'react-router-dom';
import { addDays, differenceInDays, isAfter, parseISO } from 'date-fns';
import { Progress } from '@/components/ui/progress';
import { Hourglass, Sparkles } from 'lucide-react';
export function DashboardPage() {
  const entries = useStore(state => state.entries);
  const incubating = useMemo(() => entries.filter(e => e.status === 'incubating'), [entries]);
  const readyCount = useMemo(() => entries.filter(e => e.status === 'ready').length, [entries]);
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <header className="mb-12">
        <div className="flex items-center gap-3 mb-2">
          <Hourglass className="text-muted w-5 h-5" />
          <h1 className="text-4xl font-bold">Holding Pen</h1>
        </div>
        <p className="text-sm font-styrene text-muted uppercase tracking-widest">
          Silence is the space where meaning grows
        </p>
      </header>
      {readyCount > 0 ? (
        <Link to="/distill" className="block mb-16 group">
          <div className="p-8 bg-ink text-parchment rounded-3xl shadow-2xl relative overflow-hidden transition-transform active:scale-[0.98]">
            <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:rotate-12 transition-transform">
              <Sparkles size={120} />
            </div>
            <div className="relative z-10">
              <span className="font-styrene text-[10px] uppercase tracking-widest mb-4 block opacity-60">Maturation Complete</span>
              <h2 className="text-3xl font-copernicus mb-6 leading-tight">
                {readyCount} {readyCount === 1 ? 'item is' : 'items are'} ready for your review.
              </h2>
              <div className="inline-flex items-center gap-3 py-3 px-6 border border-parchment/30 rounded-full font-styrene text-xs uppercase tracking-widest hover:bg-parchment hover:text-ink transition-colors">
                Begin Distillation
              </div>
            </div>
          </div>
        </Link>
      ) : (
        <div className="mb-16 p-8 border border-ink/5 bg-white/30 rounded-3xl text-center">
          <p className="text-muted font-tiempos italic">Nothing is ready yet. Go live your life; the ink will dry on its own.</p>
        </div>
      )}
      <div className="space-y-12">
        <div className="flex justify-between items-end border-b border-ink/5 pb-2">
          <h3 className="font-styrene text-[10px] uppercase tracking-widest text-muted">
            The Incubation Cycle
          </h3>
          <span className="font-styrene text-[10px] uppercase tracking-widest text-muted font-bold">
            {incubating.length} IN FLIGHT
          </span>
        </div>
        {incubating.length === 0 ? (
          <div className="py-12 text-center">
            <p className="text-muted/40 font-tiempos italic text-sm">Capture something new to begin the cycle.</p>
          </div>
        ) : (
          <div className="space-y-10">
            {incubating.map((entry) => {
              const addedDate = parseISO(entry.dateAdded);
              const unlockDate = addDays(addedDate, 14);
              const daysPassed = differenceInDays(new Date(), addedDate);
              const daysRemaining = Math.max(0, differenceInDays(unlockDate, new Date()));
              const progress = Math.min(100, (daysPassed / 14) * 100);
              return (
                <div key={entry.id} className="group">
                  <div className="flex justify-between items-baseline mb-3">
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-ink/20" />
                      <span className="text-[10px] font-styrene uppercase tracking-widest text-ink/60">
                        {entry.topic || 'General'}
                      </span>
                    </div>
                    <span className="text-[10px] font-styrene uppercase tracking-widest text-muted">
                      {daysRemaining} DAYS TO UNLOCK
                    </span>
                  </div>
                  <h4 className="text-lg font-copernicus leading-snug mb-4 opacity-80 group-hover:opacity-100 transition-opacity line-clamp-2">
                    {entry.notes}
                  </h4>
                  <div className="space-y-1">
                    <Progress value={progress} className="h-1 bg-ink/5" />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}