import { Card } from './Card';

export interface Deck {
  name: string;
  cards: (Card & DeckEntry)[];
}

export interface DeckEntry {
  id: string;
  count: number;
  notes: string;
  emojis: string[];
}
