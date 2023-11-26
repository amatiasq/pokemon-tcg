import 'solid-js';

declare module 'solid-js' {
  declare namespace JSX {
    interface IntrinsicAttributes {
      path?: string;
    }

    interface IntrinsicElements {
      'hamburger-button': HTMLAttributes;
    }
  }

  interface CSSProperties {
    [key: `--${string}`]: string | number;
  }
}
