import { takeLatest, call, put } from 'redux-saga/effects';
import {
  GET_POKEMON_SIMPLE_LIST,
  CONVERT_API_RESULT_SUCCESS,
  CONVERT_API_RESULT_FAIL,
  GET_POKEMON_SIMPLE_LIST_SUCCESS,
  GET_POKEMON_SIMPLE_LIST_FAIL,
} from '../actions/action';
import { AbilitiesEntity, PokeAPIInfor, SimplePokeList, SimplePokeResult } from '../../data/dataType';

// Fetch simple list of Pokémon from API
const fetchPokemonListApi = async (): Promise<SimplePokeList> => {
  const response = await fetch("https://pokeapi.co/api/v2/pokemon");
  if (!response.ok) {
    throw new Error('Failed to fetch Pokémon list');
  }
  const data = await response.json();
  return data;
};

// Fetch detailed information for a single Pokémon
const fetchDetailPokeApi = async (name: string): Promise<PokeAPIInfor> => {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch details for ${name}`);
  }
  const data = await response.json();

  // Extract and return only the properties defined in PokeAPIInfor
  return {
    id: data.id,
    name: data.name,
    weight: data.weight,
    height: data.height,
    abilities: data.abilities.map((ability: AbilitiesEntity) => ({
      ability: ability.ability.name,
      is_hidden: ability.is_hidden,
      slot: ability.slot,
    })),
    sprites: {
      front_default: data.sprites.front_default,
    },
    types: data.types.map((type: any) => ({
      slot: type.slot,
      type: type.type.name, // Adjust as needed
    })),
  };
};


// Convert the simple Pokémon result to detailed information
const convertAPIResponse = async (data: SimplePokeResult[]): Promise<PokeAPIInfor[]> => {
  const promises = data.map(async (poke) => {
    const infor = await fetchDetailPokeApi(poke.name);
    return infor;
  });


  return Promise.all(promises);
};


// Worker Saga: will be fired on GET_POKEMON_SIMPLE_LIST actions
function* fetchPokemonList() {
  try {
    // 1. Fetch the simple Pokémon list
    const response: SimplePokeList = yield call(fetchPokemonListApi);

    // Ensure that `response.results` is not undefined or null
    const result: SimplePokeResult[] = response.results || [];

    // Dispatch success action with simple list data
    yield put({ type: GET_POKEMON_SIMPLE_LIST_SUCCESS, payload: response });

    // 2. Convert the fetched Pokémon list to detailed data
    if (result.length > 0) {
      const convertedData: PokeAPIInfor[] = yield call(convertAPIResponse, result);
      // Dispatch success action with converted detailed Pokémon data
      yield put({ type: CONVERT_API_RESULT_SUCCESS, payload: convertedData });
    } else {
      throw new Error("No Pokémon results available");
    }

  } catch (error) {
    // Dispatch failure actions for either fetch or conversion failure
    yield put({ type: GET_POKEMON_SIMPLE_LIST_FAIL, payload: error });
    yield put({ type: CONVERT_API_RESULT_FAIL, payload: error });
  }
}


// Watcher Saga: Spawns a new fetchPokemonList task on each GET_POKEMON_SIMPLE_LIST action
function* watchFetchPokemonList() {
  yield takeLatest(GET_POKEMON_SIMPLE_LIST, fetchPokemonList);
}

export default watchFetchPokemonList;
