// src/redux/sagas/sortSaga.js
import { put, takeLatest } from "redux-saga/effects";
import { SORT_POKEMON } from "../actions/action";
import { PokeAPIInfor } from "../../data/dataType";

// Sorting function
function* sortPokeList(action: ({type: typeof SORT_POKEMON, payload: {sortBy: 'name' | 'id', list: PokeAPIInfor[] }})) {
  try {
    const { list, sortBy } = action.payload;
    

    if (sortBy === 'id') {
      list.sort((a, b) => a.id - b.id); 
    } else if (sortBy === 'name') {
      list.sort((a, b) => a.name.localeCompare(b.name)); 
    }

    // Dispatch success action with the sorted list
    yield put({ type: 'SORT_POKEMON_SUCCESS', payload: list });
  } catch (error) {
    yield put({ type: 'SORT_POKEMON_FAIL', payload: error });
  }
}

// Watcher saga for sorting
function* watchSortPokeList() {
  yield takeLatest(SORT_POKEMON, sortPokeList);
}

export default watchSortPokeList;
