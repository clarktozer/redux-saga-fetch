## redux-saga-fetch-actions

![CI Status](https://img.shields.io/github/workflow/status/clarktozer/redux-saga-fetch-actions/Build%20&%20Test)
[![npm version](https://img.shields.io/npm/v/redux-saga-fetch-actions.svg)](https://www.npmjs.com/package/redux-saga-fetch-actions)

Saga for consistent fetch api actions.

Dispatch an action in FSA format with your desired prefix (default is "FETCH\_").

```
dispatch({
    type: "FETCH_WIDGETS",
    payload: {
        request: () => Promise.resolve([1, 2, 3, 4, 5]),
        onSuccess: (response) => {
            alert(response)
        },
        onFailure: (error) => {
            alert(error)
        }
    },
    meta: "Some data"
})
```

The saga will then dispatch a request action, and either a success or failure action, both in FSA format. The meta property will be passed through to both.

```
{
    type: "WIDGETS_SUCCESS",
    payload: [1,2,3,4,5] // The request response,
    meta: "Some data"
}
```

```
{
    type: "WIDGETS_FAILED",
    payload: "Something went wrong!", // The exception error,
    meta: "Some data"
    error: true
}
```

## Installation

```
npm install redux-saga-fetch-actions
```

```javascript
import createSagaMiddleware from "@redux-saga/core";
import { fetchSaga } from "redux-saga-fetch-actions";
import { applyMiddleware, createStore } from "redux";
import { rootReducer } from "../reducers";

const sagaMiddleware = createSagaMiddleware();

export const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(fetchSaga);
```

## Saga Props

| Prop                               |  Type  |           Description            |
| :--------------------------------- | :----: | :------------------------------: |
| prefix<br/>_(default = "FETCH\_")_ | string | Prefix to trigger the fetch saga |

## Action Payload Props

| Prop                     |          Type           |                  Description                  |
| :----------------------- | :---------------------: | :-------------------------------------------: |
| request<br/>_(required)_ |   () => Promise<any>    |                 Fetch request                 |
| onSuccess                | (response: any) => void | Function called if the request was successful |
| onFailure                | (error: Error) => void  |     Function called if the request failed     |
