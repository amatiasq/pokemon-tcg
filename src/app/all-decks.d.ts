declare module '*.deck' {
  const deck: Deck;
  export default deck;
}

declare module 'virtual:all-decks' {
  const decks: Deck[];
  export default decks;
}
