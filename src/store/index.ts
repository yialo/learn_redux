import { applyMiddleware, combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import createSagaMiddleware from "redux-saga";
import { all, call } from "redux-saga/effects";

import { githubReducer } from "../features/github/ducks/reducer";
import { githubSaga } from "../features/github/ducks/sagas";

const rootReducer = combineReducers({
  github: githubReducer
});

const rootSaga = function* () {
  yield all([call(githubSaga)]);
};

const sagaMiddleware = createSagaMiddleware();

const appliedMiddleware = applyMiddleware(sagaMiddleware);
const enhancer = composeWithDevTools(appliedMiddleware);

export const store = createStore(rootReducer, enhancer);

sagaMiddleware.run(rootSaga);
