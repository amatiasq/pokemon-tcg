import create from 'solid-zustand';
import { DeckEntry } from 'types:Deck';
import decks from 'virtual:all-decks';

export const FilterStatus = ['UNSET', 'INCLUDED', 'EXCLUDED'];
export type FilterStatus = (typeof FilterStatus)[number];

const VOID_BOUNDS = { top: 0, left: 0, width: 0, height: 0 };
export type CardBounds = typeof VOID_BOUNDS;

type FilterEntry = {
  key: string;
  name: string;
  status: FilterStatus;
};

interface AppState {
  newDeck: DeckEntry[];
  focusCard: DeckEntry | null;
  focusCardBounds: CardBounds;
  filters: FilterEntry[];
}

const useStore = create<AppState>(() => ({
  decks,
  newDeck: [],
  focusCard: null,
  focusCardBounds: VOID_BOUNDS,
  filters: [],
}));
const set = useStore.setState;

export const store = {
  use: useStore,

  // useFocusCard: () =>
  //   useStore((state) => [state.focusCard, state.focusCardBounds]),
  setFocusCard: (card: DeckEntry | null, element: HTMLElement) => {
    const { top, left, width, height } = element.getBoundingClientRect();
    set({ focusCard: card, focusCardBounds: { top, left, width, height } });
  },
  clearFocusCard: () => set({ focusCard: null, focusCardBounds: VOID_BOUNDS }),

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
