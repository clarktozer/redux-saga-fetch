import { takeEvery } from "redux-saga/effects";

function* fetchWorker() {
    console.log("fetchWorker");
}

export function* fetchSaga() {
    yield takeEvery("fetchSaga", fetchWorker);
}
