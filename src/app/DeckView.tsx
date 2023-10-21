import { Deck } from '../types/Deck';
import { CardView } from './CardView';
import './DeckView.css';

export function DeckView({ deck }: { deck: Deck }) {
  const total = deck.cards.reduce((acc, card) => acc + card.count, 0);

  return (
    <details className="deck" key={deck.name}>
      <summary>
        <h2>
          {deck.name} <small>({total})</small>
        </h2>
      </summary>
      <ul className="card-list">
        {deck.cards.map((card) => (
          <li key={card.id}>
            <CardView card={card} />
          </li>
        ))}
      </ul>
    </details>
  );
}
