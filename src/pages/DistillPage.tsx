import React, { useState, useCallback, useEffect } from 'react';
import { useStore } from '@/lib/store';
import { useSwipeable } from 'react-swipeable';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, X, ArrowLeft, Trash2, Edit3, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
export function DistillPage() {
  const navigate = useNavigate();
  const entries = useStore(s => s.entries);
  const updateEntryStatus = useStore(s => s.updateEntryStatus);
  const addVersion = useStore(s => s.addVersion);
  const readyEntries = entries.filter(e => e.status === 'ready');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isRefining, setIsRefining] = useState(false);
  const [refinedNotes, setRefinedNotes] = useState('');
  const [exitDirection, setExitDirection] = useState<number>(0);
  const current = readyEntries[currentIndex];
  useEffect(() => {
    setExitDirection(0);
    setRefinedNotes('');
    setIsRefining(false);
  }, [current?.id]);
  const handleArchive = useCallback(() => {
    if (!current) return;
    setExitDirection(-1);
    setTimeout(() => {
      updateEntryStatus(current.id, 'archived');
    }, 300);
  }, [current, updateEntryStatus]);
  const startRefining = useCallback(() => {
    if (!current) return;
    setRefinedNotes(current.notes);
    setIsRefining(true);
  }, [current]);
  const handleKeep = useCallback(() => {
    if (!current) return;
    addVersion(current.id, refinedNotes || current.notes);
    setExitDirection(1);
    setTimeout(() => {
      updateEntryStatus(current.id, 'silver');
    }, 300);
    toast.success("Knowledge sealed in the vault.");
  }, [current, refinedNotes, addVersion, updateEntryStatus]);
  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => !isRefining && handleArchive(),
    onSwipedRight: () => !isRefining && startRefining(),
    preventScrollOnSwipe: true,
    trackMouse: true
  });
  const { ref: swipeRef, ...handlers } = swipeHandlers;
  if (!current) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-24 text-center space-y-6">
          <div className="w-20 h-20 bg-primary/5 rounded-full flex items-center justify-center mx-auto mb-4 border border-primary/10">
            <Check className="text-primary w-10 h-10" />
          </div>
          <h2 className="text-2xl font-copernicus font-bold">Collection Refined</h2>
          <p className="text-muted-foreground font-tiempos italic max-w-xs mx-auto">
            All items have been processed. Your knowledge garden is perfectly tended.
          </p>
          <Button onClick={() => navigate('/')} className="vibrant-btn shadow-vibrant">Return Home</Button>
        </div>
      </div>
    );
  }
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col overflow-hidden">
      <div className="py-8 md:py-10 lg:py-12 flex-1 flex flex-col">
        <header className="mb-8 flex justify-between items-center px-2">
          <div className="flex items-center gap-4">
            <button onClick={() => navigate('/')} className="p-2 rounded-full hover:bg-neutral-100 transition-colors">
              <ArrowLeft size={20} />
            </button>
            <div>
              <h1 className="text-2xl font-bold font-copernicus">Distillation</h1>
              <p className="text-[9px] font-styrene text-muted-foreground uppercase tracking-widest font-bold">Review Collection</p>
            </div>
          </div>
          <div className="bg-primary/5 border border-primary/10 text-primary px-3 py-1 rounded-full text-[10px] font-styrene font-bold">
            {readyEntries.length} LEFT
          </div>
        </header>
        <div className="flex-1 relative flex items-center justify-center py-4 px-2">
          <AnimatePresence mode="wait">
            {!isRefining ? (
              <motion.div
                key={`card-${current.id}`}
                {...handlers}
                ref={swipeRef}
                initial={{ x: 0, opacity: 1, scale: 0.9 }}
                animate={{
                  x: exitDirection * 500,
                  opacity: exitDirection !== 0 ? 0 : 1,
                  rotate: exitDirection * 15,
                  scale: 1
                }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="w-full h-full glass-panel rounded-[3rem] p-10 flex flex-col justify-center gap-8 cursor-grab active:cursor-grabbing border-primary/10 touch-none shadow-vibrant"
              >
                <div className="space-y-6">
                  <span className="inline-block px-3 py-1 bg-primary text-white rounded-full text-[9px] font-styrene font-bold uppercase tracking-widest">
                    {current.topic}
                  </span>
                  <p className="text-3xl font-tiempos leading-snug text-foreground/90 italic">
                    "{current.notes}"
                  </p>
                  {current.url && (
                    <a
                      href={current.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-primary font-styrene text-[10px] uppercase tracking-widest font-bold hover:underline"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <ExternalLink size={14} /> Open Original Source
                    </a>
                  )}
                </div>
                <div className="pt-8 flex justify-between items-center opacity-30 select-none">
                  <div className="flex items-center gap-2">
                    <X size={16} />
                    <span className="text-[9px] font-styrene uppercase tracking-tighter font-bold">Archive</span>
                  </div>
                  <div className="flex items-center gap-2 text-right">
                    <span className="text-[9px] font-styrene uppercase tracking-tighter font-bold">Keep</span>
                    <Check size={16} />
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key={`refine-${current.id}`}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 50 }}
                className="w-full h-full glass-panel rounded-[3rem] p-8 flex flex-col space-y-6 shadow-vibrant"
              >
                <div className="flex-1 bg-neutral-50/50 rounded-[2rem] p-6 border border-black/[0.08]">
                  <label className="text-[9px] font-styrene uppercase tracking-widest text-primary font-bold block mb-4">Refined Wisdom</label>
                  <Textarea
                    value={refinedNotes}
                    onChange={(e) => setRefinedNotes(e.target.value)}
                    className="w-full h-[80%] bg-transparent border-none focus-visible:ring-0 text-2xl font-tiempos p-0 resize-none leading-tight"
                    placeholder="How has this thought evolved?"
                    autoFocus
                  />
                </div>
                <div className="flex gap-4">
                  <Button
                    variant="outline"
                    onClick={() => setIsRefining(false)}
                    className="flex-1 rounded-full h-14 font-styrene text-[10px] uppercase tracking-widest font-bold border-black/[0.08]"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleKeep}
                    className="vibrant-btn flex-1 h-14"
                  >
                    Save Reflection
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        {!isRefining && (
          <div className="py-6 px-2 grid grid-cols-2 gap-4">
            <button
              onClick={handleArchive}
              className="flex flex-col items-center justify-center gap-2 p-6 rounded-[2rem] bg-neutral-100 hover:bg-neutral-200 transition-colors active:scale-95 border border-black/[0.08]"
            >
              <Trash2 size={24} className="text-muted-foreground/60" />
              <span className="text-[9px] font-styrene uppercase tracking-widest font-bold opacity-60 text-muted-foreground">Archive</span>
            </button>
            <button
              onClick={startRefining}
              className="flex flex-col items-center justify-center gap-2 p-6 rounded-[2rem] bg-vibrant-gradient text-white shadow-vibrant active:scale-95 transition-all"
            >
              <Edit3 size={24} />
              <span className="text-[9px] font-styrene uppercase tracking-widest font-bold">Keep & Refine</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}