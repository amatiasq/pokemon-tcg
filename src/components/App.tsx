import { ComponentChild } from 'preact';
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
      {/* <aside>
        <a href="/">Decks</a>
        <a href="/build">Build</a>
        <a href="/filters">Filters</a>
      </aside> */}

      <main>
        {/* <Router history={createHashHistory() as unknown as CustomHistory}> */}
        <Path path="/" component={<Decks />} />
        <Path path="/build" component={<DeckBuilder />} />
        {/* <Path path="/filters" component={<p>TODO</p>} /> */}
        {/* </Router> */}
      </main>

      <FocusedCard />
    </>
  );
}

function Path({ component }: { path: string; component: ComponentChild }) {
  return <>{component}</>;
}

function Decks() {
  return (
    <>
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
    </>
  );
}
