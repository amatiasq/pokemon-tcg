import 'preact/compat';

declare module 'preact/compat' {
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
