import { render } from 'solid-js/web';
import { App } from './app/App.tsx';
import './index.css';

// if (!('anchorName' in document.documentElement.style)) {
//   import('https://unpkg.com/@oddbird/css-anchor-positioning');
// }

render(() => <App />, document.body);
