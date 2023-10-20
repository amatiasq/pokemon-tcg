import decks from 'virtual:all-decks';
import './App.css';
import { Deck } from './data/Deck';
import { getFocusNode } from './focus';

// const FocusedCard = createContext(null);

export function App() {
  return (
    <>
      <main>
        {decks.map((deck) => (
          <DeckView key={deck.name} deck={deck} />
        ))}
      </main>
    </>
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
    <div className="card" onClick={onClick}>
      <img src={card.images.small} />
      {card.count != 1 ? <span>{card.count}</span> : null}
    </div>
  );

  function onClick(event: React.MouseEvent) {
    const card = (event.target as HTMLElement).closest('.card');
    if (!card) return;

    const bounds = card.getBoundingClientRect();
    const copy = card.cloneNode(true) as HTMLElement;

    console.log(bounds);

    copy.setAttribute(
      'style',
      `
        position: fixed;
        top: ${bounds.top}px;
        left: ${bounds.left}px;
        width: ${bounds.width}px;
        height: ${bounds.height}px;
      `
    );

    getFocusNode().appendChild(copy);

    setTimeout(() => {
      copy.setAttribute(
        'style',
        `
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          transition: all 0.2s;
        `
      );
    }, 10);
  }
}
