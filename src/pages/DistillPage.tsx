import React, { useState } from 'react';
import { useStore } from '@/lib/store';
import { useSwipeable } from 'react-swipeable';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Check, X, ArrowRight, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
export function DistillPage() {
  const entries = useStore(state => state.entries);
  const updateEntryStatus = useStore(state => state.updateEntryStatus);
  const addVersion = useStore(state => state.addVersion);
  const readyEntries = entries.filter(e => e.status === 'ready');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isRefining, setIsRefining] = useState(false);
  const [refinedNotes, setRefinedNotes] = useState('');
  const [exitDirection, setExitDirection] = useState<number>(0);
  const current = readyEntries[currentIndex];
  const handleArchive = () => {
    setExitDirection(-1);
    setTimeout(() => {
      updateEntryStatus(current.id, 'archived');
      setExitDirection(0);
      setIsRefining(false);
    }, 300);
  };
  const startRefining = () => {
    setRefinedNotes(current.notes);
    setIsRefining(true);
  };
  const handleKeep = () => {
    addVersion(current.id, refinedNotes || current.notes);
    setExitDirection(1);
    setTimeout(() => {
      updateEntryStatus(current.id, 'silver');
      setExitDirection(0);
      setIsRefining(false);
    }, 300);
    toast.success("Added to Silver List");
  };
  const handlers = useSwipeable({
    onSwipedLeft: () => !isRefining && handleArchive(),
    onSwipedRight: () => !isRefining && startRefining(),
    preventScrollOnSwipe: true,
    trackMouse: true
  });
  if (!current) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
        <h2 className="text-3xl font-copernicus font-bold mb-4">The Well is Dry</h2>
        <p className="text-muted font-tiempos italic max-w-xs mx-auto">
          Your thoughts are still maturing in the holding pen. Patience is the gardener of wisdom.
        </p>
      </div>
    );
  }
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 h-full flex flex-col overflow-hidden">
      <header className="mb-8 flex justify-between items-end">
        <div>
          <span className="text-[10px] font-styrene uppercase tracking-widest text-muted block mb-1">Matured Content</span>
          <h1 className="text-3xl font-bold">Distillation</h1>
        </div>
        <span className="text-[10px] font-styrene uppercase tracking-widest text-muted font-bold">
          {readyEntries.length - currentIndex} REMAINING
        </span>
      </header>
      <div className="flex-1 relative flex items-center justify-center">
        <AnimatePresence mode="wait">
          {!isRefining ? (
            <motion.div
              {...handlers}
              key={current.id}
              initial={{ x: 0, opacity: 1, scale: 1 }}
              animate={{ 
                x: exitDirection * 500, 
                opacity: exitDirection !== 0 ? 0 : 1,
                rotate: exitDirection * 20 
              }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="w-full bg-white border border-ink/5 p-8 rounded-3xl shadow-xl parchment-texture cursor-grab active:cursor-grabbing"
            >
              <div className="space-y-6">
                <span className="inline-block px-3 py-1 bg-ink/5 rounded-full text-[10px] font-styrene uppercase tracking-widest text-muted">
                  {current.topic}
                </span>
                <p className="text-2xl font-tiempos leading-relaxed text-ink/90 italic">
                  "{current.notes}"
                </p>
                {current.url && (
                  <a
                    href={current.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-muted hover:text-ink transition-colors font-styrene text-[10px] uppercase tracking-widest"
                  >
                    <ExternalLink size={12} />
                    View Source
                  </a>
                )}
                <div className="pt-12 flex justify-between items-center opacity-40">
                  <div className="flex items-center gap-2">
                    <X size={16} />
                    <span className="text-[10px] font-styrene uppercase tracking-tighter">Swipe Left to Discard</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-styrene uppercase tracking-tighter">Swipe Right to Keep</span>
                    <ArrowRight size={16} />
                  </div>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="w-full h-full flex flex-col space-y-6"
            >
              <div className="flex-1 bg-white border border-ink/5 p-6 rounded-3xl shadow-inner parchment-texture">
                <label className="text-[10px] font-styrene uppercase tracking-widest text-muted block mb-4">Refine Interpretation</label>
                <Textarea
                  value={refinedNotes}
                  onChange={(e) => setRefinedNotes(e.target.value)}
                  className="w-full h-[70%] bg-transparent border-none focus-visible:ring-0 text-xl font-tiempos p-0 resize-none leading-relaxed"
                  placeholder="The core of this idea is..."
                  autoFocus
                />
              </div>
              <div className="flex gap-4">
                <Button 
                  variant="outline" 
                  onClick={() => setIsRefining(false)}
                  className="flex-1 rounded-xl h-14 font-styrene text-xs uppercase tracking-widest border-ink/10"
                >
                  Back
                </Button>
                <Button 
                  onClick={handleKeep}
                  className="flex-1 rounded-xl h-14 bg-ink text-parchment font-styrene text-xs uppercase tracking-widest shadow-lg"
                >
                  Seal in Silver
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      {!isRefining && (
        <div className="py-8 grid grid-cols-2 gap-4">
          <button
            onClick={handleArchive}
            className="flex flex-col items-center gap-2 p-4 rounded-2xl bg-ink/5 hover:bg-ink/10 transition-colors"
          >
            <Trash2 size={20} className="text-muted" />
            <span className="text-[9px] font-styrene uppercase tracking-widest font-bold opacity-60">Archive</span>
          </button>
          <button
            onClick={startRefining}
            className="flex flex-col items-center gap-2 p-4 rounded-2xl bg-ink text-parchment shadow-lg active:scale-95 transition-all"
          >
            <Check size={20} />
            <span className="text-[9px] font-styrene uppercase tracking-widest font-bold">Keep</span>
          </button>
        </div>
      )}
    </div>
  );
}