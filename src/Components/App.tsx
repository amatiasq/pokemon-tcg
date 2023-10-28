import { DeckEntry } from 'types:Deck';
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
              <CardData card={card} onClick={onCardClick.bind(null, card)} />
            )}
          </DeckView>
        ))}
        <DeckBuilder />
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
