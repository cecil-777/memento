import React from 'react';
import { useStore } from '@/lib/store';
import { Download, Upload, Database, ShieldCheck, ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
export function SettingsPage() {
  const navigate = useNavigate();
  const entries = useStore(s => s.entries);
  const importData = useStore(s => s.importData);
  const handleExport = () => {
    const dataStr = JSON.stringify(entries, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    const exportFileDefaultName = `memento-backup-${new Date().toISOString().split('T')[0]}.json`;
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
    toast.success("Vault backup downloaded.");
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="py-8 md:py-10 lg:py-12 space-y-10">
        <header className="flex items-center gap-4 px-2">
          <button onClick={() => navigate(-1)} className="p-3 rounded-full bg-white shadow-sm border border-black/[0.08] active:scale-90 transition-transform">
            <ArrowLeft size={20} className="text-primary" />
          </button>
          <div>
            <h1 className="text-3xl font-bold font-copernicus text-primary">Vault Controls</h1>
            <p className="text-[10px] font-styrene text-muted-foreground uppercase tracking-widest font-bold">System Management</p>
          </div>
        </header>
        <div className="space-y-6 px-2">
          <div className="product-card p-8 space-y-6 border-black/[0.08]">
            <div className="flex items-center gap-3">
              <Database size={20} className="text-primary" />
              <h3 className="font-styrene text-xs uppercase tracking-widest font-bold">Inventory Data</h3>
            </div>
            <div className="grid gap-4">
              <button
                onClick={handleExport}
                className="w-full flex items-center justify-between p-5 rounded-2xl bg-vibrant-gradient text-white shadow-vibrant hover:opacity-90 transition-all active:scale-[0.98]"
              >
                <div className="text-left">
                  <span className="font-styrene text-[10px] uppercase tracking-widest font-bold block opacity-80">Download</span>
                  <span className="font-copernicus text-sm">Export Local Backup</span>
                </div>
                <Download size={20} />
              </button>
              <label className="w-full flex items-center justify-between p-5 rounded-2xl bg-white border border-black/[0.08] cursor-pointer hover:bg-neutral-50 hover:shadow-sm transition-all active:scale-[0.98]">
                <div className="text-left">
                  <span className="font-styrene text-[10px] uppercase tracking-widest font-bold block text-muted-foreground">Upload</span>
                  <span className="font-copernicus text-sm text-foreground">Restore from JSON</span>
                </div>
                <Upload size={20} className="text-primary" />
                <input type="file" className="hidden" accept=".json" onChange={handleImport} />
              </label>
            </div>
          </div>
          <div className="p-8 rounded-[2.5rem] bg-primary/5 border border-primary/10 flex gap-5">
            <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shrink-0 shadow-sm border border-primary/10">
              <ShieldCheck size={24} className="text-primary" />
            </div>
            <div className="space-y-2">
              <h4 className="font-styrene text-[10px] uppercase tracking-widest font-bold text-primary">Privacy Policy</h4>
              <p className="font-tiempos text-sm leading-relaxed text-foreground/70 italic">
                Your thoughts are yours alone. Memento stores all data locally in your browser cache.
                We recommend weekly exports to keep your intellectual assets safe from browser clearing.
              </p>
            </div>
          </div>
          <div className="text-center pt-12">
            <div className="inline-block px-4 py-2 bg-neutral-100 rounded-full border border-black/[0.08]">
              <p className="text-[9px] font-styrene uppercase tracking-widest text-muted-foreground font-bold">
                Version 1.0.0 — Navy Edition
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}