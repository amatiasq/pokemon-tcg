import { useLocation, useNavigate } from '@solidjs/router';
import { AuthTokenResponsePassword } from '@supabase/supabase-js';
import { Show, createSignal } from 'solid-js';
import { supabase } from '../../supabase';
import { formToJson } from '../../util/form-to-json';
import './Login.css';

export function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const [error, setError] = createSignal<string | null>(null);

  return (
    <form class="login" onSubmit={handleSubmit}>
      <legend>Login</legend>

      <Show when={error()}>
        <div class="error">{error()}</div>
      </Show>

      <input type="email" name="user" required />
      <input type="password" name="password" required />
      <button type="submit">Login</button>
    </form>
  );

  async function handleSubmit(e: Event) {
    e.preventDefault();
    const { user, password } = formToJson(e.target as HTMLFormElement);

    const valid = await login(user, password);

    if (!valid) {
      setError('Invalid login');
      return;
    }

    const redirectTo = location.hash.replace('#', '') || '/';
    navigate(redirectTo);
  }
}

export async function login(
  email: string,
  password: string
): Promise<AuthTokenResponsePassword['data'] | null> {
  const loginResult = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (loginResult.error) {
    console.error('Failed login:', loginResult.error);
    return null;
  }

  return loginResult.data;
}
