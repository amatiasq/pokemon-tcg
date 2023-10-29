export interface DeckEntry {
  id: string;
  count: number;
  notes: string;
  emojis: string[];
}

export function parseDeck(data: string): (DeckEntry | null)[] {
  return data
    .split('\n')
    .map((line) => line.trim().replace(/\s+/g, ' ').replace(/#.*$/, ''))
    .filter(Boolean)
    .map((line) => {
      const match = line.match(/^\s*([a-z0-9]+-[a-z0-9]+)( x\d+)?(.*)(#.*)?$/i);

      if (!match) {
        console.error('Invalid deck item:', line);
        return null;
      }

      const [, id, countStr, rest] = match;
      const count = countStr ? parseInt(countStr.slice(2)) : 1;

      const emojis = [...new Intl.Segmenter().segment(rest)]
        .map((x) => x.segment)
        .filter((x) => /\p{Emoji}/gu.test(x));

      const notes = emojis.reduce((a, x) => a.replace(x, ''), rest).trim();
      const key = `${id}-${emojis.join('')}`;

      return { id, key, count, notes, emojis };
    });
}
