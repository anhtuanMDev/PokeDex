import { call, put, select, takeLatest } from 'redux-saga/effects';
import { PokeAPIInfor } from "../../data/dataType";
import { SEARCH_FILTER, SEARCH_FILTER_SUCCESS, SEARCH_FILTER_FAIL, SEARCH_DISCHARGE } from "../actions/action";
import { RootState } from '../store'; // Assuming you have a RootState type for TypeScript

// Utility function to find relative Pokémon
function findRelativePoke(name: string, data: PokeAPIInfor[]): PokeAPIInfor[] {
    return data.filter((poke: PokeAPIInfor) =>
        poke.name.toLowerCase().includes(name.toLowerCase())
    );
}

// Saga to handle search filter action
function* fetchSearchList(action: { type: typeof SEARCH_FILTER; payload: { name: string, list: PokeAPIInfor[] } }) {
    try {
        const pokeList = action.payload.list
        console.log("list", pokeList)
        const filteredList: PokeAPIInfor[] = yield call(findRelativePoke, action.payload.name, pokeList);
        yield put({ type: SEARCH_FILTER_SUCCESS, payload: filteredList });
    } catch (error) {
        yield put({ type: SEARCH_FILTER_FAIL, payload: error });
    }
}


// Watcher saga
function* watchSearchFilter() {
    yield takeLatest(SEARCH_FILTER, fetchSearchList);
}


export default watchSearchFilter;
