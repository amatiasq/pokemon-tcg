import { Card } from './Card';

export interface Deck {
  name: string;
  cards: DeckEntry[];
}

export interface DeckEntry extends Card {
  id: string;
  count: number;
  notes: string;
  emojis: string[];
}
