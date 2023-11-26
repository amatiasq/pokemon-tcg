import { SuperType } from 'types:Card';
import { DeckEntry } from 'types:Deck';
import {
  cardTypeFilter,
  isEmojiExcluded,
  setCardTypeFilter,
  toggleEmojiFilter,
} from '../stores/filters';
import './DeckStats.css';

export function DeckStats({ cards }: { cards: DeckEntry[] }) {
  const emojis: Record<string, number> = {};
  const cardTypes: Partial<Record<SuperType, number>> = {};

  for (const card of cards) {
    for (const emoji of card.emojis) {
      emojis[emoji] = (emojis[emoji] || 0) + card.count;
    }

    const type = card.supertype;
    cardTypes[type] = card.count + (cardTypes[type] || 0);
  }

  return (
    <>
      <FilterList
        filters={Object.entries(cardTypes) as [SuperType, number][]}
        isActive={(x) => x === cardTypeFilter()}
        onClick={setCardTypeFilter}
      />
      <FilterList
        filters={Object.entries(emojis)}
        isActive={isEmojiExcluded}
        onClick={toggleEmojiFilter}
      />
    </>
  );
}

function FilterList<T extends string>({
  filters,
  isActive,
  onClick,
}: {
  filters: [T, number][];
  isActive: (filter: T) => boolean;
  onClick: (filter: T) => void;
}) {
  if (!filters.length) {
    return null;
  }

  return (
    <ul class="deck-stats">
      {filters.map(([filter, count]) => (
        <li class={isActive(filter) ? 'excluded' : ''}>
          <button onClick={() => onClick(filter)}>
            <span>{filter}</span>
            <span>({count})</span>
          </button>
        </li>
      ))}
    </ul>
  );
}
