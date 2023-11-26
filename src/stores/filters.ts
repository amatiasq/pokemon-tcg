import { createSignal } from 'solid-js';
import { DeckEntry } from 'types:Deck';

type Filter = (card: DeckEntry) => boolean;

const [filters, setFilters] = createSignal({
  include: [] as Filter[],
  exclude: [] as Filter[],
});

export function showCardsWith(filter: Filter) {
  setFilters((filters) => ({
    include: [...filters.include, filter],
    exclude: filters.exclude.filter((f) => f !== filter),
  }));
}

export function hideCardsWith(filter: Filter) {
  setFilters((filters) => ({
    include: filters.include.filter((f) => f !== filter),
    exclude: [...filters.exclude, filter],
  }));
}

export function reset(filter: Filter) {
  setFilters((filters) => ({
    include: filters.include.filter((f) => f !== filter),
    exclude: filters.exclude.filter((f) => f !== filter),
  }));
}

export function check(card: DeckEntry) {
  const { include, exclude } = filters();

  return (
    include.every((filter) => filter(card)) &&
    exclude.every((filter) => !filter(card))
  );
}
