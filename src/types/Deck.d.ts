declare module 'types:Deck' {
  import { Card } from 'types:Card';

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
}

declare module '*.deck' {
  import { Deck } from 'types:Deck';
  const deck: Deck;
  export default deck;
}
