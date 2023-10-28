import { DeckEntry } from 'types:Deck';
import { create } from 'zustand';

const VOID_BOUNDS = { top: 0, left: 0, width: 0, height: 0 };

export interface FocusedCard {
  card: DeckEntry | null;
  bounds: { top: number; left: number; width: number; height: number };
}

export const useFocusedCard = create<FocusedCard>(() => ({
  card: null,
  bounds: VOID_BOUNDS,
}));

const { setState } = useFocusedCard;

export function setFocusedCard(card: DeckEntry, bounds: FocusedCard['bounds']) {
  setState({ card, bounds });
}

export function clearFocusedCard() {
  setState({ card: null, bounds: VOID_BOUNDS });
}
