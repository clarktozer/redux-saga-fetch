import { expectSaga } from "redux-saga-test-plan";
import { put, take } from "redux-saga/effects";

function* testSaga() {
    yield take("REQUEST_TEST");
    yield put({ type: "RECEIVE_TEST" });
}

it("API Success Test", () => {
    return expectSaga(testSaga)
        .put({
            type: "RECEIVE_TEST"
        })
        .dispatch({ type: "REQUEST_TEST" })
        .run();
});
