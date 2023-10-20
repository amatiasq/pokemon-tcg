export interface DeckContent {
  id: string;
  count: number;
}

export function parseDeck(data: string): (DeckContent | null)[] {
  return data
    .split('\n')
    .map((line) => line.trim().replace(/\s+/g, ' ').replace(/#.*$/, ''))
    .filter(Boolean)
    .map((line) => {
      const match = line.match(/^\s*([a-z0-9]+-[a-z0-9]+)( x\d+)?/i);

      if (!match) {
        console.error('Invalid deck item:', line);
        return null;
      }

      const [, id, countStr] = match;
      const count = countStr ? parseInt(countStr.slice(2)) : 1;
      return { id, count };
    });
}
