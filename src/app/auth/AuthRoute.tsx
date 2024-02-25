import { Route, useLocation, useNavigate } from '@solidjs/router';
import { ComponentProps, Show, createSignal } from 'solid-js';
import { user, whenAuthReady } from './user';

export function AuthRoute({
  component,
  ...props
}: ComponentProps<typeof Route> & { component: () => any }) {
  function GuardComponent() {
    const location = useLocation();
    const navigate = useNavigate();
    const [ready, setReady] = createSignal(false);

    whenAuthReady.then(() => setReady(true));

    return <Show when={ready()}>{user() ? component() : forceLogin()}</Show>;

    function forceLogin() {
      navigate(`/login/#${location.pathname}`);
    }
  }

  return <Route {...(props as any)} component={GuardComponent} />;
}
