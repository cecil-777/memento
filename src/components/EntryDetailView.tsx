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
import { Plus, History, Quote } from 'lucide-react';
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
    toast.success("New growth added to memory.");
  };
  return (
    <Drawer>
      <DrawerTrigger asChild>
        {children}
      </DrawerTrigger>
      <DrawerContent className="max-h-[92vh] bg-parchment parchment-texture">
        <div className="max-w-md mx-auto w-full h-full flex flex-col overflow-hidden">
          <DrawerHeader className="border-b border-ink/5 pb-6">
            <div className="flex justify-between items-start">
              <div className="space-y-1">
                <span className="text-[10px] font-styrene uppercase tracking-widest text-muted">{entry.topic}</span>
                <DrawerTitle className="text-2xl font-copernicus">Memory Trace</DrawerTitle>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsAdding(!isAdding)}
                className="font-styrene text-[10px] uppercase tracking-widest gap-2"
              >
                <Plus size={14} />
                {isAdding ? 'Cancel' : 'New Version'}
              </Button>
            </div>
          </DrawerHeader>
          <DrawerDescription className='sr-only'>Detailed view of memory entry, history, and growth stages.</DrawerDescription>
          <div className="flex-1 overflow-y-auto p-6 space-y-10 pb-24">
            {isAdding && (
              <div className="space-y-4 animate-in fade-in slide-in-from-top-4 duration-300">
                <label className="text-[10px] font-styrene uppercase tracking-widest text-muted">New Interpretation</label>
                <Textarea 
                  className="min-h-[150px] bg-white/50 border-ink/10 font-tiempos text-lg leading-relaxed focus:bg-white transition-colors"
                  placeholder="How does this look to you now?"
                  value={newReflection}
                  onChange={(e) => setNewReflection(e.target.value)}
                  autoFocus
                />
                <Button 
                  onClick={handleAddVersion}
                  className="w-full bg-ink text-parchment font-styrene text-xs uppercase tracking-widest h-12"
                >
                  Save Reflection
                </Button>
              </div>
            )}
            <div className="space-y-12">
              {/* Latest */}
              <div className="relative pl-6 border-l border-ink/10">
                <div className="absolute -left-[5px] top-0 h-2 w-2 rounded-full bg-ink" />
                <span className="text-[9px] font-styrene uppercase tracking-widest text-muted block mb-2">
                  Latest — {format(new Date((entry.versions?.length ?? 0) > 0 ? entry.versions![entry.versions.length - 1].date : entry.dateAdded), 'MMM d, yyyy')}
                </span>
                <p className="text-xl font-tiempos leading-relaxed text-ink/90">
                  {(entry.versions?.length ?? 0) > 0 ? entry.versions![entry.versions.length - 1].text : entry.notes}
                </p>
              </div>
              {/* History */}
              {(entry.versions?.length ?? 0) > 0 && (
                <div className="space-y-10 opacity-60">
                   <div className="flex items-center gap-2 text-muted">
                    <History size={14} />
                    <span className="text-[10px] font-styrene uppercase tracking-widest">History</span>
                  </div>
                  {/* If we have versions, the original note is the first seed */}
                  <div className="relative pl-6 border-l border-ink/5 pb-2">
                    <div className="absolute -left-[5px] top-0 h-2 w-2 rounded-full bg-ink/20" />
                    <span className="text-[9px] font-styrene uppercase tracking-widest text-muted block mb-2">
                      The Seed — {format(new Date(entry.dateAdded), 'MMM d, yyyy')}
                    </span>
                    <p className="text-base font-tiempos leading-relaxed text-ink/70">
                      {entry.notes}
                    </p>
                  </div>
                  {/* Intermediary versions if any (skipping the very latest which is shown above) */}
                  {entry.versions?.slice(0, -1).reverse().map((v: any) => (
                    <div key={v.id} className="relative pl-6 border-l border-ink/5">
                      <div className="absolute -left-[5px] top-0 h-2 w-2 rounded-full bg-ink/20" />
                      <span className="text-[9px] font-styrene uppercase tracking-widest text-muted block mb-2">
                        Reflection {v.version} — {format(new Date(v.date), 'MMM d, yyyy')}
                      </span>
                      <p className="text-base font-tiempos leading-relaxed text-ink/70">
                        {v.text}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          <DrawerFooter className="border-t border-ink/5 p-6 bg-parchment/80 backdrop-blur-sm">
            <DrawerClose asChild>
              <Button variant="outline" className="w-full font-styrene text-xs uppercase tracking-widest h-12 border-ink/10">Close Record</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}