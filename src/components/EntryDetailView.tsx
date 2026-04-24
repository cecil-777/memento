import React, { useState } from 'react';
import { useStore, Entry } from '@/lib/store';
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerTrigger,
  DrawerFooter,
  DrawerClose
} from '@/components/ui/drawer';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { format, parseISO } from 'date-fns';
import { History, X, Edit3, Sparkles } from 'lucide-react';
import { toast } from 'sonner';
interface EntryDetailViewProps {
  entry: Entry;
  children: React.ReactNode;
}
export function EntryDetailView({ entry, children }: EntryDetailViewProps) {
  const addVersion = useStore(s => s.addVersion);
  const [newReflection, setNewReflection] = useState('');
  const [isAdding, setIsAdding] = useState(false);
  const handleOpenChange = (open: boolean) => {
    if (!open) {
      setIsAdding(false);
      setNewReflection('');
    }
  };
  const handleAddVersion = () => {
    if (!newReflection.trim()) return;
    addVersion(entry.id, newReflection);
    setNewReflection('');
    setIsAdding(false);
    toast.success("Reflection added to product history.");
  };
  const latestReflection = entry.versions.length > 0
    ? entry.versions[entry.versions.length - 1]
    : null;
  const hasHistory = entry.versions.length > 0;
  return (
    <Drawer onOpenChange={handleOpenChange}>
      <DrawerTrigger asChild>
        {children}
      </DrawerTrigger>
      <DrawerContent className="max-h-[92vh] bg-neutral-bg rounded-t-[3rem] border-none shadow-2xl">
        <div className="max-w-md mx-auto w-full h-full flex flex-col overflow-hidden px-4">
          <DrawerHeader className="border-b border-neutral-border pb-6 pt-8 flex items-start justify-between">
            <div className="space-y-1 text-left">
              <span className="text-[9px] font-styrene uppercase tracking-widest text-primary-dark font-bold bg-primary-light/50 px-2 py-1 rounded-full">{entry.topic}</span>
              <DrawerTitle className="text-2xl font-copernicus pt-2 text-text-heading">Trace History</DrawerTitle>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsAdding(!isAdding)}
              className="rounded-full bg-white shadow-sm border border-neutral-border text-primary-dark active:scale-90 transition-all"
            >
              {isAdding ? <X size={20} /> : <Edit3 size={20} />}
            </Button>
          </DrawerHeader>
          <DrawerDescription className='sr-only'>Trace the evolution of your understanding over time.</DrawerDescription>
          <div className="flex-1 overflow-y-auto py-8 space-y-10 pb-32 scroll-smooth">
            {isAdding && (
              <div className="space-y-4 animate-in fade-in slide-in-from-top-4 duration-500 glass-panel p-6 rounded-[2rem] border-primary/20">
                <label className="text-[10px] font-styrene uppercase tracking-widest text-primary-dark font-bold">New Interpretation</label>
                <Textarea
                  className="min-h-[150px] bg-neutral-section/50 border-none rounded-2xl font-tiempos text-lg text-text-body leading-relaxed focus:bg-white transition-all shadow-inner p-4"
                  placeholder="How does this look to you today?"
                  value={newReflection}
                  onChange={(e) => setNewReflection(e.target.value)}
                  autoFocus
                />
                <Button
                  onClick={handleAddVersion}
                  className="vibrant-btn w-full"
                >
                  Save Version {entry.versions.length + 1}
                </Button>
              </div>
            )}
            <div className="space-y-12 px-2">
              <div className="relative pl-10">
                <div className="absolute left-0 top-0 h-full w-[2px] bg-premium-gradient rounded-full" />
                <div className="absolute -left-[5px] top-0 h-3 w-3 rounded-full bg-primary-dark ring-4 ring-neutral-bg shadow-sm" />
                <div className="space-y-3">
                   <div className="flex items-center gap-2">
                    <Sparkles size={12} className="text-accent-highlight" />
                    <span className="text-[9px] font-styrene uppercase tracking-widest text-primary-dark font-bold">
                      {hasHistory ? 'Current Perspective' : 'Initial Capture'} — {format(parseISO(latestReflection?.date ?? entry.dateAdded), 'MMM d, yyyy')}
                    </span>
                  </div>
                  <p className="text-xl font-tiempos leading-relaxed text-text-heading font-medium">
                    {latestReflection?.text ?? entry.notes}
                  </p>
                </div>
              </div>
              {hasHistory && (
                <div className="space-y-10">
                   <div className="flex items-center gap-2 text-text-caption pl-10">
                    <History size={14} />
                    <span className="text-[10px] font-styrene uppercase tracking-widest font-bold">Evolution Log</span>
                  </div>
                  <div className="relative pl-10 opacity-60">
                    <div className="absolute left-0 top-0 h-full w-[2px] bg-neutral-border rounded-full" />
                    <div className="absolute -left-[5px] top-0 h-3 w-3 rounded-full bg-neutral-border ring-4 ring-neutral-bg" />
                    <span className="text-[9px] font-styrene uppercase tracking-widest text-text-caption font-bold block mb-2">
                      Original Capture — {format(parseISO(entry.dateAdded), 'MMM d, yyyy')}
                    </span>
                    <p className="text-base font-tiempos leading-relaxed text-text-body">
                      {entry.notes}
                    </p>
                  </div>
                  {[...entry.versions].slice(0, -1).reverse().map((v) => (
                    <div key={v.id} className="relative pl-10 opacity-80">
                      <div className="absolute left-0 top-0 h-full w-[2px] bg-neutral-border rounded-full" />
                      <div className="absolute -left-[5px] top-0 h-3 w-3 rounded-full bg-neutral-border ring-4 ring-neutral-bg" />
                      <span className="text-[9px] font-styrene uppercase tracking-widest text-text-caption font-bold block mb-2">
                        Iteration {v.version} — {format(parseISO(v.date), 'MMM d, yyyy')}
                      </span>
                      <p className="text-base font-tiempos leading-relaxed text-text-body">
                        {v.text}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          <DrawerFooter className="p-6 pb-10 bg-white/80 backdrop-blur-md border-t border-neutral-border">
            <DrawerClose asChild>
              <Button variant="outline" className="w-full h-14 rounded-full font-styrene text-[10px] uppercase tracking-widest font-bold border-neutral-border shadow-sm bg-white">
                Minimize Record
              </Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}