/// <reference types="vite/client" />

declare module '*.deck' {
  const deck: Deck;
  export default deck;
}

declare module 'pokemontcgsdk' {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const pokemon: any;
  export default pokemon;
}
