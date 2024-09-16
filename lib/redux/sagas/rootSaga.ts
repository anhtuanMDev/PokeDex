import { all } from 'redux-saga/effects';
import watchFetchPokemonList from './getListSaga';
import watchSearchFilter from './searchPokeSaga';
import watchSearchDischarge from './cancelSearch';
import watchSortPokeList from './sortSaga';

export default function* rootSaga() {
  yield all([
    watchFetchPokemonList(),
    watchSearchFilter(),
    watchSearchDischarge(),
    watchSortPokeList()
  ]);
}
