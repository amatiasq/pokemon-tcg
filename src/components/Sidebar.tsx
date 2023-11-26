import decks from 'virtual:all-decks';
import HamburgerButton from 'web-component://components.amatiasq.com/hamburger-button.js';
import './Sidebar.css';

export function Sidebar() {
  return (
    <aside>
      <nav>
        <a href="/build">Build</a>
        <a href="/filters">Filters</a>

        <details open>
          <summary>Decks</summary>
          <div class="deck-list">
            {decks.map((deck) => (
              <a href={`/deck/${deck.name}`}>{deck.name}</a>
            ))}
          </div>
        </details>
      </nav>

      <HamburgerButton />
    </aside>
  );
}
``;
