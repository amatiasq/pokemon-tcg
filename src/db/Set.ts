type Series = 'Scarlet & Violet' | 'Sun & Moon' | 'Sword & Shield' | 'XY';

export interface CardSet {
  id: Branded<string, 'SetId'>;
  name: string;
  series: Series;
  printedTotal: number;
  total: number;
  // legalities: Legalities;
  ptcgoCode?: string;
  releaseDate: string;
  updatedAt: string;
  img_symbol: PlainUrl;
  img_logo: PlainUrl;
}
