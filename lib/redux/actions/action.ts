import { PokeAPIInfor, PokeStats, SimplePokeList, SimplePokeResult } from "../../data/dataType"

export const GET_POKEMON_SIMPLE_LIST = "GET_POKEMON_SIMPLE_LIST" // get normal list
export const GET_POKEMON_STATS = "GET_POKEMON_STATS" // get stats in detail screen
export const SORT_POKEMON = "SORT_POKEMON" // sort pokemon by name or id number
export const SEARCH_FILTER = "SEARCH_FILTER" // filter passed data base input


export const GET_POKEMON_SIMPLE_LIST_SUCCESS = "GET_POKEMON_SIMPLE_LIST_SUCCESS" // return flatlist data after convert to full pokaemon's infor except stats
export const CONVERT_API_RESULT_SUCCESS = "CONVERT_API_RESULT_SUCCESS" 
export const GET_POKEMON_STATS_SUCCESS = "GET_POKEMON_STATS_SUCCESS" 
export const SORT_POKEMON_SUCCESS = "SORT_POKEMON_SUCCESS" 
export const SEARCH_FILTER_SUCCESS = "SEARCH_FILTER_SUCCESS" 

export const GET_POKEMON_SIMPLE_LIST_FAIL = "GET_POKEMON_SIMPLE_LIST_FAIL" 
export const CONVERT_API_RESULT_FAIL = "CONVERT_API_RESULT_FAIL" 
export const GET_POKEMON_STATS_FAIL = "GET_POKEMON_STATS_FAIL" 
export const SORT_POKEMON_FAIL = "SORT_POKEMON_FAIL" 
export const SEARCH_FILTER_FAIL = "SEARCH_FILTER_FAIL" 

// Action creators for each action type
export const getHomePokeList = () => ({
  type: GET_POKEMON_SIMPLE_LIST,
});

export const getPokemonStats = (id: number) => ({
  type: GET_POKEMON_STATS,
  payload: id,
});

export const sortPokemon = (sortBy: "name" | "id") => ({
  type: SORT_POKEMON,
  payload: sortBy,
});

export const searchFilter = (input: string) => ({
  type: SEARCH_FILTER,
  payload: input,
});

// Success actions
export const getHomePokeListSuccess = (pokeList: SimplePokeList) => ({
  type: GET_POKEMON_SIMPLE_LIST_SUCCESS,
  payload: pokeList,
});

export const convertApiResultSuccess = (pokeData: PokeAPIInfor[] ) => ({
  type: CONVERT_API_RESULT_SUCCESS,
  payload: pokeData,
});

export const getPokemonStatsSuccess = (stats: PokeStats[]) => ({
  type: GET_POKEMON_STATS_SUCCESS,
  payload: stats,
});

export const sortPokemonSuccess = (sortedPokeList: PokeAPIInfor[]) => ({
  type: SORT_POKEMON_SUCCESS,
  payload: sortedPokeList,
});

export const searchFilterSuccess = (filteredPokeList: PokeAPIInfor[]) => ({
  type: SEARCH_FILTER_SUCCESS,
  payload: filteredPokeList,
});

// Fail actions
export const getHomePokeListFail = (error: any) => ({
  type: GET_POKEMON_SIMPLE_LIST_FAIL,
  payload: error,
});

export const convertApiResultFail = (error: any) => ({
  type: CONVERT_API_RESULT_FAIL,
  payload: error,
});

export const getPokemonStatsFail = (error: any) => ({
  type: GET_POKEMON_STATS_FAIL,
  payload: error,
});

export const sortPokemonFail = (error: any) => ({
  type: SORT_POKEMON_FAIL,
  payload: error,
});

export const searchFilterFail = (error: any) => ({
  type: SEARCH_FILTER_FAIL,
  payload: error,
});

