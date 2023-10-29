import decks from 'virtual:all-decks';
import { setFocusedCard } from '../hooks/useFocusedCard';
import './App.css';
import { CardData } from './CardData';
import { DeckBuilder } from './DeckBuilder';
import { DeckView } from './DeckView';
import { FocusedCard } from './FocusedCard';

export function App() {
  return (
    <>
      <main>
        {decks.map((deck) => (
          <DeckView key={deck.name} deck={deck}>
            {(card) => (
              <CardData
                card={card}
                onClick={(event) => {
                  const target = event.target as HTMLDivElement;
                  setFocusedCard(card, target.closest('.card-data')!);
                }}
              />
            )}
          </DeckView>
        ))}
        <DeckBuilder />
      </main>

      <FocusedCard />
    </>
  );
}
