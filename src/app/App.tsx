import { Route, Router, Routes } from '@solidjs/router';
import './App.css';
import { Sidebar } from './Sidebar';
import { AuthRoute } from './auth/AuthRoute';
import { FocusedCard } from './auth/focused-card/FocusedCard';

export function App() {
  return (
    <Router>
      <Sidebar />

      <main>
        <Routes>
          {/* <Route path="/" component={() => <></>} /> */}
          {/* <Route path="/deck/:deckName" component={SingleDeck} /> */}
          {/* <Route path="/deck/:deckName/print" component={PrintSimpleDeck} /> */}
          {/* <AuthRoute path="/build" component={DeckBuilder} /> */}
          <AuthRoute path="/" component={SearchCards} />
          <Route path="/filters" component={() => <p>TODO</p>} />
        </Routes>
      </main>

      <FocusedCard />
    </Router>
  );
}

function SearchCards() {
  return <p>TODO</p>;

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
