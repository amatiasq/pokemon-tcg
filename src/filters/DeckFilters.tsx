import { For, Show, createMemo } from 'solid-js';
import { DeckEntry } from 'types:Deck';
import './DeckFilters.css';
import { Filter } from './Filter';
import { FilterButton } from './FilterButton';
import { clearFilters, hasFilters } from './filter-store';

export function DeckFilters(props: { cards: DeckEntry[] }) {
  const filters = [
    new Filter((card: DeckEntry) => card.supertype),
    new Filter((card: DeckEntry) => card.types),
    new Filter((card: DeckEntry) => card.subtypes),
    new Filter((card: DeckEntry) => card.emojis),
  ] as const;

  const hack = createMemo(() => {
    for (const filter of filters) {
      filter.reset();

      for (const card of props.cards) {
        filter.visit(card);
      }
    }

    return <T,>(x: T) => x;
  });

  return (
    <div class="deck-filters">
      <For each={hack()(filters)}>
        {(filter) => (
          <>
            <For each={filter.keys()}>
              {(entry) => <FilterButton name={entry} filter={filter} />}
            </For>
            <div class="filter-separator" />
          </>
        )}
      </For>

      <div class="filter-separator" />

      <Show when={hasFilters()}>
        <button onClick={clearFilters}>Clear Filters</button>
      </Show>
    </div>
  );
}