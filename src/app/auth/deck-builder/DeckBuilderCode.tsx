import { Show, createMemo } from 'solid-js';
import { newDeckCards } from './deck-builder-store';

export function DeckBuilderCode(props: { usedIds: string[] }) {
  const code = createMemo(() => {
    const maxLength = Math.max(...props.usedIds.map((x) => x.length));

    return newDeckCards()
      .map((card) => {
        const id = card.id.padEnd(maxLength, ' ');
        const amount =
          card.selected === 1 ? '   ' : `x${card.selected}`.padEnd(3, ' ');
        return `${id} ${amount}  ${card.name} ${card.emojis}`;
      })
      .join('\n');
  });

  return (
    <Show when={code()}>
      <textarea
        rows={newDeckCards().length}
        value={code()}
        readOnly
        onClick={() => navigator.clipboard.writeText(code())}
      />
    </Show>
  );
}
