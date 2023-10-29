import { DeckEntry } from 'types:Deck';
import { toggleFilter, useCardFilters } from '../hooks/useCardFilters';
import './DeckStats.css';

export function DeckStats({ cards }: { cards: DeckEntry[] }) {
  const { isExcluded } = useCardFilters();

  const emojis: Record<string, number> = {};

  for (const card of cards) {
    for (const emoji of card.emojis) {
      emojis[emoji] = (emojis[emoji] || 0) + card.count;
    }
  }

  return (
    <ul class="deck-stats">
      {Object.entries(emojis).map(([emoji, count]) => (
        <li key={emoji} class={isExcluded(emoji) ? 'excluded' : ''}>
          <button onClick={() => toggleFilter(emoji)}>
            {emoji} ({count})
          </button>
        </li>
      ))}
    </ul>
  );
}
