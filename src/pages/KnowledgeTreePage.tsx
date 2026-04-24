import React, { useMemo } from 'react';
import { useStore } from '@/lib/store';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion';
import { EntryDetailView } from '@/components/EntryDetailView';
import { Layers, ChevronRight, Bookmark } from 'lucide-react';
export function KnowledgeTreePage() {
  const entries = useStore(state => state.entries);
  const treeData = useMemo(() => {
    const silverAndArchived = entries.filter(e => e.status === 'silver' || e.status === 'archived');
    const grouped: Record<string, typeof entries> = {};
    silverAndArchived.forEach(entry => {
      const topic = entry.topic || 'Uncategorized';
      if (!grouped[topic]) grouped[topic] = [];
      grouped[topic].push(entry);
    });
    return Object.entries(grouped).sort(([a], [b]) => a.localeCompare(b));
  }, [entries]);
  return (
    <div className="max-w-7xl mx-auto px-6 py-10 space-y-8">
      <header className="space-y-1">
        <h1 className="text-3xl font-bold font-copernicus">Knowledge Vault</h1>
        <p className="text-[10px] font-styrene text-muted-foreground uppercase tracking-widest font-bold">Your Intellectual Inventory</p>
      </header>
      {treeData.length === 0 ? (
        <div className="py-24 text-center glass-panel rounded-[2.5rem] border-dashed">
          <p className="text-muted-foreground font-tiempos italic">The vault is empty. Distill items to archive them here.</p>
        </div>
      ) : (
        <Accordion type="single" collapsible className="space-y-4">
          {treeData.map(([topic, items]) => (
            <AccordionItem key={topic} value={topic} className="border-none">
              <AccordionTrigger className="hover:no-underline px-6 py-5 rounded-[1.5rem] bg-white border border-black/5 group shadow-sm">
                <div className="flex items-center gap-4 text-left">
                  <div className="w-12 h-12 rounded-2xl bg-neutral-50 flex items-center justify-center group-data-[state=open]:bg-primary group-data-[state=open]:text-white transition-all duration-300">
                    <Layers size={20} />
                  </div>
                  <div>
                    <h3 className="font-copernicus text-lg leading-none mb-1">{topic}</h3>
                    <span className="text-[9px] font-styrene uppercase tracking-widest text-muted-foreground font-bold">{items.length} Entries</span>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pt-3 pb-6 space-y-3 px-2">
                {items.map(item => (
                  <EntryDetailView key={item.id} entry={item}>
                    <button className="w-full text-left p-5 rounded-[1.2rem] bg-neutral-50/50 hover:bg-white transition-all border border-transparent hover:border-black/5 group flex items-start gap-4">
                      <div className="mt-1 h-2 w-2 rounded-full bg-primary/20 shrink-0 group-hover:bg-primary transition-colors" />
                      <div className="flex-1">
                        <p className="text-sm font-tiempos text-foreground/80 line-clamp-2 leading-relaxed mb-3">
                          {item.notes}
                        </p>
                        <div className="flex items-center gap-2">
                          <Bookmark size={10} className="text-primary" />
                          <span className="text-[8px] font-styrene uppercase tracking-widest text-primary font-bold">
                            {item.versions.length + 1} Growth Stages
                          </span>
                          {item.status === 'archived' && (
                            <span className="text-[8px] font-styrene uppercase tracking-widest px-2 py-0.5 bg-neutral-200/50 rounded-full text-muted-foreground font-bold ml-auto">
                              Archived
                            </span>
                          )}
                        </div>
                      </div>
                      <ChevronRight size={14} className="text-muted-foreground/40 mt-1" />
                    </button>
                  </EntryDetailView>
                ))}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      )}
    </div>
  );
}