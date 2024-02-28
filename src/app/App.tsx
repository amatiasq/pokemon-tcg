import { Route, Router, Routes } from '@solidjs/router';
import './App.css';
import { Sidebar } from './Sidebar';
import { AuthRoute } from './auth/AuthRoute';
// import { FocusedCard } from './focused-card/FocusedCard';
import { Login } from './auth/Login';
import { DeckBuilder } from './deck-builder/DeckBuilder';

export function App() {
  return (
    <Router>
      <h1>Card Search</h1>
      <Sidebar />

      <main>
        <Routes>
          {/* <Route path="/" component={() => <></>} /> */}
          {/* <Route path="/deck/:deckName" component={SingleDeck} /> */}
          {/* <Route path="/deck/:deckName/print" component={PrintSimpleDeck} /> */}
          {/* <AuthRoute path="/build" component={DeckBuilder} /> */}
          <Route path="/login" component={Login} />
          <Route path="/filters" component={() => <p>TODO</p>} />
          <AuthRoute path="/" component={DeckBuilder} />
          {/* <Route path="/filters" component={() => <p>TODO</p>} /> */}
        </Routes>
      </main>

      {/* <FocusedCard /> */}
    </Router>
  );
}

// function PrintSimpleDeck() {
//   const params = useParams();

//   const deck = createMemo(() =>
//     decks.find((deck) => encodeURIComponent(deck.name) === params.deckName)
//   );

//   return (
//     <Show when={deck()} fallback={<p>Deck not found: {params.deckName}</p>}>
//       <PrintDeck deck={deck()!} />
//     </Show>
//   );
// }

// function SingleDeck() {
//   supabase.from('decks').
//   const params = useParams();

//   const deck = createMemo(() =>
//     decks.find((deck) => encodeURIComponent(deck.name) === params.deckName)
//   );

//   return (
//     <Show when={deck()} fallback={<p>Deck not found: {params.deckName}</p>}>
//       <DeckView deck={deck()!}>
//         {(card) => (
//           <CardData
//             card={card}
//             onClick={(event) => {
//               const target = event.target as HTMLDivElement;
//               store.setFocusCard(card, target.closest('.card-data')!);
//             }}
//           />
//         )}
//       </DeckView>
//     </Show>
//   );
// }
