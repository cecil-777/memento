import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '@/lib/store';
import { toast } from 'sonner';
import { ArrowLeft, Send } from 'lucide-react';
export function CapturePage() {
  const navigate = useNavigate();
  const addEntry = useStore(state => state.addEntry);
  const [formData, setFormData] = useState({
    url: '',
    topic: '',
    notes: ''
  });
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.notes) {
      toast.error("Please provide an interpretation.");
      return;
    }
    addEntry(formData);
    toast.success("Memory captured successfully.");
    navigate('/');
  };
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="py-8 md:py-10 lg:py-12">
        <header className="mb-10 flex items-center gap-4 px-2">
          <button onClick={() => navigate(-1)} className="p-3 rounded-full bg-white shadow-sm border border-neutral-border active:scale-90 transition-transform">
            <ArrowLeft size={20} className="text-primary-dark" />
          </button>
          <div>
            <h1 className="text-2xl font-bold font-copernicus text-text-heading">Add to Vault</h1>
            <p className="text-[10px] font-styrene text-text-caption uppercase tracking-widest font-bold">New Entry Registration</p>
          </div>
        </header>
        <form onSubmit={handleSubmit} className="space-y-8 px-2">
          <div className="space-y-2">
            <label className="text-[10px] font-styrene uppercase tracking-widest text-text-caption font-bold ml-1">Category</label>
            <input
              className="w-full bg-white border border-neutral-border rounded-2xl p-4 focus:ring-2 focus:ring-primary/20 outline-none transition-all font-tiempos text-text-body placeholder:text-text-caption/30 shadow-sm"
              placeholder="e.g. Psychology, Design, Tech..."
              value={formData.topic}
              onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-styrene uppercase tracking-widest text-text-caption font-bold ml-1">Source Link (Optional)</label>
            <input
              className="w-full bg-white border border-neutral-border rounded-2xl p-4 focus:ring-2 focus:ring-primary/20 outline-none transition-all font-mono text-sm text-text-body placeholder:text-text-caption/30 shadow-sm"
              placeholder="https://..."
              value={formData.url}
              onChange={(e) => setFormData({ ...formData, url: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-styrene uppercase tracking-widest text-text-caption font-bold ml-1">The Essence</label>
            <textarea
              className="w-full min-h-[250px] bg-white border border-neutral-border rounded-3xl p-6 focus:ring-2 focus:ring-primary/20 outline-none transition-all font-tiempos text-text-body text-lg leading-relaxed placeholder:text-text-caption/30 shadow-sm resize-none"
              placeholder="What did you learn from this? Distill your initial reaction..."
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
            />
          </div>
          <button
            type="submit"
            className="vibrant-btn w-full flex items-center justify-center gap-3 mt-4"
          >
            Finalize Capture <Send size={16} />
          </button>
        </form>
      </div>
    </div>
  );
}