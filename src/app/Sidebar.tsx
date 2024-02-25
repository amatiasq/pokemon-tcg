import { A } from '@solidjs/router';
import HamburgerButton from 'web-component://components.amatiasq.com/hamburger-button.js';
import './Sidebar.css';
import { UserMenu } from './auth/UserMenu';

export function Sidebar() {
  return (
    <aside>
      <nav>
        <A href="/">Home</A>

        <details open>
          <summary>More</summary>
          <A href="/filters">Filters</A>
        </details>

        <div class="spacer"></div>
        <UserMenu />
      </nav>

      <HamburgerButton />
    </aside>
  );
}
