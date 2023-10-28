import { DeckEntry } from 'types:Deck';
import decks from 'virtual:all-decks';
import {
  DeckBuild,
  setCardCount,
  useDeckBuilder,
} from '../hooks/useDeckBuilder';
import { CardData } from './CardData';
import './DeckBuilder.css';

const cards = countCards();
const count = (list: DeckBuild['cards']) =>
  list.reduce((acc, card) => acc + card.selected, 0);

export function DeckBuilder() {
  const deck = useDeckBuilder();
  const usedIds = deck.cards.map((x) => x.id);
  const unused = cards.filter((x) => !usedIds.includes(x.id));
  const total = count(deck.cards);

  return (
    <div className="deck-builder">
      <h1>Deck Builder {total ? `(${total})` : null}</h1>
      <ul>
        {deck.cards.map((card) => (
          <li key={card.key}>
            <DeckBuilderCard card={card} />
          </li>
        ))}
      </ul>
      <hr />
      <ul>
        {unused.map((card) => (
          <li key={card.key}>
            <DeckBuilderCard card={card} />
          </li>
        ))}
      </ul>
    </div>
  );
}

function DeckBuilderCard({
  card,
}: {
  card: DeckEntry & { key: string; selected?: number };
}) {
  const handleClick = card.selected ? undefined : () => setCardCount(card, 1);

  return (
    <CardData card={card} className="card-selector" onClick={handleClick}>
      <div className="input">
        <input
          type="number"
          min="0"
          max={card.count}
          value={card.selected ?? 0}
          onChange={(event) =>
            setCardCount(card, parseInt(event.target.value, 10))
          }
        />
        <span>/</span>
        <span>{card.count}</span>
      </div>

      <span className="used-amount">{card.selected ?? 0}</span>
    </CardData>
  );
}

function countCards() {
  const cards: Record<string, DeckEntry & { key: string }> = {};

  for (const deck of decks) {
    for (const card of deck.cards) {
      const key = `${card.id}-${card.emojis.join('-')}`;

      if (cards[key]) {
        cards[key].count += card.count;
      } else {
        cards[key] = { ...card, key };
      }
    }
  }

  return Object.values(cards);
}
