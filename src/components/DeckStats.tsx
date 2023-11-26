import { createMemo, createSignal } from 'solid-js';
import { CardType, SuperType } from 'types:Card';
import { DeckEntry } from 'types:Deck';
import { hideCardsWith, reset, showCardsWith } from '../stores/filters';
import './DeckStats.css';

class Counter<T extends string> {
  #counts: Record<T, number> = {} as Record<T, number>;

  constructor(private readonly getter: (item: DeckEntry) => T | T[]) {}

  visit(card: DeckEntry) {
    const value = this.getter(card);

    if (Array.isArray(value)) {
      for (const item of value) {
        this.#increment(item);
      }
    } else {
      this.#increment(value);
    }
  }

  #increment(item: T) {
    const key = this.#clean(item);
    this.#counts[key] = (this.#counts[key] || 0) + 1;
  }

  get(item: T) {
    const key = this.#clean(item);
    return this.#counts[key];
  }

  keys() {
    return Object.keys(this.#counts) as T[];
  }

  checker(needle: T) {
    const key = needle === 'Unknown' ? undefined : needle;

    return (item: DeckEntry) => {
      const value = this.getter(item);

      if (Array.isArray(value)) {
        return value.includes(key as any);
      } else {
        return value === key;
      }
    };
  }

  reset() {
    this.#counts = {} as Record<T, number>;
  }

  #clean(key: T) {
    return key ?? 'Unknown';
  }
}

export function DeckStats(props: { cards: DeckEntry[] }) {
  const filters = createMemo(() => {
    const emojis = new Counter<string>((card) => card.emojis);
    const cardTypes = new Counter<SuperType>((card) => card.supertype);
    const subtypes = new Counter<CardType>((card) => card.subtypes);
    const types = new Counter<CardType>((card) => card.types);

    for (const card of props.cards) {
      emojis.visit(card);
      cardTypes.visit(card);
      subtypes.visit(card);
      types.visit(card);
    }

    return [cardTypes, types, emojis] as const;
  });

  return (
    <>
      {filters().map((filter) => (
        <>
          {filter.keys().length > 0 ? (
            <ul class="deck-stats">
              {filter.keys().map((entry: any) => (
                <Filter name={entry} filter={filter} />
              ))}
            </ul>
          ) : null}
        </>
      ))}
    </>
  );
}

function Filter<T extends string>(props: {
  name: T;
  filter: Counter<T>;
  // count: number;
  // by: (x: DeckEntry) => boolean;
}) {
  const FilterStatus = ['UNSET', 'INCLUDED', 'EXCLUDED'];
  type FilterStatus = (typeof FilterStatus)[number];

  const [status, setStatus] = createSignal<FilterStatus>('UNSET');
  const by = createMemo(() => props.filter.checker(props.name));

  return (
    <li class={`filter-${status().toLowerCase()}`}>
      <button onClick={handleClick}>
        <span>
          {props.name}
          {status() === 'INCLUDED' ? ' only' : ''}
        </span>
        <span>({props.filter.get(props.name)})</span>
      </button>
    </li>
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
