import decks from 'virtual:all-decks';
import './Sidebar.css';

export function Sidebar() {
  return (
    <aside>
      <nav>
        <a href="/build">Build</a>
        <a href="/filters">Filters</a>

        <details>
          <summary>Decks</summary>
          <div>
            {decks.map((deck) => (
              <a href={`/deck/${deck.name}`}>{deck.name}</a>
            ))}
          </div>
        </details>
      </nav>

      <hamburger-button>
        <script
          type="module"
          src="https://components.amatiasq.com/hamburger-button.js"
          defer
        />
      </hamburger-button>
    </aside>
  );
}
