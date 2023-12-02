import create from 'solid-zustand';
import { ApiCard } from 'types:Card';
import decks from 'virtual:all-decks';

export const FilterStatus = ['UNSET', 'INCLUDED', 'EXCLUDED'];
export type FilterStatus = (typeof FilterStatus)[number];

type FilterEntry = {
  key: string;
  name: string;
  status: FilterStatus;
};

interface AppState {
  newDeck: ApiCard[];
  focusCard: ApiCard | null;
  filters: FilterEntry[];
}

const useStore = create<AppState>(() => ({
  decks,
  newDeck: [],
  focusCard: null,
  filters: [],
}));
const set = useStore.setState;

export const store = {
  use: useStore,

  useFocusCard: () => useStore((state) => state.focusCard),
  setFocusCard: (card: ApiCard | null) => set({ focusCard: card }),

  useFilters: () => useStore((state) => state.filters),
  hasFilters: () => useStore((state) => state.filters.length > 0),
  setFilter: (filter: FilterEntry) =>
    set((state) => {
      const without = state.filters.filter((f) => f.name !== filter.name);
      return {
        filters: filter.status === 'UNSET' ? without : [...without, filter],
      };
    }),

  clearFilters: () => set({ filters: [] }),
};
