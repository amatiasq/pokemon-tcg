/// <reference types="vite/client" />

declare module 'pokemontcgsdk' {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const pokemon: any;
  export default pokemon;
}

import 'react';

declare module 'react' {
  interface CSSProperties {
    [key: `--${string}`]: string | number;
  }
}
