import { ApiCard } from 'types:Card';
import { Deck } from 'types:Deck';
import { CardData } from '../card/CardData';
import './PrintDeck.css';

export function PrintDeck(props: { deck: Deck }) {
  return (
    <div class="printable">
      <table>
        <thead>
          <tr>
            <th>Legality</th>
            <th>QTY</th>
            <th>ID</th>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          {props.deck.cards.map((card) => (
            <tr>
              <td>{getCardLegality(card)}</td>
              <td>{card.count}x</td>
              <td>{card.id}</td>
              <td>{card.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <ul>
        {props.deck.cards.map((card) => (
          <li>
            <CardData card={card} />
          </li>
        ))}
      </ul>
    </div>
  );

  function getCardLegality(card: ApiCard) {
    const byStrictness = ['standard', 'expanded', 'unlimited'] as const;
    return byStrictness.find((key) => card.legalities[key] === 'Legal');
  }
}
