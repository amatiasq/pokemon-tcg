import { createMemo, createSignal } from 'solid-js';
import { CardType, SuperType } from 'types:Card';
import { DeckEntry } from 'types:Deck';
import { hideCardsWith, reset, showCardsWith } from '../stores/filters';
import './DeckStats.css';

class Counter<T extends string> {
  #counts: Record<T, number> = {} as Record<T, number>;

  constructor(private readonly by: (item: DeckEntry, value: T) => boolean) {}

  visit(item: T) {
    this.#counts[item] = (this.#counts[item] || 0) + 1;
  }

  get(item: T) {
    return this.#counts[item];
  }

  keys() {
    return Object.keys(this.#counts) as T[];
  }

  entries() {
    return Object.entries(this.#counts) as [T, number][];
  }

  checker(value: T) {
    return (item: DeckEntry) => this.by(item, value);
  }
}

export function DeckStats(props: { cards: DeckEntry[] }) {
  const filters = createMemo(() => {
    const emojis = new Counter<string>((card, emoji) =>
      card.emojis.includes(emoji)
    );

    const cardTypes = new Counter<SuperType>(
      (card, type) => card.supertype === type
    );

    const types = new Counter<CardType>((card, type) =>
      card.types.includes(type)
    );

    for (const card of props.cards) {
      for (const emoji of card.emojis) {
        emojis.visit(emoji);
      }

      cardTypes.visit(card.supertype);
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
