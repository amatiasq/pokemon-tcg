import { DeckEntry } from '../types/Deck';
import './DeckStats.css';

export function DeckStats({ cards }: { cards: DeckEntry[] }) {
  const emojis: Record<string, number> = {};

  for (const card of cards) {
    for (const emoji of card.emojis) {
      emojis[emoji] = (emojis[emoji] || 0) + card.count;
    }
  }

  return (
    <ul className="deck-stats">
      {Object.entries(emojis).map(([emoji, count]) => (
        <li key={emoji}>
          <button onClick={hideEmoji(emoji)}>
            {emoji} ({count})
          </button>
        </li>
      ))}
    </ul>
  );

  function hideEmoji(emoji: string) {
    console.log(emoji);
    return undefined;
  }
}
