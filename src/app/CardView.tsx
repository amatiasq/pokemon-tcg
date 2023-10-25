import { useEffect, useState } from 'react';
import { Card } from '../types/Card';
import { CardEffect } from './CardEffect';
import './CardView.css';

const hasEffects = `${document.location}`.includes('effects');
const MaybeEffects = hasEffects ? CardEffect : 'div';

export function CardView({ card, large }: { card: Card; large?: boolean }) {
  return (
    <MaybeEffects className="card">
      {large ? (
        <ScaledImage small={card.images.small} large={card.images.large} />
      ) : (
        <img src={card.images.small} />
      )}
    </MaybeEffects>
  );
}

function ScaledImage({ small, large }: { small: string; large: string }) {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.onload = () => setIsReady(true);
    img.src = large;
  }, [large]);

  return <img src={isReady ? large : small} />;
}
