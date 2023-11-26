import { Route, Router, Routes, useParams } from '@solidjs/router';
import decks from 'virtual:all-decks';
import { setFocusedCard } from '../stores/focusedCard';
import './App.css';
import { CardData } from './CardData';
import { DeckBuilder } from './DeckBuilder';
import { DeckView } from './DeckView';
import { FocusedCard } from './FocusedCard';
import { Sidebar } from './Sidebar';

export function App() {
  return (
    <>
      <Sidebar />

      <main>
        <Router>
          <Routes>
            <Route path="/" component={() => <></>} />
            <Route path="/deck/:deckName" component={SingleDeck} />
            <Route path="/build" component={DeckBuilder} />
            <Route path="/filters" component={() => <p>TODO</p>} />
          </Routes>
        </Router>
      </main>

      <FocusedCard />
    </>
  );
}

function SingleDeck() {
  const { deckName } = useParams();
  const deck = decks.find((deck) => deck.name === deckName);
  if (!deck) return <>Deck not found: {deckName}</>;
  return <ShowDeck deck={deck} />;
}

function ShowDeck({ deck }: { deck: (typeof decks)[number] }) {
  return (
    <DeckView deck={deck}>
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
  );
}
