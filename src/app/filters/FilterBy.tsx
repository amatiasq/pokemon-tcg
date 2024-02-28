import { For, createMemo } from "solid-js";
import { DeckEntry } from "types:Deck";
import { FilterButton } from "./FilterButton";

export function FilterBy(props: {
  cards: DeckEntry[];
  children: (card: DeckEntry) => string | string[];
}) {
  const filter = new Filter(props.children);

  const states = createMemo(() => {
    filter.reset();

    for (const card of props.cards) {
      filter.visit(card, card.count);
    }

    return filter.keys();
  });

  return (
    <div class="row">
      <For each={states()}>
        {(entry) => (
          <FilterButton
            key={props.children.toString()}
            name={entry}
            cardCount={filter.get(entry)}
          />
        )}
      </For>
    </div>
  );
}

class Filter<TTarget, TNeedle extends string> {
  #counts: Record<TNeedle, number> = {} as Record<TNeedle, number>;
  #getter: (item: TTarget) => TNeedle | TNeedle[];

  constructor(getter: (item: TTarget) => TNeedle | TNeedle[]) {
    this.#getter = getter;
  }

  visit(target: TTarget, amount = 1) {
    const value = this.#getter(target);

    if (Array.isArray(value)) {
      for (const item of value) {
        this.#increment(item, amount);
      }
    } else {
      this.#increment(value, amount);
    }
  }

  #increment(needle: TNeedle, amount = 1) {
    this.#counts[needle] = (this.#counts[needle] || 0) + amount;
  }

  get(needle: TNeedle) {
    return this.#counts[needle];
  }

  keys() {
    return Object.keys(this.#counts) as TNeedle[];
  }

  checker(needle: TNeedle) {
    return (target: TTarget) => {
      const value = this.#getter(target);

      if (Array.isArray(value)) {
        return value.includes(needle as any);
      } else {
        return value === needle;
      }
    };
  }

  reset() {
    this.#counts = {} as Record<TNeedle, number>;
  }
}
