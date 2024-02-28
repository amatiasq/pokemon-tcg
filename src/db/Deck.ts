import { User } from '@supabase/supabase-js';
import { Card } from './Card';

export interface Deck {
  id: Branded<string, 'DeckId'>;
  owner: User['id'];
  created_at: Branded<number, 'Timestamp'>;
  name: string;
  public: boolean;
}

export interface DeckCard {
  deck: Deck['id'];
  card: Card['id'];
  created_at: Branded<number, 'Timestamp'>;
  amount: number;
  notes: string;
  marks: string[];
}
