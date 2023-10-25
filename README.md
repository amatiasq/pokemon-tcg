This project started as a way to learn to make Vite plugins and to teach my kid about the joy of creating your own tools tailored to your needs.

## The need

I used pokemon card game to motivate my kid to learn to read and basic math operations, this is how we got a set of decks to play together, and we got a decent set of decks.
When we wanted to try different strategies we looked for a way to "save" our current decks so we can return to them later.

We want to be able to store our decks composed of 60 cards in plain text as minimally as possible, and visualize them clearly.

I tried [an online tool][1] but it was hard to use because I had to look for each card manually each time, I didn't have a set of cards that I own so I can shuffle them. I had to look across the whole database of cards for every single one, that was a tedious process. Also, it was pretty easy to misclick a card, which will remove it, since there was no undo, the only way to get it back was to search for it again.

## Solution

We could identify each card by its unique ID. So we compose this Domain Specific Language (DSL) where you have a card ID and the amount on each line, and you can add emojis for metadata: `<card-id>  x3  This is a note 🇬🇧✨`. So, a deck would look like this.

```
sve-2       x18 Energia fuego 🔥
swsh8-43        Cinderace V
swsh12-17       Vulpix
swsh12-18       Ninetales
```

Any emojis in the notes will be displayed in the UI next to the card.

## Technical implementation

We could write this data into `*.deck` files which will be processed by a custom Vite Plugin.
This plugin will process each line, download the information of the card from the [Pokemon TCG API][2] and save it to disk (only once, to prevent overloading the API with requests), and does the same for the image of the card.
All of this is done at build time so the data and images are available even when offline.

This data is then injected into a React application that shows it in a webpage.

[1]: https://pokemoncard.io/deckbuilder/
[2]: https://pokemontcg.io/
