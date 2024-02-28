import { createSignal } from 'solid-js';
import { Card } from '../../db/Card';
import { CardGrid } from '../card/CardGrid';
import { CardSearch } from '../card/CardSearch';
import './DeckBuilder.css';

export function DeckBuilder() {
  const [selected, setSelected] = createSignal<Card[]>([]);

  return (
    <>
      <CardSearch
        onSelect={(...cards) => setSelected([...selected(), ...cards])}
      />
      <CardGrid cards={selected()} onSelect={(x) => console.log(x.name)} />
    </>
  );
}
