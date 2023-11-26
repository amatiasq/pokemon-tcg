import { createMemo } from 'solid-js';
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
      {hack()(filters).map((filter) => (
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
