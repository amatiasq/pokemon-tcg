import { readdir } from 'node:fs/promises';
import { basename } from 'node:path';

import { downloadCard } from './cache';
import { parseDeck } from './parser';

const decksModule = 'virtual:all-decks';
const resolvedDecksModule = '\0' + decksModule;
const deckExtensionRegex = /\.deck$/;

const root = process.cwd();
const DECKS_DIR = `${root}/decks`;

export default function deckLoader() {
  let isBuildMode = false;

  return {
    name: 'Deck Loader',

    configResolved({ command }) {
      isBuildMode = command !== 'serve';
    },

    buildStart() {
      this.addWatchFile(DECKS_DIR);
    },

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
        parsed.map((x) => downloadCard(x, isBuildMode))
      );

      return `export default ${JSON.stringify({ name, cards })};`;
    },
  };
}

async function allDecksModule() {
  const decks = (await readdir(DECKS_DIR))
    .filter((x) => deckExtensionRegex.test(x))
    .map((x) => x.replace(deckExtensionRegex, ''));

  return `
    ${decks.map((x) => `import ${x} from '${DECKS_DIR}/${x}.deck';`).join('\n')}
    export default [${decks.join(', ')}];
  `;
}
