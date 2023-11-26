import { JSX } from 'solid-js';
import { DeckEntry } from 'types:Deck';
import './CardData.css';
import { CardView } from './CardView';

export function CardData(props: {
  card: DeckEntry;
  large?: boolean;
  class?: string;
  children?: JSX.Element;
  onClick?: (event: MouseEvent) => void;
}) {
  return (
    <div class={`card-data ${props.class ?? ''}`} onClick={props.onClick}>
      <CardView card={props.card} large={props.large ?? false} />
      <code class="id">{props.card.id}</code>
      <span class="emojis">{props.card.emojis}</span>
      {props.card.count != 1 ? (
        <span class="amount">{props.card.count}</span>
      ) : null}
      {props.children}
    </div>
  );
}
