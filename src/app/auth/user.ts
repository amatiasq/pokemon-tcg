import { User } from '@supabase/supabase-js';
import { createSignal } from 'solid-js';
import { supabase } from '../../supabase';

const [user, setUser] = createSignal<User | null>(null);

export const whenAuthReady = new Promise<User | null>((resolve) => {
  supabase.auth.onAuthStateChange((event, session) => {
    const user = session?.user ?? null;
    resolve(user);
    setUser(user);
  });
});

export { user };
