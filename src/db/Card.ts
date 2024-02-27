import { EnergyType } from './EnergyType';
import { CardSet } from './Set';

type Supertype = 'Energy' | 'Pokémon' | 'Trainer';
type RegulationMark = 'D' | 'E' | 'F' | 'G';
type AbilityType = 'Ability';

type Rarity =
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

export interface Card {
  id: Branded<string, 'CardId'>;
  name: string;
  supertype: Supertype;
  subtypes: string[];
  set_id: CardSet['id'];
  set: CardSet;
  number: string;
  // legalities: Legalities;
  img_thumb: PlainUrl;
  img_large: PlainUrl;
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

interface Ability {
  name: string;
  text: string;
  type: AbilityType;
}

interface Attack {
  name: string;
  cost: EnergyType[];
  convertedEnergyCost: number;
  damage: string;
  text?: string;
}

interface Resistance {
  type: EnergyType;
  value: string;
}

// interface Legalities {
//   unlimited: 'legal';
//   standard?: 'legal';
//   expanded: 'legal';
// }
