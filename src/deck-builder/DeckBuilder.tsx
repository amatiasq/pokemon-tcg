import { For, Show, createMemo } from 'solid-js';
import { DeckFilters } from '../filters/DeckFilters';
import { check } from '../filters/filter-store';
import './DeckBuilder.css';
import { DeckBuilderCard } from './DeckBuilderCard';
import { SelectableCard, allCards, newDeckCards } from './deck-builder-store';

const count = (list: SelectableCard[]) =>
  list.reduce((acc, card) => acc + card.selected, 0);

export function DeckBuilder() {
  const total = createMemo(() => count(newDeckCards()));
  const usedIds = createMemo(() => newDeckCards().map((x) => x.id));
  const filtered = createMemo(() => newDeckCards().filter(check));

  const unused = createMemo(() =>
    allCards
      .filter(check)
      .filter((x) => !usedIds().includes(x.id))
      .sort((a, b) =>
        a.supertype === b.supertype
          ? a.name.localeCompare(b.name)
          : a.supertype.localeCompare(b.supertype)
      )
  );

  return (
    <div class="deck-builder">
      <h1>Deck Builder {total() ? `(${total()})` : null}</h1>
      <Show when={filtered().length}>
        <ul>
          <For each={filtered()}>
            {(card) => (
              <li>
                <DeckBuilderCard card={card} />
              </li>
            )}
          </For>
        </ul>
      </Show>

      {/* <DeckBuilderCode usedIds={usedIds()} /> */}
      <DeckFilters cards={allCards} />

      <ul>
        <For each={unused()}>
          {(card) => (
            <li>
              <DeckBuilderCard card={card} />
            </li>
          )}
        </For>
      </ul>
    </div>
  );
}
