import pokemon from 'pokemontcgsdk';

let isInitiated = false;

export function fetchCard(id: string) {
  if (!isInitiated) {
    initiate();
    isInitiated = true;
  }

  console.log('Fetching card from API:', id);
  return pokemon.card.find(id);
}

function initiate() {
  const apiKey = process.env.POKEMON_API_KEY;
  if (!apiKey) throw new Error('Missing Pokemon API key');
  pokemon.configure({ apiKey });
}
