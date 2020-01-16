import { call, put, takeEvery } from "redux-saga/effects";

export interface FetchPayload<T, E> {
    request: Promise<T>;
    onSuccess?: (response: T) => IterableIterator<any>;
    onFailure?: (error: E) => IterableIterator<any>;
}

export interface FetchAction<T, M, E = Error> {
    type: string;
    payload: FetchPayload<T, E>;
    meta: M;
}

function* fetchWorker<T, M>(
    actionPrefix: string,
    {
        type,
        payload: { onFailure, onSuccess, request },
        meta
    }: FetchAction<T, M>
) {
    const prefix = type.replace(actionPrefix, "");
    try {
        yield put({
            type: `${prefix}_REQUEST`
        });
        const response = yield call(() => request);
        yield put({
            type: `${prefix}_SUCCESS`,
            payload: response,
            meta
        });
        if (onSuccess) {
            yield call(onSuccess, response);
        }
    } catch (error) {
        yield put({
            type: `${prefix}_FAILED`,
            payload: error,
            meta,
            error: true
        });
        if (onFailure) {
            yield call(onFailure, error);
        }
    }
}

export function* fetchSaga<T, M>(actionPrefix = "FETCH_") {
    yield takeEvery(
        ({ payload, type }: FetchAction<T, M>) =>
            type && type.startsWith(actionPrefix) && payload.request != null,
        function*(action: FetchAction<T, M>) {
            yield call(fetchWorker, actionPrefix, action);
        }
    );
}
