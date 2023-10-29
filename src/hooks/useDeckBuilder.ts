import { Deck, DeckEntry } from 'types:Deck';
import { create } from 'zustand';

export interface SelectableCard extends DeckEntry {
  selected: number;
}

export interface DeckBuild extends Deck {
  cards: SelectableCard[];
}

export const useDeckBuilder = create<DeckBuild>(() => ({
  name: '',
  cards: [],
}));

const { setState } = useDeckBuilder;

export function setCardCount(card: SelectableCard, count: number) {
  setState(({ cards }) => {
    if (count === 0) {
      return { cards: cards.filter((x) => x.id !== card.id) };
    }

    const newEntry = { ...card, selected: count };
    const index = cards.findIndex((x) => x.id === card.id);

    if (index === -1) return { cards: [...cards, newEntry] };

    const copy = [...cards];
    copy[index] = newEntry;
    return { cards: copy };
  });
}
