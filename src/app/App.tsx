import decks from 'virtual:all-decks';
import './App.css';
import { DeckView } from './DeckView';
import { FocusedCard } from './FocusedCard';

const decks2 = decks;
// const decks2 = [decks[0]];
// decks2[0].cards = decks2[0].cards.slice(0, 1);

export function App() {
  return (
    <>
      <main>
        {decks2.map((deck) => (
          <DeckView key={deck.name} deck={deck} />
        ))}
      </main>

      <FocusedCard />
    </>
  );
}
