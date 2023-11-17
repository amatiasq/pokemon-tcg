import { createHashHistory } from 'history';
import { ComponentChild } from 'preact';
import Router, { CustomHistory } from 'preact-router';
import decks from 'virtual:all-decks';
import { setFocusedCard } from '../hooks/useFocusedCard';
import './App.css';
import { CardData } from './CardData';
import { DeckBuilder } from './DeckBuilder';
import { DeckView } from './DeckView';
import { FocusedCard } from './FocusedCard';
import { Sidebar } from './Sidebar';

export function App() {
  console.log(decks);
  const deck = decks.filter(
    (x) => x.name === 'TorneoMati' // ||
    // x.name === 'TorneoFacu'
  )!;

  return (
    <>
      {deck.map((deck) => (
        <>
          <table>
            <thead>
              <tr>
                <th>QTY</th>
                <th>ID</th>
                <th>Name</th>
              </tr>
            </thead>
            <tbody>
              {deck.cards.map((card) => (
                <tr key={card.id}>
                  <td>{card.count}x</td>
                  <td>{card.id}</td>
                  <td>{card.name}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <ul class="aaa">
            {deck.cards.map((card) => (
              <li key={card.id} className="potato">
                <CardData card={card} />
              </li>
            ))}
          </ul>
        </>
      ))}
    </>
  );
}

export function App2() {
  return (
    <>
      <Sidebar />

      <main>
        <Router history={createHashHistory() as unknown as CustomHistory}>
          <Path path="/" component={<Decks />} />
          <Path path="/build" component={<DeckBuilder />} />
          <Path path="/filters" component={<></>} />
        </Router>
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
