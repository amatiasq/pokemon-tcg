import { basename } from 'node:path';

import { downloadCard } from './cache';
import { parseDeck } from './parser';

const deckExtensionRegex = /\.deck$/;

export default function deckLoader() {
  return {
    name: 'Deck Loader',

    async transform(src: string, id: string) {
      if (!deckExtensionRegex.test(id)) {
        return src;
      }

      const parsed = await parseDeck(src);
      const full = await Promise.all(
        parsed.map((x) => x && downloadCard(x.id, x.count))
      );

      return `export default {
        name: '${basename(id).replace(deckExtensionRegex, '')}',
        cards: ${JSON.stringify(full)}
      };`;
    },
  };
}
