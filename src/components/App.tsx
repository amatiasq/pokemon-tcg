import { createHashHistory } from 'history';
import Router, { CustomHistory, Route } from 'preact-router';
import decks from 'virtual:all-decks';
import { setFocusedCard } from '../hooks/useFocusedCard';
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
        <Router history={createHashHistory() as unknown as CustomHistory}>
          <Route path="/" component={Decks} />
          <Route path="/deck/:deckName" component={SingleDeck} />
          <Route path="/build" component={DeckBuilder} />
          <Route path="/filters" component={() => <p>TODO</p>} />
        </Router>
      </main>

      <FocusedCard />
    </>
  );
}

function SingleDeck({ deckName }: { deckName: string }) {
  const deck = decks.find((deck) => deck.name === deckName);
  if (!deck) return <>Deck not found: {deckName}</>;
  return <ShowDeck deck={deck} />;
}

function Decks() {
  return <>Hi</>;
}

function ShowDeck({ deck }: { deck: (typeof decks)[number] }) {
  return (
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
  );
}
