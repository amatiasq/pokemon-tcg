import 'preact/compat';

declare module 'preact/compat' {
  interface CSSProperties {
    [key: `--${string}`]: string | number;
  }
}
