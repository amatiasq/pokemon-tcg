import { getFocusNode } from '../focus';
import { Deck } from '../types/Deck';
import './CardView.css';

export function CardView({ card }: { card: Deck['cards'][number] }) {
  return (
    <div className="card" onClick={onClick}>
      <img src={card.images.small} />
      <code className="id">{card.id}</code>
      <span className="emojis">{card.emojis}</span>
      {card.count != 1 ? <span className="amount">{card.count}</span> : null}
    </div>
  );

  function onClick(event: React.MouseEvent) {
    const card = (event.target as HTMLElement).closest('.card');
    if (!card) return;

    const bounds = card.getBoundingClientRect();
    const copy = card.cloneNode(true) as HTMLElement;

    console.log(bounds);

    copy.setAttribute(
      'style',
      `
        position: fixed;
        top: ${bounds.top}px;
        left: ${bounds.left}px;
        width: ${bounds.width}px;
        height: ${bounds.height}px;
      `
    );

    getFocusNode().appendChild(copy);

    setTimeout(() => {
      copy.setAttribute(
        'style',
        `
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          transition: all 0.2s;
        `
      );
    }, 10);
  }
}
