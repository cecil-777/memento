import React, { useMemo } from 'react';
import { useStore } from '@/lib/store';
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from '@/components/ui/accordion';
import { EntryDetailView } from '@/components/EntryDetailView';
import { GitBranch, ChevronRight } from 'lucide-react';
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <header className="mb-12">
        <h1 className="text-4xl font-bold mb-2">Knowledge Tree</h1>
        <p className="text-sm font-styrene text-muted uppercase tracking-widest">
          The curated garden of your insights
        </p>
      </header>
      {treeData.length === 0 ? (
        <div className="py-20 text-center border border-dashed border-ink/10 rounded-3xl">
          <p className="text-muted font-tiempos italic">Your tree is still a seed. Distill matured items to see them grow here.</p>
        </div>
      ) : (
        <Accordion type="single" collapsible className="space-y-4">
          {treeData.map(([topic, items]) => (
            <AccordionItem key={topic} value={topic} className="border-none">
              <AccordionTrigger className="hover:no-underline bg-white/50 px-6 py-4 rounded-2xl border border-ink/5 group">
                <div className="flex items-center gap-4 text-left">
                  <div className="w-10 h-10 rounded-full bg-ink/5 flex items-center justify-center group-data-[state=open]:bg-ink group-data-[state=open]:text-parchment transition-colors">
                    <GitBranch size={18} />
                  </div>
                  <div>
                    <h3 className="font-copernicus text-lg leading-tight">{topic}</h3>
                    <span className="text-[10px] font-styrene uppercase tracking-widest text-muted">{items.length} MEMORIES</span>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pt-2 pb-6 px-4 space-y-3">
                {items.map(item => (
                  <EntryDetailView key={item.id} entry={item}>
                    <button className="w-full text-left p-4 rounded-xl hover:bg-white transition-colors group flex items-start gap-4">
                      <div className="mt-1 h-2 w-2 rounded-full bg-ink/20 shrink-0 group-hover:bg-ink transition-colors" />
                      <div className="flex-1">
                        <p className="text-sm font-tiempos text-ink/80 line-clamp-2 leading-relaxed">
                          {item.notes}
                        </p>
                        <div className="mt-2 flex items-center gap-3">
                          <span className="text-[9px] font-styrene uppercase tracking-widest text-muted">
                            {item.versions.length + 1} Growth Stages
                          </span>
                          {item.status === 'archived' && (
                            <span className="text-[9px] font-styrene uppercase tracking-widest px-2 py-0.5 bg-ink/5 rounded text-muted italic">
                              Archived
                            </span>
                          )}
                        </div>
                      </div>
                      <ChevronRight size={14} className="text-muted mt-1" />
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