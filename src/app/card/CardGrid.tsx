import { For } from 'solid-js';
import { Card } from '../../db/Card';
import './CardGrid.css';
import { CardView } from './CardView';

export function CardGrid(props: {
  cards: Card[];
  onSelect: (...results: Card[]) => void;
}) {
  return (
    <ul class="card-grid">
      <For each={props.cards}>
        {(card) => (
          <li>
            <CardView card={card} onClick={() => props.onSelect(card)} />
          </li>
        )}
      </For>
    </ul>
  );
}
