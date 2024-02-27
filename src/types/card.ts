type Branded<T, K extends string> = T & { __opaque__?: K };

type URL = Branded<string, 'URL'>;
type SetId = Branded<string, 'SetId'>;
type CardId = Branded<string, 'CardId'>;

export type Supertype = 'Energy' | 'Pokémon' | 'Trainer';
export type RegulationMark = 'D' | 'E' | 'F' | 'G';

export type Series =
  | 'Scarlet & Violet'
  | 'Sun & Moon'
  | 'Sword & Shield'
  | 'XY';

export type EnergyType =
  | 'Colorless'
  | 'Darkness'
  | 'Dragon'
  | 'Fighting'
  | 'Fire'
  | 'Free'
  | 'Grass'
  | 'Lightning'
  | 'Metal'
  | 'Psychic'
  | 'Water';

export type Rarity =
  | 'Common'
  | 'Double Rare'
  | 'Hyper Rare'
  | 'Illustration Rare'
  | 'Promo'
  | 'Radiant Rare'
  | 'Rare'
  | 'Rare Holo'
  | 'Rare Holo V'
  | 'Rare Holo VMAX'
  | 'Rare Shiny GX'
  | 'Rare Ultra'
  | 'Uncommon';

export interface Set {
  id: SetId;
  name: string;
  series: Series;
  printedTotal: number;
  total: number;
  // legalities: Legalities;
  ptcgoCode?: string;
  releaseDate: string;
  updatedAt: string;
  img_symbol: URL;
  img_logo: URL;
}

export interface Card {
  id: CardId;
  name: string;
  supertype: Supertype;
  subtypes: string[];
  set_id: SetId;
  set: Set;
  number: string;
  // legalities: Legalities;
  img_thumb: URL;
  img_large: URL;
  more: {
    hp?: string;
    types?: EnergyType[];
    attacks?: Attack[];
    weaknesses?: Resistance[];
    resistances?: Resistance[];
    retreatCost?: EnergyType[];
    convertedRetreatCost?: number;
    artist?: string;
    rarity: Rarity;
    flavorText?: string;
    nationalPokedexNumbers?: number[];
    regulationMark?: RegulationMark;
    abilities?: Ability[];
    rules?: string[];
    evolvesFrom?: string;
    evolvesTo?: string[];
  };
}

export type AbilityType = 'Ability';
export interface Ability {
  name: string;
  text: string;
  type: AbilityType;
}

export interface Attack {
  name: string;
  cost: EnergyType[];
  convertedEnergyCost: number;
  damage: string;
  text?: string;
}

export interface Resistance {
  type: EnergyType;
  value: string;
}

// export interface Legalities {
//   unlimited: 'legal';
//   standard?: 'legal';
//   expanded: 'legal';
// }
