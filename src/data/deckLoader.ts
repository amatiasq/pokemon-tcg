/* eslint-disable @typescript-eslint/no-explicit-any */

import { createWriteStream, existsSync } from 'node:fs';
import { mkdir, readFile, unlink, writeFile } from 'node:fs/promises';
import { get } from 'node:https';
import { basename, extname } from 'node:path';
import pokemon from 'pokemontcgsdk';

type Card = any;

const JSON_DIR = './db';
const IMG_DIR = './public';

const deckExtensionRegex = /\.deck$/;
const fetchCard = createFetcher();

if (!existsSync(JSON_DIR)) mkdir(JSON_DIR);

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

interface DeckContent {
  id: string;
  count: number;
}

function parseDeck(data: string): (DeckContent | null)[] {
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

async function downloadCard(id: string, count: number): Promise<any> {
  const data = await loadCardData(id);

  const { images } = data;
  const imgPath = `/${id}${extname(images.small)}`;
  downloadToFile(images.small, `${IMG_DIR}/${imgPath}`);
  // images.small = imgPath;

  return { ...data, count };
}

async function loadCardData(id: string): Promise<Card> {
  const cachePath = `${JSON_DIR}/${id}.json`;

  if (existsSync(cachePath)) {
    const cache = await readFile(cachePath, 'utf-8');

    try {
      return JSON.parse(cache);
    } catch {
      await unlink(cachePath);
    }
  }

  const data = await fetchCard(id);
  await writeFile(cachePath, JSON.stringify(data, null, 2));
  return data;
}

function createFetcher() {
  let isInitiated = false;

  return (id: string) => {
    if (!isInitiated) {
      const apiKey = process.env.POKEMON_API_KEY;
      if (!apiKey) throw new Error('Missing Pokemon API key');
      pokemon.configure({ apiKey });
      isInitiated = true;
    }

    console.log('Fetching card from API:', id);
    return pokemon.card.find(id);
  };
}

function downloadToFile(url: string, path: string) {
  if (existsSync(path)) return Promise.resolve();

  return new Promise((resolve, reject) => {
    const file = createWriteStream(path, { autoClose: true });

    get(url, (response: any) => {
      response.pipe(file);
      file.on('finish', resolve);
    }).on('error', (err: Error) => {
      unlink(path);
      reject(err);
    });
  });
}
