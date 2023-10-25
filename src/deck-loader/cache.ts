/* eslint-disable @typescript-eslint/no-explicit-any */

import { createWriteStream, existsSync } from 'node:fs';
import { mkdir, readFile, unlink, writeFile } from 'node:fs/promises';
import { get } from 'node:https';
import { extname } from 'node:path';
import { fetchCard } from './api';
import { DeckEntry } from './parser';

type Card = any;

const JSON_DIR = './db';
const IMG_DIR = './public';

if (!existsSync(JSON_DIR)) mkdir(JSON_DIR);

export async function downloadCard(
  entry: DeckEntry,
  replaceImages = false
): Promise<any> {
  if (entry == null) return null;

  const data = await loadCardData(entry.id);

  const { images } = data;

  const imgPath = `/${entry.id}${extname(images.small)}`;
  downloadToFile(images.small, `${IMG_DIR}/${imgPath}`);

  const hiresPath = `/${entry.id}_hires${extname(images.small)}`;
  downloadToFile(images.large, `${IMG_DIR}/${hiresPath}`);

  if (replaceImages) {
    images.small = imgPath;
    images.large = hiresPath;
  }

  return { ...data, ...entry };
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
