import React, { useState, useEffect } from 'react';
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
import { toast } from 'sonner';
import { Save } from 'lucide-react';
interface EntryEditDrawerProps {
  entry: Entry;
  children: React.ReactNode;
}
export function EntryEditDrawer({ entry, children }: EntryEditDrawerProps) {
  const updateEntry = useStore(s => s.updateEntry);
  const [formData, setFormData] = useState({
    topic: entry.topic,
    url: entry.url,
    notes: entry.notes
  });
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    if (isOpen) {
      setFormData({
        topic: entry.topic,
        url: entry.url,
        notes: entry.notes
      });
    }
  }, [isOpen, entry]);
  const handleSave = () => {
    if (!formData.notes.trim()) {
      toast.error("Interpretation cannot be empty.");
      return;
    }
    updateEntry(entry.id, formData);
    toast.success("Entry updated successfully.");
    setIsOpen(false);
  };
  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerTrigger asChild>
        {children}
      </DrawerTrigger>
      <DrawerContent className="max-h-[92vh] bg-surface rounded-t-[3rem] border-none shadow-2xl">
        <div className="max-w-md mx-auto w-full h-full flex flex-col overflow-hidden px-6">
          <DrawerHeader className="pt-8 pb-4 text-left px-0">
            <DrawerTitle className="text-2xl font-copernicus text-primary">Refine Registry</DrawerTitle>
            <DrawerDescription className="text-[10px] font-styrene text-muted-foreground uppercase tracking-widest font-bold">
              Adjusting Metadata for ID: {entry.id.slice(0, 8)}
            </DrawerDescription>
          </DrawerHeader>
          <div className="flex-1 overflow-y-auto py-4 space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-styrene uppercase tracking-widest text-muted-foreground font-bold ml-1">Category</label>
              <input
                className="w-full bg-white border border-black/[0.08] rounded-2xl p-4 focus:ring-2 focus:ring-primary/20 outline-none transition-all font-tiempos placeholder:text-muted-foreground/30 shadow-sm"
                value={formData.topic}
                onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-styrene uppercase tracking-widest text-muted-foreground font-bold ml-1">Source Link</label>
              <input
                className="w-full bg-white border border-black/[0.08] rounded-2xl p-4 focus:ring-2 focus:ring-primary/20 outline-none transition-all font-mono text-sm placeholder:text-muted-foreground/30 shadow-sm"
                value={formData.url}
                onChange={(e) => setFormData({ ...formData, url: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-styrene uppercase tracking-widest text-muted-foreground font-bold ml-1">The Essence</label>
              <Textarea
                className="w-full min-h-[180px] bg-white border border-black/[0.08] rounded-3xl p-6 focus:ring-2 focus:ring-primary/20 outline-none transition-all font-tiempos text-lg leading-relaxed placeholder:text-muted-foreground/30 shadow-sm resize-none"
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              />
            </div>
          </div>
          <DrawerFooter className="pt-4 pb-10 flex flex-row gap-3 px-0">
            <DrawerClose asChild>
              <Button variant="outline" className="flex-1 h-14 rounded-full font-styrene text-[10px] uppercase tracking-widest font-bold border-black/[0.08] bg-white">
                Discard
              </Button>
            </DrawerClose>
            <Button
              onClick={handleSave}
              className="vibrant-btn flex-1 h-14 flex items-center justify-center gap-2 shadow-vibrant"
            >
              Update Record <Save size={16} />
            </Button>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}