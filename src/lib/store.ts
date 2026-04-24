import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { v4 as uuidv4 } from 'uuid';
import { subDays, isAfter, addDays, parseISO } from 'date-fns';
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
  checkReadyStates: () => void;
}
const INITIAL_ENTRIES: Entry[] = [
  {
    id: '1',
    url: 'https://en.wikipedia.org/wiki/Goldlist_method',
    topic: 'Methodology',
    notes: 'The Goldlist method is a slow-learning technique that bypasses short-term memory through a deliberate 14-day distillation cycle.',
    dateAdded: subDays(new Date(), 15).toISOString(),
    status: 'ready',
    versions: []
  },
  {
    id: '2',
    url: 'https://fs.blog/mental-models/',
    topic: 'Philosophy',
    notes: 'Mental models are the framework we use to understand life. They are like lens through which we view and organize complex systems.',
    dateAdded: new Date().toISOString(),
    status: 'incubating',
    versions: []
  }
];
export const useStore = create<MementoState>()(
  persist(
    (set, get) => ({
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
            const nextVersionNum = e.versions.length + 1;
            const newVersion: Interpretation = {
              id: uuidv4(),
              text,
              date: new Date().toISOString(),
              version: nextVersionNum
            };
            return {
              ...e,
              versions: [...e.versions, newVersion]
            };
          }
          return e;
        })
      })),
      checkReadyStates: () => {
        const { entries } = get();
        const now = new Date();
        let changed = false;
        const nextEntries = entries.map(e => {
          if (e.status === 'incubating') {
            const unlockDate = addDays(parseISO(e.dateAdded), 14);
            if (isAfter(now, unlockDate)) {
              changed = true;
              return { ...e, status: 'ready' as EntryStatus };
            }
          }
          return e;
        });
        if (changed) set({ entries: nextEntries });
      },
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
      onRehydrateStorage: (state) => {
        return (rehydratedState) => {
          if (rehydratedState) {
            rehydratedState.checkReadyStates();
          }
        };
      },
    }
  )
);