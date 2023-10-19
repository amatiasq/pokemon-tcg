import { Card } from '../data/Card';
import './CardList.css';
import { CardView } from './CardView';

export function CardList({ list }: { list: Card[] }) {
  return (
    <ul className="card-list">
      {list.map((card) => (
        <li key={card.id}>
          <CardView card={card} />
        </li>
      ))}
    </ul>
  );
}
