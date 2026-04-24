import React, { useState, useCallback, useEffect } from 'react';
import { useStore } from '@/lib/store';
import { useSwipeable } from 'react-swipeable';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, X, ArrowLeft, Trash2, Edit3, ExternalLink, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { useRef } from 'react';
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
  const readyLengthRef = useRef(0);
  useEffect(() => {
    readyLengthRef.current = readyEntries.length;
  }, [readyEntries.length]);
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
      setCurrentIndex(prev => Math.min(prev + 1, readyLengthRef.current - 1));
    }, 300);
  }, [current?.id, updateEntryStatus, readyLengthRef]);
  const startRefining = useCallback(() => {
    if (!current) return;
    setRefinedNotes(current.notes);
    setIsRefining(true);
  }, [current?.notes]);
  const handleKeep = useCallback(() => {
    if (!current) return;
    addVersion(current.id, refinedNotes || current.notes);
    setExitDirection(1);
    setTimeout(() => {
      updateEntryStatus(current.id, 'silver');
      setCurrentIndex(prev => Math.min(prev + 1, readyLengthRef.current - 1));
    }, 300);
    toast.success("Knowledge sealed in the vault.");
  }, [current?.id, refinedNotes, addVersion, updateEntryStatus, readyLengthRef]);
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
          <div className="w-20 h-20 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-success/20">
            <Check className="text-success w-10 h-10" />
          </div>
          <h2 className="text-2xl font-copernicus font-bold text-text-heading">Collection Refined</h2>
          <p className="text-text-body font-tiempos italic max-w-xs mx-auto">
            All items have been processed. Your knowledge garden is perfectly tended.
          </p>
          <Button onClick={() => navigate('/')} className="vibrant-btn">Return Home</Button>
        </div>
      </div>
    );
  }
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col overflow-hidden">
      <div className="py-8 md:py-10 lg:py-12 flex-1 flex flex-col">
        <header className="mb-8 flex justify-between items-center px-2">
          <div className="flex items-center gap-4">
            <button onClick={() => navigate('/')} className="p-2 rounded-full hover:bg-neutral-section transition-colors">
              <ArrowLeft size={20} className="text-text-heading" />
            </button>
            <div>
              <h1 className="text-2xl font-bold font-copernicus text-text-heading">Distillation</h1>
              <p className="text-[9px] font-styrene text-text-caption uppercase tracking-widest font-bold">Review Collection</p>
            </div>
          </div>
          <div className="bg-primary-light/50 border border-primary text-primary-dark px-3 py-1 rounded-full text-[10px] font-styrene font-bold">
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
                className="w-full h-full bg-neutral-card rounded-[3rem] p-10 flex flex-col justify-center gap-8 cursor-grab active:cursor-grabbing border border-neutral-border touch-none shadow-vibrant relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-10 opacity-[0.03] text-primary pointer-events-none">
                  <Sparkles size={200} />
                </div>
                <div className="space-y-6 relative z-10">
                  <span className="inline-block px-3 py-1 bg-primary-dark text-white rounded-full text-[9px] font-styrene font-bold uppercase tracking-widest">
                    {current.topic}
                  </span>
                  <p className="text-3xl font-tiempos leading-snug text-text-heading italic">
                    "{current.notes}"
                  </p>
                  {current.url && (
                    <a
                      href={current.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-primary-dark font-styrene text-[10px] uppercase tracking-widest font-bold hover:underline"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <ExternalLink size={14} /> Open Original Source
                    </a>
                  )}
                </div>
                <div className="pt-8 flex justify-between items-center opacity-30 select-none">
                  <div className="flex items-center gap-2 text-text-caption">
                    <X size={16} />
                    <span className="text-[9px] font-styrene uppercase tracking-tighter font-bold">Archive</span>
                  </div>
                  <div className="flex items-center gap-2 text-right text-primary-dark">
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
                className="w-full h-full bg-neutral-card rounded-[3rem] p-8 flex flex-col space-y-6 shadow-vibrant border border-neutral-border"
              >
                <div className="flex-1 bg-neutral-bg rounded-[2rem] p-6 border border-neutral-border">
                  <label className="text-[9px] font-styrene uppercase tracking-widest text-primary-dark font-bold block mb-4">Refined Wisdom</label>
                  <Textarea
                    value={refinedNotes}
                    onChange={(e) => setRefinedNotes(e.target.value)}
                    className="w-full h-[80%] bg-transparent border-none focus-visible:ring-0 text-2xl font-tiempos p-0 resize-none leading-tight text-text-body"
                    placeholder="How has this thought evolved?"
                    autoFocus
                  />
                </div>
                <div className="flex gap-4">
                  <Button
                    variant="outline"
                    onClick={() => setIsRefining(false)}
                    className="flex-1 rounded-full h-14 font-styrene text-[10px] uppercase tracking-widest font-bold border-neutral-border"
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
              className="flex flex-col items-center justify-center gap-2 p-6 rounded-[2rem] bg-neutral-section hover:bg-neutral-border/50 transition-colors active:scale-95 border border-neutral-border"
            >
              <Trash2 size={24} className="text-text-caption" />
              <span className="text-[9px] font-styrene uppercase tracking-widest font-bold text-text-caption">Archive</span>
            </button>
            <button
              onClick={startRefining}
              className="flex flex-col items-center justify-center gap-2 p-6 rounded-[2rem] bg-premium-gradient text-white shadow-vibrant active:scale-95 transition-all"
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