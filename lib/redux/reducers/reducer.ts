import { PokeAPIInfor } from "../../data/dataType";
import { CONVERT_API_RESULT_FAIL, CONVERT_API_RESULT_SUCCESS, GET_POKEMON_SIMPLE_LIST, GET_POKEMON_SIMPLE_LIST_FAIL, GET_POKEMON_SIMPLE_LIST_SUCCESS, GET_POKEMON_STATS, GET_POKEMON_STATS_FAIL, GET_POKEMON_STATS_SUCCESS, SEARCH_FILTER, SEARCH_FILTER_FAIL, SEARCH_FILTER_SUCCESS, SORT_POKEMON, SORT_POKEMON_FAIL, SORT_POKEMON_SUCCESS } from "../actions/action";

const poke: PokeAPIInfor[] = []

const initialState = {
    pokeList: poke,
    selectedPokemon: 0 ,
    sortedList: poke,
    filteredList: poke,
    error: null,
    loading: false,
  };
  
  const pokemonReducer = (state = initialState, action: { type: any; payload?: any; }) => {
    switch (action.type) {
      case GET_POKEMON_SIMPLE_LIST:
      case GET_POKEMON_STATS:
      case SORT_POKEMON:
      case SEARCH_FILTER:
        return {
          ...state,
          loading: true,
          error: null,
        };
  
      case GET_POKEMON_SIMPLE_LIST_SUCCESS:
        console.log(" Task GET_POKEMON_SIMPLE_LIST_SUCCESS success");
        return {
          ...state,
          loading: true,
          error: null,
        };
  
      case CONVERT_API_RESULT_SUCCESS:
        return {
          ...state,
          pokeList: action.payload,
          loading: false,
        };
  
      case GET_POKEMON_STATS_SUCCESS:
        return {
          ...state,
          id: action.payload,
          loading: false,
        };
  
      case SORT_POKEMON_SUCCESS:
        return {
          ...state,
          sortedList: action.payload,
          loading: false,
        };
  
      case SEARCH_FILTER_SUCCESS:
        return {
          ...state,
          filteredList: action.payload,
          loading: false,
        };
  
      case GET_POKEMON_SIMPLE_LIST_FAIL:
      case CONVERT_API_RESULT_FAIL:
      case GET_POKEMON_STATS_FAIL:
      case SORT_POKEMON_FAIL:
      case SEARCH_FILTER_FAIL:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
  
      default:
        return state;
    }
  };
  
  export default pokemonReducer;
  