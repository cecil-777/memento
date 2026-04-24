import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { v4 as uuidv4 } from 'uuid';
import { subDays } from 'date-fns';
export type EntryStatus = 'incubating' | 'ready' | 'silver' | 'archived';
export interface Interpretation {
  id: string;
  text: string;
  date: string;
  version: number;
}
export interface Entry {
  id: string;
  url: string;
  topic: string;
  notes: string;
  dateAdded: string;
  status: EntryStatus;
  versions: Interpretation[];
}
interface MementoState {
  entries: Entry[];
  addEntry: (entry: Omit<Entry, 'id' | 'dateAdded' | 'status' | 'versions'>) => void;
  updateEntryStatus: (id: string, status: EntryStatus) => void;
  addVersion: (entryId: string, text: string) => void;
  importData: (data: string) => void;
}
// Mock initial data for the foundation phase
const INITIAL_ENTRIES: Entry[] = [
  {
    id: '1',
    url: 'https://en.wikipedia.org/wiki/Goldlist_method',
    topic: 'Learning',
    notes: 'The Goldlist method relies on the long-term memory instead of short-term cramming.',
    dateAdded: subDays(new Date(), 15).toISOString(),
    status: 'ready',
    versions: []
  },
  {
    id: '2',
    url: 'https://fs.blog/mental-models/',
    topic: 'Philosophy',
    notes: 'Thinking in mental models helps understand the world better.',
    dateAdded: new Date().toISOString(),
    status: 'incubating',
    versions: []
  }
];
export const useStore = create<MementoState>()(
  persist(
    (set) => ({
      entries: INITIAL_ENTRIES,
      addEntry: (entryData) => set((state) => ({
        entries: [
          ...state.entries,
          {
            ...entryData,
            id: uuidv4(),
            dateAdded: new Date().toISOString(),
            status: 'incubating',
            versions: []
          }
        ]
      })),
      updateEntryStatus: (id, status) => set((state) => ({
        entries: state.entries.map((e) => e.id === id ? { ...e, status } : e)
      })),
      addVersion: (entryId, text) => set((state) => ({
        entries: state.entries.map((e) => {
          if (e.id === entryId) {
            const nextVersion = e.versions.length + 1;
            return {
              ...e,
              versions: [...e.versions, { id: uuidv4(), text, date: new Date().toISOString(), version: nextVersion }]
            };
          }
          return e;
        })
      })),
      importData: (data) => {
        try {
          const parsed = JSON.parse(data);
          if (Array.isArray(parsed)) {
            set({ entries: parsed });
          }
        } catch (e) {
          console.error("Failed to import data", e);
        }
      }
    }),
    {
      name: 'memento-storage',
    }
  )
);