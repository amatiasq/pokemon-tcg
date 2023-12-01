import { For, createSignal } from 'solid-js';
import { ApiCard } from 'types:Card';
import { CardView } from '../card/CardView';
import './SearchCard.css';

export function SearchCard() {
  const [results, setResults] = createSignal<ApiCard[]>([]);

  async function search(name: string) {
    const url = new URL('https://api.pokemontcg.io/v2/cards');
    url.searchParams.set('q', `name:${name}`);

    const request = await fetch(url);
    const response = await request.json();

    setResults(response.data);
  }

  return (
    <div class="search-card">
      <input
        type="text"
        placeholder="Search"
        onChange={(e) => search(e.target.value)}
      />

      <div class="search-results">
        <For each={results()}>
          {(card) => (
            <div
              onClick={() =>
                navigator.clipboard.writeText(`${card.id} ${card.name}`)
              }
            >
              <CardView card={card} />
            </div>
          )}
        </For>
      </div>
    </div>
  );
}
