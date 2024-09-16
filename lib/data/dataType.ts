export interface SimplePokeList {
  count: number;
  next?: string | null;
  previous?: string | null;
  results?: SimplePokeResult[] | null;
}

export interface SimplePokeResult {
  name: string;
  url: string;
}

export interface PokeAPIInfor {
  id: number;
  name: string;
  weight: number;
  height: number;
  abilities: AbilitiesEntity[];
  sprites: {
    front_default: string;
  };
  types: PokeType[];
}

export interface AbilitiesEntity {
  ability: SimplePokeResult;
  is_hidden: boolean;
  slot: number;
}

export interface PokeType {
  slot: number;
  type: string;
}

export interface PokeStats {
  name: string;
  stat: number;
}