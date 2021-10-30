import { call, put, select, takeLatest } from "redux-saga/effects";

import { PAGE_SIZE } from "../constants";
import { TUser } from "../types";
import { ACTION_TYPE } from "./action-types";
import { selectSince } from "./selectors";
import { TSuccessAction, TFailureAction } from "./types";

type TSuccessResult = {
  isOk: true;
  users: TUser[];
  since: number | null;
};

type TFailureResult = {
  isOk: false;
};

type TResult = TSuccessResult | TFailureResult;

const readUsers = async (since: number): Promise<TResult> => {
  const usersResponse = await window.fetch(
    `https://api.github.com/users?per_page=${PAGE_SIZE}&since=${since}`
  );

  if (!usersResponse.ok) {
    return {
      isOk: false
    };
  }

  const users: TUser[] = await usersResponse.json();

  const linkHeader = usersResponse.headers.get("link");

  const newSince = linkHeader?.search(/(?<=since=)\d+/) ?? null;

  return {
    isOk: true,
    users,
    since: newSince
  };
};

function* fetchPerson() {
  const prevSince: number = yield select(selectSince);

  try {
    const { isOk, users, since: newSince } = yield call(readUsers, prevSince);

    if (!isOk) {
      const failureAction: TFailureAction = {
        type: ACTION_TYPE.FAILURE,
        payload: new Error("Someting went wrong")
      };
      yield put(failureAction);
    }

    const successAction: TSuccessAction = {
      type: ACTION_TYPE.SUCCESS,
      payload: {
        users,
        since: typeof newSince === "number" ? newSince : null
      }
    };

    yield put(successAction);
  } catch (error) {
    const failureAction: TFailureAction = {
      type: ACTION_TYPE.FAILURE,
      payload: error instanceof Error ? error : new Error('Something went wrong'),
    };
    yield put(failureAction);
  }
}

export function* githubSaga() {
  yield takeLatest(ACTION_TYPE.REQUEST, fetchPerson);
}
