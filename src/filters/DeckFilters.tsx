import { createMemo } from 'solid-js';
import { DeckEntry } from 'types:Deck';
import './DeckFilters.css';
import { Filter } from './Filter';
import { FilterButton } from './FilterButton';
import { clearFilters, hasFilters } from './filter-store';

export function DeckFilters(props: { cards: DeckEntry[] }) {
  const filters = createMemo(() => {
    const filters = [
      new Filter((card: DeckEntry) => card.supertype),
      new Filter((card: DeckEntry) => card.types),
      new Filter((card: DeckEntry) => card.subtypes),
      new Filter((card: DeckEntry) => card.emojis),
    ] as const;

    for (const card of props.cards) {
      for (const filter of filters) {
        filter.visit(card);
      }
    }

    return filters;
  });

  return (
    <div class="deck-filters">
      {filters().map((filter) => (
        <>
          {filter.keys().map((entry: any) => (
            <FilterButton name={entry} filter={filter} />
          ))}
          <div class="filter-separator" />
        </>
      ))}
      {hasFilters() ? (
        <button onClick={clearFilters}>Clear Filters</button>
      ) : null}
    </div>
  );
}
