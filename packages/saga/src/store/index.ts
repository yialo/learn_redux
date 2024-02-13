import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from "redux-saga";
import { all, call } from "redux-saga/effects";

import { githubReducer } from "../features/github/ducks/reducer";
import { githubSaga } from "../features/github/ducks/sagas";

const rootSaga = function* () {
  yield all([call(githubSaga)]);
};

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    github: githubReducer,
  },
  devTools: import.meta.env.MODE === "development",
  middleware: (getDefaultMiddleware) => {
      return getDefaultMiddleware({
        thunk: false,
      }).concat(sagaMiddleware);
    },
});

sagaMiddleware.run(rootSaga);

