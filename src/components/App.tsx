import { lucha } from '../mazos';
import './App.css';

const decks = await Promise.all([
  // force multiline
  lucha(),
]);

export function App() {
  return (
    <main>
      {decks.map((deck) => {
        return (
          <div className="deck" key={deck.name}>
            <h2>{deck.name}</h2>
            <ul className="card-list">
              {deck.cards.map((card) => (
                <li key={card.id}>
                  <div className="card">
                    {/* <span>{card.name}</span> */}
                    <img src={card.images.small} />
                    {card.count != 1 ? <span>{card.count}</span> : null}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        );
      })}
    </main>
  );
}
