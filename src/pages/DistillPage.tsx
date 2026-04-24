import React from 'react';
import { useStore } from '@/lib/store';
import { ExternalLink, ArrowRight, Trash2 } from 'lucide-react';
export function DistillPage() {
  const entries = useStore(state => state.entries);
  const updateEntryStatus = useStore(state => state.updateEntryStatus);
  const readyEntries = entries.filter(e => e.status === 'ready');
  const current = readyEntries[0];
  if (!current) {
    return (
      <div className="px-6 py-24 text-center">
        <h2 className="text-3xl font-bold mb-4">All Clear</h2>
        <p className="text-muted font-tiempos italic">
          No memories are ready for distillation yet. 
          Check back tomorrow.
        </p>
      </div>
    );
  }
  return (
    <div className="h-full flex flex-col">
      <div className="p-6 border-b border-ink/5">
        <div className="flex justify-between items-center">
          <span className="text-[10px] font-styrene uppercase tracking-widest text-muted">Distillation</span>
          <span className="text-[10px] font-styrene uppercase tracking-widest text-muted">
            {readyEntries.length} items left
          </span>
        </div>
      </div>
      <div className="flex-1 p-8 flex flex-col justify-center">
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <span className="inline-block px-3 py-1 bg-ink/5 rounded-full text-[10px] font-styrene uppercase tracking-widest text-muted">
            {current.topic}
          </span>
          <p className="text-3xl font-tiempos leading-relaxed text-ink/90">
            "{current.notes}"
          </p>
          {current.url && (
            <a 
              href={current.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-muted hover:text-ink transition-colors font-styrene text-xs uppercase tracking-widest"
            >
              <ExternalLink size={14} />
              Read Original Article
            </a>
          )}
        </div>
      </div>
      <div className="p-8 grid grid-cols-2 gap-4 pb-28">
        <button 
          onClick={() => updateEntryStatus(current.id, 'archived')}
          className="flex flex-col items-center gap-3 p-6 rounded-2xl bg-ink/5 hover:bg-ink/10 transition-colors"
        >
          <Trash2 size={24} className="text-muted" />
          <span className="text-[10px] font-styrene uppercase tracking-widest font-bold">Discard</span>
        </button>
        <button 
          onClick={() => updateEntryStatus(current.id, 'silver')}
          className="flex flex-col items-center gap-3 p-6 rounded-2xl bg-ink text-parchment shadow-xl active:scale-95 transition-all"
        >
          <ArrowRight size={24} />
          <span className="text-[10px] font-styrene uppercase tracking-widest font-bold">Keep (Silver)</span>
        </button>
      </div>
    </div>
  );
}