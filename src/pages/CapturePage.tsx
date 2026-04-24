import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '@/lib/store';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
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
      toast.error("Please add some notes or interpretation.");
      return;
    }
    addEntry(formData);
    toast.success("Entry sent to the Holding Pen.");
    navigate('/');
  };
  return (
    <div className="px-6 py-12">
      <header className="mb-12">
        <h1 className="text-4xl font-bold">New Memory</h1>
        <p className="text-muted font-tiempos italic mt-2">
          Capture first, distill in 14 days.
        </p>
      </header>
      <form onSubmit={handleSubmit} className="space-y-12">
        <div className="space-y-2">
          <label className="text-[10px] font-styrene uppercase tracking-widest text-muted">Topic Tag</label>
          <input
            className="notebook-input w-full text-lg"
            placeholder="Philosophy, Science, Poetry..."
            value={formData.topic}
            onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <label className="text-[10px] font-styrene uppercase tracking-widest text-muted">Original URL (Optional)</label>
          <input
            className="notebook-input w-full text-sm font-mono opacity-60"
            placeholder="https://..."
            value={formData.url}
            onChange={(e) => setFormData({ ...formData, url: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <label className="text-[10px] font-styrene uppercase tracking-widest text-muted">First Interpretation</label>
          <textarea
            className="notebook-input w-full min-h-[200px] text-xl resize-none leading-relaxed"
            placeholder="Write your initial thoughts here. What resonated? Why save this?"
            value={formData.notes}
            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
          />
        </div>
        <button
          type="submit"
          className="w-full bg-ink text-parchment py-4 rounded-xl font-styrene text-sm uppercase tracking-widest shadow-lg active:scale-95 transition-all"
        >
          Store in Ink
        </button>
      </form>
    </div>
  );
}