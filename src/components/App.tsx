import { getCardsById } from '../data/api';
import { lucha } from '../mazos';
import './App.css';
import { CardList } from './CardList';

const cards = await getCardsById(lucha);

export function App() {
  return (
    <main>
      <h2>Lucha</h2>
      <CardList list={cards} />
    </main>
  );
}
