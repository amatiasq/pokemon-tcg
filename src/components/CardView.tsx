import { Card } from '../data/Card';
import './CardView.css';

export function CardView({ card }: { card: Card }) {
  return (
    <div className="card">
      {/* <span>{card.name}</span> */}
      <img src={card.images.small} />
    </div>
  );
}
