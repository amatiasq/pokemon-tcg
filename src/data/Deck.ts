import { Card } from './Card';

export interface Deck {
  name: string;
  cards: (Card & { count: number })[];
}
