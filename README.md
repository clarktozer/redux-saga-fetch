## redux-saga-fetch-actions

![CI Status](https://img.shields.io/github/workflow/status/clarktozer/redux-saga-fetch-actions/Build%20&%20Test)
[![npm version](https://img.shields.io/npm/v/redux-saga-fetch-actions.svg)](https://www.npmjs.com/package/redux-saga-fetch-actions)

Saga for consistent fetch api actions.

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

## Props

| Prop                               |  Type  |           Description            |
| :--------------------------------- | :----: | :------------------------------: |
| prefix<br/>_(default = "FETCH\_")_ | string | Prefix to trigger the fetch saga |
