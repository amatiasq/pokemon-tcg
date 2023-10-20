/// <reference types="vite/client" />

declare module '*.deck' {
  const deck: Deck;
  export default deck;
}

declare module 'virtual:all-decks' {
  const decks: Deck[];
  export default decks;
}

declare module 'pokemontcgsdk' {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const pokemon: any;
  export default pokemon;
}
