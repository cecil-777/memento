import React, { useState } from 'react';
import { useStore } from '@/lib/store';
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
import { format } from 'date-fns';
import { Plus, History, X, Edit3, Sparkles } from 'lucide-react';
import { toast } from 'sonner';
interface EntryDetailViewProps {
  entry: any;
  children: React.ReactNode;
}
export function EntryDetailView({ entry, children }: EntryDetailViewProps) {
  const addVersion = useStore(state => state.addVersion);
  const [newReflection, setNewReflection] = useState('');
  const [isAdding, setIsAdding] = useState(false);
  const handleAddVersion = () => {
    if (!newReflection.trim()) return;
    addVersion(entry.id, newReflection);
    setNewReflection('');
    setIsAdding(false);
    toast.success("Reflection added to product history.");
  };
  return (
    <Drawer>
      <DrawerTrigger asChild>
        {children}
      </DrawerTrigger>
      <DrawerContent className="max-h-[92vh] bg-surface rounded-t-[3rem] border-none shadow-2xl">
        <div className="max-w-md mx-auto w-full h-full flex flex-col overflow-hidden px-2">
          <DrawerHeader className="border-b border-black/5 pb-6 pt-8 flex items-start justify-between">
            <div className="space-y-1">
              <span className="text-[9px] font-styrene uppercase tracking-widest text-primary font-bold bg-primary/10 px-2 py-1 rounded-full">{entry.topic}</span>
              <DrawerTitle className="text-2xl font-copernicus pt-2">Trace History</DrawerTitle>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsAdding(!isAdding)}
              className="rounded-full bg-white shadow-sm border border-black/5 text-primary active:scale-90 transition-all"
            >
              {isAdding ? <X size={20} /> : <Edit3 size={20} />}
            </Button>
          </DrawerHeader>
          <DrawerDescription className='sr-only'>Product-like memory details and history.</DrawerDescription>
          <div className="flex-1 overflow-y-auto p-6 space-y-10 pb-24 scroll-smooth">
            {isAdding && (
              <div className="space-y-4 animate-in fade-in slide-in-from-top-4 duration-500 glass-panel p-6 rounded-[2rem]">
                <label className="text-[10px] font-styrene uppercase tracking-widest text-primary font-bold">Add New Reflection</label>
                <Textarea
                  className="min-h-[150px] bg-neutral-50/50 border-none rounded-2xl font-tiempos text-lg leading-relaxed focus:bg-white transition-all shadow-inner p-4"
                  placeholder="How does this look to you today?"
                  value={newReflection}
                  onChange={(e) => setNewReflection(e.target.value)}
                  autoFocus
                />
                <Button
                  onClick={handleAddVersion}
                  className="vibrant-btn w-full"
                >
                  Save Reflection
                </Button>
              </div>
            )}
            <div className="space-y-12">
              {/* Latest Version - The "Current Model" */}
              <div className="relative pl-8">
                <div className="absolute left-0 top-0 h-full w-[2px] bg-vibrant-gradient rounded-full" />
                <div className="absolute -left-[5px] top-0 h-3 w-3 rounded-full bg-primary ring-4 ring-white" />
                <div className="space-y-3">
                   <div className="flex items-center gap-2">
                    <Sparkles size={12} className="text-primary" />
                    <span className="text-[9px] font-styrene uppercase tracking-widest text-primary font-bold">
                      Latest Model — {format(new Date((entry.versions?.length ?? 0) > 0 ? entry.versions![entry.versions.length - 1].date : entry.dateAdded), 'MMM d, yyyy')}
                    </span>
                  </div>
                  <p className="text-xl font-tiempos leading-relaxed text-foreground/90 font-medium">
                    {(entry.versions?.length ?? 0) > 0 ? entry.versions![entry.versions.length - 1].text : entry.notes}
                  </p>
                </div>
              </div>
              {/* History Timeline */}
              {(entry.versions?.length ?? 0) > 0 && (
                <div className="space-y-10">
                   <div className="flex items-center gap-2 text-muted-foreground/40 pl-8">
                    <History size={14} />
                    <span className="text-[10px] font-styrene uppercase tracking-widest font-bold">Archive Log</span>
                  </div>
                  {/* Original Note */}
                  <div className="relative pl-8 opacity-50">
                    <div className="absolute left-0 top-0 h-full w-[2px] bg-neutral-200 rounded-full" />
                    <div className="absolute -left-[5px] top-0 h-3 w-3 rounded-full bg-neutral-300 ring-4 ring-white" />
                    <span className="text-[9px] font-styrene uppercase tracking-widest text-muted-foreground font-bold block mb-2">
                      Original Concept — {format(new Date(entry.dateAdded), 'MMM d, yyyy')}
                    </span>
                    <p className="text-base font-tiempos leading-relaxed text-muted-foreground">
                      {entry.notes}
                    </p>
                  </div>
                  {/* Intermediary versions */}
                  {entry.versions?.slice(0, -1).reverse().map((v: any) => (
                    <div key={v.id} className="relative pl-8 opacity-70">
                      <div className="absolute left-0 top-0 h-full w-[2px] bg-neutral-200 rounded-full" />
                      <div className="absolute -left-[5px] top-0 h-3 w-3 rounded-full bg-neutral-400 ring-4 ring-white" />
                      <span className="text-[9px] font-styrene uppercase tracking-widest text-muted-foreground font-bold block mb-2">
                        Iteration {v.version} — {format(new Date(v.date), 'MMM d, yyyy')}
                      </span>
                      <p className="text-base font-tiempos leading-relaxed text-foreground/70">
                        {v.text}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          <DrawerFooter className="p-6 pb-10 bg-white/80 backdrop-blur-md border-t border-black/5">
            <DrawerClose asChild>
              <Button variant="outline" className="w-full h-14 rounded-full font-styrene text-[10px] uppercase tracking-widest font-bold border-black/5 shadow-sm">
                Minimize Record
              </Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}