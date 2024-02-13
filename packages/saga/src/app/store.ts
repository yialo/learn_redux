import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import { all, call } from 'redux-saga/effects';
import { githubReducer } from '../pages/github/model/reducer';
import { githubSaga } from '../pages/github/model/sagas';

const rootSaga = function* () {
  yield all([call(githubSaga)]);
};

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    github: githubReducer,
  },
  devTools: import.meta.env.MODE === 'development',
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      thunk: false,
    }).concat(sagaMiddleware);
  },
});

sagaMiddleware.run(rootSaga);
