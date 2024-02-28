import { Show, createSignal } from 'solid-js';
import { Card } from '../../db/Card';
import { Deck, DeckCard } from '../../db/Deck';
import { supabase } from '../../supabase';
import { CardGrid } from '../card/CardGrid';
import { CardSearch } from '../card/CardSearch';
import './DeckBuilder.css';

export function DeckBuilder() {
  const deckName = 'first';
  const [deck, setDeck] = createSignal<Deck | null>(null);

  (async () => {
    const response = await supabase
      .from('decks')
      .select('*')
      .eq('name', deckName);

    if (response.error) {
      throw response.error;
    }

    if (!response.data?.[0].id) {
      throw new Error(`Deck not found: ${deckName}`);
    }

    setDeck(response.data[0] || null);
  })();

  return (
    <>
      <Show when={!deck()}>{<p>Loading...</p>}</Show>
      <Show when={deck()}>
        <EditDeck deck={deck()!} />
      </Show>
    </>
  );
}

export function EditDeck(props: { deck: Deck }) {
  const [selected, setSelected] = createSignal<Card[]>([]);

  (async () => {
    const response = await supabase
      .from<'deck_cards', DeckCard[]>('deck_cards')
      .select('card(*)')
      .eq('deck', props.deck.id);

    if (response.error) {
      throw response.error;
    }

    console.log(`Deck has ${response.data?.length} cards`);
    const cards = response.data?.map(
      (deckCard) => deckCard.card as any as Card
    );
    setSelected(cards);
  })();

  return (
    <>
      <CardSearch onSelect={select} />
      <h3>{props.deck.name}</h3>
      <CardGrid cards={selected()} onSelect={console.log} />
    </>
  );

  async function select(...cards: Card[]) {
    setSelected([...selected(), ...cards]);

    console.log('Adding card to deck:', ...cards);

    const response = await supabase.from('deck_cards').upsert(
      cards.map((card) => ({
        deck: props.deck.id,
        card: card.id,
        amount: 1,
      }))
    );

    console.log(response);
  }
}
