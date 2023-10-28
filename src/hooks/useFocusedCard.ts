import { create } from 'zustand';
import { DeckEntry } from '../types/Deck';

const VOID_BOUNDS = { top: 0, left: 0, width: 0, height: 0 };

export interface FocusedCard {
  card: DeckEntry | null;
  bounds: { top: number; left: number; width: number; height: number };

  set: (card: DeckEntry, bounds: FocusedCard['bounds']) => void;
  clear: () => void;
}

export const useFocusedCard = create<FocusedCard>((set) => ({
  card: null,
  bounds: VOID_BOUNDS,

  set: (card: DeckEntry, bounds: FocusedCard['bounds']) =>
    set({ card, bounds }),

  clear: () => set({ card: null, bounds: VOID_BOUNDS }),
}));
