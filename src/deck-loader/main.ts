import { readdir } from 'node:fs/promises';
import { basename } from 'node:path';

import { downloadCard } from './cache';
import { parseDeck } from './parser';

const decksModule = 'virtual:all-decks';
const resolvedDecksModule = '\0' + decksModule;
const deckExtensionRegex = /\.deck$/;

export default function deckLoader() {
  return {
    name: 'Deck Loader',

    resolveId(id) {
      if (id === decksModule) {
        return resolvedDecksModule;
      }
    },

    load(id) {
      if (id === resolvedDecksModule) {
        return '';
      }
    },

    async transform(src: string, id: string) {
      if (id === resolvedDecksModule) {
        return allDecksModule();
      }

      if (!deckExtensionRegex.test(id)) {
        return src;
      }

      const name = basename(id).replace(deckExtensionRegex, '');
      const parsed = await parseDeck(src);
      const cards = await Promise.all(
        parsed.map((x) => x && downloadCard(x.id, x.count))
      );

      return `export default ${JSON.stringify({ name, cards })};`;
    },
  };
}

async function allDecksModule() {
  const root = process.cwd();
  const decks = (await readdir('./src/decks'))
    .filter((x) => deckExtensionRegex.test(x))
    .map((x) => x.replace(deckExtensionRegex, ''));

  return `
    ${decks
      .map((x) => `import ${x} from '${root}/src/decks/${x}.deck';`)
      .join('\n')}
    export default [${decks.join(', ')}];
  `;
}
