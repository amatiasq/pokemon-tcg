import decks from 'virtual:all-decks';
import { DeckView } from './DeckView';
import { FocusedCard } from './FocusedCard';

export function App() {
  return (
    <>
      <main>
        {decks.map((deck) => (
          <DeckView key={deck.name} deck={deck} />
        ))}
      </main>

      <FocusedCard />
    </>
  );
}
