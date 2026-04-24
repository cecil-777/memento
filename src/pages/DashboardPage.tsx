import React from 'react';
import { useStore } from '@/lib/store';
import { formatDistanceToNow, addDays, differenceInDays } from 'date-fns';
export function DashboardPage() {
  const entries = useStore(state => state.entries);
  const incubating = entries.filter(e => e.status === 'incubating');
  const readyCount = entries.filter(e => e.status === 'ready').length;
  return (
    <div className="px-6 py-12">
      <header className="mb-12">
        <h1 className="text-4xl font-bold mb-2">Holding Pen</h1>
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-ink/20 animate-pulse" />
          <p className="text-sm font-styrene text-muted uppercase tracking-widest">
            {readyCount} items ready for distillation
          </p>
        </div>
      </header>
      {readyCount > 0 && (
        <div className="mb-12 p-6 bg-ink text-parchment rounded-xl shadow-lg">
          <p className="font-styrene text-xs uppercase tracking-widest mb-2 opacity-60">Ready to Review</p>
          <h2 className="text-2xl font-copernicus mb-4">Your knowledge has aged.</h2>
          <button 
            onClick={() => window.location.href = '/distill'}
            className="w-full py-3 border border-parchment/20 rounded-lg font-styrene text-sm uppercase tracking-widest hover:bg-parchment hover:text-ink transition-colors"
          >
            Start Distillation
          </button>
        </div>
      )}
      <div className="space-y-10">
        <h3 className="font-styrene text-xs uppercase tracking-widest text-muted border-b border-ink/5 pb-2">
          Incubating
        </h3>
        {incubating.length === 0 ? (
          <p className="text-muted font-tiempos italic">No items currently incubating.</p>
        ) : (
          incubating.map((entry) => {
            const addedDate = new Date(entry.dateAdded);
            const unlockDate = addDays(addedDate, 14);
            const daysRemaining = differenceInDays(unlockDate, new Date());
            return (
              <div key={entry.id} className="group">
                <div className="flex justify-between items-baseline mb-2">
                  <span className="text-[10px] font-styrene uppercase tracking-widest text-muted">
                    {entry.topic}
                  </span>
                  <span className="text-[10px] font-styrene uppercase tracking-widest text-muted">
                    {daysRemaining}d left
                  </span>
                </div>
                <h4 className="text-xl font-copernicus leading-tight group-hover:opacity-70 transition-opacity">
                  {entry.notes.substring(0, 60)}...
                </h4>
                <div className="mt-2 h-[1px] w-full bg-ink/5" />
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}