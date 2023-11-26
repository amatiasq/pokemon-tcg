import { createMemo, createSignal } from 'solid-js';
import { DeckEntry } from 'types:Deck';
import { Filter } from './Filter';
import { hideCardsWith, reset, showCardsWith } from './filter-store';

const FilterStatus = ['UNSET', 'INCLUDED', 'EXCLUDED'];
type FilterStatus = (typeof FilterStatus)[number];

export function FilterButton<T extends string>(props: {
  name: T;
  filter: Filter<DeckEntry, T>;
}) {
  const [status, setStatus] = createSignal<FilterStatus>('UNSET');
  const by = createMemo(() => props.filter.checker(props.name));

  return (
    <button class={`filter-${status().toLowerCase()}`} onClick={handleClick}>
      <span>{props.name === 'undefined' ? 'None' : props.name}</span>
      <span>{status() === 'INCLUDED' ? ' only' : ''}</span>
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
