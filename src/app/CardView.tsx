import { PropsWithChildren, createRef } from 'react';
import { useDispatch } from 'react-redux';
import { ScaledImage } from '../components/ScaledImage';
import { DeckEntry } from '../types/Deck';
import './CardView.css';
import { set as setFocusedCard } from './focused-card';

export function CardView({
  card,
  large = false,
}: {
  card: DeckEntry;
  large?: boolean;
}) {
  const dispatch = useDispatch();

  return (
    <CardEffect
      className="card"
      onClick={(event: React.MouseEvent<HTMLDivElement>) => {
        const target = event.target as HTMLDivElement;
        const { top, left, width, height } = target
          .closest('.card')!
          .getBoundingClientRect();

        dispatch(
          setFocusedCard({
            card,
            bounds: { top, left, width, height },
          })
        );
      }}
    >
      {large ? (
        <ScaledImage small={card.images.small} large={card.images.large} />
      ) : (
        <img src={card.images.small} />
      )}
      <code className="id">{card.id}</code>
      <span className="emojis">{card.emojis}</span>
      {card.count != 1 ? <span className="amount">{card.count}</span> : null}
    </CardEffect>
  );
}

interface CardEffectProps {
  className: string;
  onClick: (event: React.MouseEvent<HTMLDivElement>) => void;
}

function CardEffect(props: PropsWithChildren<CardEffectProps>) {
  const ref = createRef<HTMLDivElement>();

  function handleMouseMove(event: React.MouseEvent<HTMLDivElement>) {
    handlePointerMove(event, event.clientX, event.clientY);
  }

  function handleTouchMove(event: React.TouchEvent<HTMLDivElement>) {
    handlePointerMove(
      event,
      event.touches[0].clientX,
      event.touches[0].clientY
    );
  }

  function handlePointerMove(
    event: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>,
    pointerX: number,
    pointerY: number
  ) {
    event.preventDefault();

    const card = ref.current!;
    const bounds = card.getBoundingClientRect();

    const h = bounds.height;
    const w = bounds.width;
    const x = pointerX - bounds.x;
    const y = pointerY - bounds.y;

    const px = Math.abs(Math.floor((100 / w) * x) - 100);
    const py = Math.abs(Math.floor((100 / h) * y) - 100);
    const pa = 50 - px + (50 - py);

    // math for gradient / background positions
    const lp = 50 + (px - 50) / 1.5;
    const tp = 50 + (py - 50) / 1.5;
    const px_spark = 50 + (px - 50) / 7;
    const py_spark = 50 + (py - 50) / 7;
    const p_opc = 20 + Math.abs(pa) * 1.5;
    const ty = ((tp - 50) / 2) * -1;
    const tx = ((lp - 50) / 1.5) * 0.5;

    card.style.setProperty('--rotate-x', `${ty}deg`);
    card.style.setProperty('--rotate-y', `${tx}deg`);
    card.style.setProperty('--gradient-position', `${lp}% ${tp}%`);
    card.style.setProperty('--sparkle-position', `${px_spark}% ${py_spark}%`);
    card.style.setProperty('--sparkle-opacity', `${p_opc / 100}`);
  }

  function reset() {
    const card = ref.current!;
    card.style.setProperty('--rotate-x', `0deg`);
    card.style.setProperty('--rotate-y', `0deg`);
  }

  return (
    <div
      ref={ref}
      className={props.className}
      onClick={props.onClick}
      onMouseMove={handleMouseMove}
      onTouchMove={handleTouchMove}
      onMouseOut={reset}
      onTouchEnd={reset}
      onTouchCancel={reset}
    >
      <div className="card-effect">{props.children}</div>
    </div>
  );
}
