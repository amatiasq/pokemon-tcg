import pokemon from 'pokemontcgsdk';
import { Card } from './Card';

pokemon.configure({
  apiKey: import.meta.env.VITE_POKEMON_API_KEY,
});

export function getCardById(id: string) {
  return pokemon.card.find(id) as Promise<Card>;
}

export function getCardsById(ids: string[]) {
  return Promise.all(ids.map(getCardById));
}
