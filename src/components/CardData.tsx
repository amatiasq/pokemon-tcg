import { ComponentChildren } from 'preact';
import { DeckEntry } from 'types:Deck';
import './CardData.css';
import { CardView } from './CardView';

export interface CardViewProps {
  card: DeckEntry;
  large?: boolean;
  class?: string;
  children?: ComponentChildren;
  onClick?: (event: MouseEvent) => void;
}

export function CardData({
  card,
  large = false,
  onClick,
  children,
  ...props
}: CardViewProps) {
  return (
    <div class={`card-data ${props.class ?? ''}`} onClick={onClick}>
      <CardView card={card} large={large} />
      <code class="id">{card.id}</code>
      {/* <span class="emojis">{card.emojis}</span> */}
      {card.count != 1 ? <span class="amount">{card.count}</span> : null}
      {children}
    </div>
  );
}
