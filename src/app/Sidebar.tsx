import { A } from '@solidjs/router';
import { For } from 'solid-js';
import decks from 'virtual:all-decks';
import HamburgerButton from 'web-component://components.amatiasq.com/hamburger-button.js';
import './Sidebar.css';

export function Sidebar() {
  return (
    <aside>
      <nav>
        <A href="/build">Build</A>
        <A href="/filters">Filters</A>

        <details open>
          <summary>Decks</summary>
          <div class="deck-list">
            <For each={decks}>
              {(deck) => <A href={`/deck/${deck.name}`}>{deck.name}</A>}
            </For>
          </div>
        </details>
      </nav>

      <HamburgerButton />
    </aside>
  );
}
