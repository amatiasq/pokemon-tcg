type Branded<T, K extends string> = T & { __opaque__?: K };

type PlainUrl = Branded<string, 'URL'>;
