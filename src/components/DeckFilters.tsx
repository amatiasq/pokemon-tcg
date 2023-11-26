import { createMemo, createSignal } from 'solid-js';
import { DeckEntry } from 'types:Deck';
import {
  clearFilters,
  hasFilters,
  hideCardsWith,
  reset,
  showCardsWith,
} from '../stores/filters';
import { Filter } from '../tools/Filter';
import './DeckFilters.css';

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

function FilterButton<T extends string>(props: {
  name: T;
  filter: Filter<DeckEntry, T>;
}) {
  const FilterStatus = ['UNSET', 'INCLUDED', 'EXCLUDED'];
  type FilterStatus = (typeof FilterStatus)[number];

  const [status, setStatus] = createSignal<FilterStatus>('UNSET');
  const by = createMemo(() => props.filter.checker(props.name));

  return (
    <button class={`filter-${status().toLowerCase()}`} onClick={handleClick}>
      <span>
        {props.name === 'undefined' ? 'None' : props.name}
        {status() === 'INCLUDED' ? ' only' : ''}
      </span>
      <span>({props.filter.get(props.name)})</span>
    </button>
  );

  function handleClick() {
    switch (status()) {
      case 'UNSET':
        setStatus('INCLUDED');
        showCardsWith(by());
        break;
      case 'INCLUDED':
        setStatus('EXCLUDED');
        hideCardsWith(by());
        break;
      case 'EXCLUDED':
        setStatus('UNSET');
        reset(by());
        break;
    }
  }
}
