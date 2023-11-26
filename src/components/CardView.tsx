import { ApiCard } from 'types:Card';
// import { CardEffect } from './CardEffect';
import { createSignal } from 'solid-js';
import './CardView.css';

// const hasEffects = `${document.location}`.includes('effects');
// const MaybeEffects = hasEffects ? CardEffect : 'div';
export function CardView(props: { card: ApiCard; large?: boolean }) {
  return (
    <div class="card">
      {props.large ? (
        <ScaledImage
          small={props.card.images.small}
          large={props.card.images.large}
        />
      ) : (
        <img src={props.card.images.small} />
      )}
    </div>
  );
}

function ScaledImage({ small, large }: { small: string; large: string }) {
  const [isReady, setIsReady] = createSignal(false);

  const img = new Image();
  img.onload = () => setIsReady(true);
  img.src = large;

  return <img src={isReady() ? large : small} />;
}
