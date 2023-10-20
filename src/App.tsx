import decks from 'virtual:all-decks';
import './App.css';
import { Deck } from './data/Deck';

export function App() {
  return (
    <main>
      {decks.map((deck) => (
        <DeckView key={deck.name} deck={deck} />
      ))}
    </main>
  );
}

function DeckView({ deck }: { deck: Deck }) {
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

function CardView({ card }: { card: Deck['cards'][number] }) {
  return (
    <div className="card">
      <img src={card.images.small} />
      {card.count != 1 ? <span>{card.count}</span> : null}
    </div>
  );
}
