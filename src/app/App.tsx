import { useDispatch } from 'react-redux';
import decks from 'virtual:all-decks';
import { DeckEntry } from '../types/Deck';
import './App.css';
import { CardView } from './CardView';
import { DeckView } from './DeckView';
import { FocusedCard } from './FocusedCard';
import { set as setFocusedCard } from './FocusedCard.slice';

const decks2 = decks;
// const decks2 = [decks[0]];
// decks2[0].cards = decks2[0].cards.slice(0, 1);

export function App() {
  const dispatch = useDispatch();

  return (
    <>
      <main>
        {decks2.map((deck) => (
          <DeckView key={deck.name} deck={deck}>
            {(card) => (
              <CardView card={card} onClick={onCardClick.bind(null, card)} />
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
    const bounds = target.closest('.card')!.getBoundingClientRect();
    const { top, left, width, height } = bounds;
    console.log(bounds);

    dispatch(
      setFocusedCard({
        card,
        bounds: { top, left, width, height },
      })
    );
  }
}
