import { put, takeLatest } from "redux-saga/effects";
import { SEARCH_DISCHARGE, SEARCH_DISCHARGE_FAIL, SEARCH_DISCHARGE_SUCCESS } from "../actions/action";

function* fetchSearchDischarge () {
    try {
        yield put({type: SEARCH_DISCHARGE_SUCCESS});
    } catch (error) {
        yield put({type: SEARCH_DISCHARGE_FAIL, payload:error})
    }
}

function* watchSearchDischarge() {
    yield takeLatest(SEARCH_DISCHARGE, fetchSearchDischarge);
}

export default watchSearchDischarge;