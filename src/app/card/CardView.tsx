// import { CardEffect } from './CardEffect';
import { Show, createSignal } from 'solid-js';
import { Card } from '../../db/Card';
import './CardView.css';

// const hasEffects = `${document.location}`.includes('effects');
// const MaybeEffects = hasEffects ? CardEffect : 'div';
export function CardView(props: {
  card: Card;
  large?: boolean;
  onClick?: () => void;
}) {
  return (
    <div
      class={`card ${props.large ? 'is-large' : ''}`}
      data-id={props.card.id}
      onClick={props.onClick}
    >
      <Show when={props.large} fallback={<img src={props.card.img_thumb} />}>
        <ScaledImage
          small={props.card.img_thumb}
          large={props.card.img_large}
        />
      </Show>
    </div>
  );
}

function ScaledImage(props: { small: string; large: string }) {
  const [isReady, setIsReady] = createSignal(false);

  const img = new Image();
  img.onload = () => setIsReady(true);
  img.src = props.large;

  return <img src={isReady() ? props.large : props.small} />;
}
