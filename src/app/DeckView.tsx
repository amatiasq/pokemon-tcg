import { For, JSX, createMemo } from "solid-js";
import { Deck, DeckEntry } from "types:Deck";
import { DeckFilters, filterCards } from "../filters/DeckFilters";
import "./DeckView.css";

export function DeckView(props: {
  deck: Deck;
  children: (card: DeckEntry) => JSX.Element;
}) {
  const count = (list: DeckEntry[]) =>
    list.reduce((acc, card) => acc + card.count, 0);

  const cards = createMemo(() => filterCards(props.deck.cards));
  const total = createMemo(() => count(props.deck.cards));
  const visible = createMemo(() => count(cards()));

  return (
    <div class="deck">
      <h2>
        {props.deck.name}{" "}
        <small>
          ({total() === visible() ? `${total()}` : ` ${visible()}/${total()}`}{" "}
          cards)
        </small>
      </h2>

      <DeckFilters cards={props.deck.cards} />

      <ul class="card-list">
        <For each={cards()}>{(card) => <li>{props.children(card)}</li>}</For>
      </ul>
    </div>
  );
}
