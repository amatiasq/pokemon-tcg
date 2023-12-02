import { Show } from "solid-js";
import { DeckEntry } from "types:Deck";
import { store } from "../store";
import "./DeckFilters.css";
import { FilterBy } from "./FilterBy";
import { SearchCard } from "./SearchCard";

export function filterCards(cards: DeckEntry[]) {
  const filters = store.useFilters();

  const include = filters
    .filter((filter) => filter.status === "INCLUDED")
    .map((filter) => eval(filter.name));

  const exclude = filters
    .filter((filter) => filter.status === "EXCLUDED")
    .map((filter) => eval(filter.name));

  return cards.filter(
    (card) =>
      include.every((filter) => filter(card)) &&
      exclude.every((filter) => !filter(card))
  );
}

export function DeckFilters(props: { cards: DeckEntry[] }) {
  return (
    <>
      <div class="deck-filters">
        <FilterBy cards={props.cards}>
          {(card: DeckEntry) => card.supertype}
        </FilterBy>

        <FilterBy cards={props.cards}>
          {(card: DeckEntry) => card.types}
        </FilterBy>

        <FilterBy cards={props.cards}>
          {(card: DeckEntry) => card.subtypes}
        </FilterBy>

        <FilterBy cards={props.cards}>
          {(card: DeckEntry) => card.emojis}
        </FilterBy>

        <Show when={store.hasFilters()}>
          <button onClick={store.clearFilters}>Clear Filters</button>
        </Show>
      </div>

      <SearchCard />
    </>
  );
}
