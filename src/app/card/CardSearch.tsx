import { Scheduler } from '@amatiasq/scheduler';
import { PostgrestError } from '@supabase/supabase-js';
import { Show, createSignal } from 'solid-js';
import { Card } from '../../db/Card';
import { supabase } from '../../supabase';
import { CardGrid } from './CardGrid';
import './CardSearch.css';

export function CardSearch(props: { onSelect: (...results: Card[]) => void }) {
  const closeTimer = new Scheduler(1000, () => setActive(false));
  const searchTimer = new Scheduler(100, executeSearch);
  const [active, setActive] = createSignal(false);
  const [error, setError] = createSignal<PostgrestError | null>(null);
  const [results, setResults] = createSignal([] as Card[]);

  const input = (
    <input
      type="text"
      placeholder="Search"
      onInput={() => searchTimer.restart()}
      onFocus={() => {
        closeTimer.stop();
        setActive(true);
      }}
      onBlur={() => closeTimer.start()}
    />
  ) as HTMLInputElement;

  return (
    <div class={`card-search ${active() ? ' is-active' : ''}`}>
      {input}

      <div class="panel">
        <div class="error">{error()?.message}</div>

        <Show when={results().length && !error()}>
          <div class="count">{results().length} results</div>
          <CardGrid
            cards={results()}
            onSelect={(...card) => {
              setActive(false);
              input.value = '';
              props.onSelect(...card);
            }}
          />
        </Show>
      </div>
    </div>
  );

  async function executeSearch() {
    const { value } = input;
    const { data, error } = await supabase
      .from('cards')
      .select('*')
      .ilike('name', `%${value}%`);

    if (error) {
      setError(error);
    } else {
      setError(null);
      setResults(data);
    }
  }
}
