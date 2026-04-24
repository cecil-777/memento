import React from 'react';
import { useStore } from '@/lib/store';
import { Download, Upload, Database, ShieldCheck } from 'lucide-react';
import { toast } from 'sonner';
export function SettingsPage() {
  const entries = useStore(state => state.entries);
  const importData = useStore(state => state.importData);
  const handleExport = () => {
    const dataStr = JSON.stringify(entries, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    const exportFileDefaultName = `memento-backup-${new Date().toISOString().split('T')[0]}.json`;
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
    toast.success("Backup downloaded.");
  };
  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      importData(content);
      toast.success("Knowledge restored successfully.");
    };
    reader.readAsText(file);
  };
  return (
    <div className="px-6 py-12">
      <header className="mb-12">
        <h1 className="text-4xl font-bold">Archival</h1>
        <p className="text-muted font-tiempos italic mt-2">
          Your data is local, private, and yours.
        </p>
      </header>
      <div className="space-y-6">
        <div className="p-6 rounded-2xl bg-white/50 border border-ink/5 space-y-4">
          <div className="flex items-center gap-3 mb-4">
            <Database size={20} className="text-muted" />
            <h3 className="font-styrene text-sm uppercase tracking-widest font-bold">Data Management</h3>
          </div>
          <button 
            onClick={handleExport}
            className="w-full flex items-center justify-between p-4 rounded-xl bg-ink text-parchment hover:opacity-90 transition-opacity"
          >
            <span className="font-styrene text-xs uppercase tracking-widest">Export Backup (JSON)</span>
            <Download size={18} />
          </button>
          <label className="w-full flex items-center justify-between p-4 rounded-xl border border-ink/10 cursor-pointer hover:bg-ink/5 transition-colors">
            <span className="font-styrene text-xs uppercase tracking-widest">Restore Backup</span>
            <Upload size={18} />
            <input type="file" className="hidden" accept=".json" onChange={handleImport} />
          </label>
        </div>
        <div className="p-6 rounded-2xl bg-ink text-parchment/60 font-tiempos text-sm leading-relaxed flex gap-4">
          <ShieldCheck size={40} className="text-parchment flex-shrink-0" />
          <p>
            Memento uses browser storage. We never see your thoughts. 
            Export frequently to ensure your digital library stays safe across devices.
          </p>
        </div>
        <div className="text-center pt-8">
          <p className="text-[10px] font-styrene uppercase tracking-widest text-muted">
            Version 1.0.0 — Slow Tech Labs
          </p>
        </div>
      </div>
    </div>
  );
}