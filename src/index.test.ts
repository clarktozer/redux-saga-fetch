import { expectSaga } from "redux-saga-test-plan";
import { fetchSaga } from ".";

const successRequest = () => Promise.resolve([1, 2, 3, 4, 5]);
const errorRequest = () => Promise.reject("Errored!");

it("API Success Test", () =>
    expectSaga(fetchSaga)
        .put({
            type: "TEST_REQUEST"
        })
        .put({
            type: "TEST_SUCCESS",
            payload: [1, 2, 3, 4, 5],
            meta: "testing"
        })
        .dispatch({
            type: "FETCH_TEST",
            payload: {
                request: successRequest
            },
            meta: "testing"
        })
        .run());

it("API Error Test", () =>
    expectSaga(fetchSaga)
        .put({
            type: "TEST_REQUEST"
        })
        .put({
            type: "TEST_FAILED",
            payload: "Errored!",
            meta: errorRequest,
            error: true
        })
        .dispatch({
            type: "FETCH_TEST",
            payload: {
                request: errorRequest
            }
        })
        .run());

it("API Prefix Success Test", () =>
    expectSaga(fetchSaga, "FETCHING_")
        .put({
            type: "TEST_REQUEST"
        })
        .put({
            type: "TEST_SUCCESS",
            payload: [1, 2, 3, 4, 5],
            meta: successRequest
        })
        .dispatch({
            type: "FETCHING_TEST",
            payload: {
                request: successRequest
            },
            meta: successRequest
        })
        .run());
