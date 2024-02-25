import { A } from '@solidjs/router';
import { Show } from 'solid-js';
import { supabase } from '../../supabase';
import { user } from './user';

export function UserMenu() {
  return (
    <Show when={user()}>
      <div class="user-section">
        <h4>{user()!.email}</h4>
        <A href="/profile">Profile</A>
        <button onClick={logout}>Logout</button>
      </div>
    </Show>
  );
}

async function logout() {
  const { error } = await supabase.auth.signOut();

  if (error) {
    console.error('Failed logout:', error);
    throw error;
  }
}
