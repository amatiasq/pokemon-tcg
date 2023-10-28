import decks from 'virtual:all-decks';
import { useFocusedCard } from '../hooks/useFocusedCard';
import { DeckEntry } from '../types/Deck';
import './App.css';
import { CardData } from './CardData';
import { DeckView } from './DeckView';
import { FocusedCard } from './FocusedCard';

const decks2 = decks;
// const decks2 = [decks[0]];
// decks2[0].cards = decks2[0].cards.slice(0, 1);

export function App() {
  const setFocusedCard = useFocusedCard((state) => state.set);

  return (
    <>
      <main>
        {decks2.map((deck) => (
          <DeckView key={deck.name} deck={deck}>
            {(card) => (
              <CardData card={card} onClick={onCardClick.bind(null, card)} />
            )}
          </DeckView>
        ))}
      </main>

      <FocusedCard />
    </>
  );

  function onCardClick(
    card: DeckEntry,
    event: React.MouseEvent<HTMLDivElement>
  ) {
    const target = event.target as HTMLDivElement;
    const bounds = target.closest('.card-data')!.getBoundingClientRect();
    const { top, left, width, height } = bounds;
    console.log(bounds);

    setFocusedCard(card, { top, left, width, height });
  }
}
