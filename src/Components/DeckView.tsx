import { Deck, DeckEntry } from 'types:Deck';
import './DeckView.css';

export function DeckView({
  deck,
  children,
}: {
  deck: Deck;
  children: (card: DeckEntry) => JSX.Element;
}) {
  const total = deck.cards.reduce((acc, card) => acc + card.count, 0);

  return (
    <details className="deck" key={deck.name}>
      <summary>
        <h2>
          {deck.name} <small>({total})</small>
        </h2>
      </summary>

      {/* <DeckStats cards={deck.cards} /> */}

      <ul className="card-list">
        {deck.cards.map((card) => (
          <li key={card.id}>{children(card)}</li>
        ))}
      </ul>
    </details>
  );
}
