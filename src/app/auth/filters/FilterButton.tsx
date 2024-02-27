import { createEffect, createSignal } from "solid-js";
import { FilterStatus, store } from "../store";

export function FilterButton<T extends string>(props: {
  key: string;
  name: T;
  cardCount: number;
}) {
  const [status, setStatus] = createSignal<FilterStatus>("UNSET");

  createEffect(() => {
    store.setFilter({
      key: props.key,
      name: props.name,
      status: status(),
    });
  });

  return (
    <button class={`filter-${status().toLowerCase()}`} onClick={handleClick}>
      <span>{props.name === "undefined" ? "None" : props.name}</span>
      <span>{status() === "INCLUDED" ? " only" : ""}</span>
      <span>({props.cardCount})</span>
    </button>
  );

  function handleClick() {
    setStatus(
      (
        {
          UNSET: "INCLUDED",
          INCLUDED: "EXCLUDED",
          EXCLUDED: "UNSET",
        } as const
      )[status()]!
    );
  }
}
