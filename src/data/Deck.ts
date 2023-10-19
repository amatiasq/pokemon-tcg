import { Card } from './Card';
import { getCardsById } from './api';

export interface Deck {
  name: string;
  cards: (Card & { count: number })[];
}

export function deck(name: string, cards: string): () => Promise<Deck> {
  const parsed = cards
    .split('\n')
    .map((line) => {
      const clear = line.trim().replace(/\s+/g, ' ');
      if (!clear) return;
      const match = clear.match(/^\s*([a-z0-9]+-[0-9]+)( x\d+)?/);

      if (!match) {
        console.error('Invalid deck item:', line);
        return;
      }

      const [, id, count] = match;
      return {
        id,
        count: count ? parseInt(count.slice(2)) : 1,
      };
    })
    .filter(Boolean) as { id: string; count: number }[];

  return async () => {
    const data = await getCardsById(parsed.map((x) => x.id));

    return {
      name,
      cards: parsed.map((x, i) => ({
        ...data[i],
        count: x.count,
      })),
    };
  };
}
