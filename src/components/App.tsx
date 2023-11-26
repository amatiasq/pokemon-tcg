import { Route, Router, Routes, useParams } from '@solidjs/router';
import { createMemo } from 'solid-js';
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
    <Router>
      <Sidebar />

      <main>
        <Routes>
          <Route path="/" component={() => <></>} />
          <Route path="/deck/:deckName" component={SingleDeck} />
          <Route path="/build" component={DeckBuilder} />
          <Route path="/filters" component={() => <p>TODO</p>} />
        </Routes>
      </main>

      <FocusedCard />
    </Router>
  );
}

function SingleDeck() {
  const params = useParams();
  const deck = createMemo(() =>
    decks.find((deck) => deck.name === params.deckName)
  );

  return (
    <>
      {deck() ? (
        <ShowDeck deck={deck()!} />
      ) : (
        <p>Deck not found: {params.deckName}</p>
      )}
    </>
  );
}

function ShowDeck(props: { deck: (typeof decks)[number] }) {
  return (
    <DeckView deck={props.deck}>
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
