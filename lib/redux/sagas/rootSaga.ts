import { all } from 'redux-saga/effects';
import watchFetchPokemonList from './getListSaga';

export default function* rootSaga() {
  yield all([
    watchFetchPokemonList(),
  ]);
}
