import { call, put, select, takeLatest } from 'redux-saga/effects';
import { PAGE_SIZE, User } from '../config';
import * as actions from './actions';
import { since as selectSince } from './selectors';

type SuccessResult = {
  isOk: true;
  users: User[];
  since: number | null;
};

type FailureResult = {
  isOk: false;
};

const readUsers = async (
  since: number,
): Promise<SuccessResult | FailureResult> => {
  const usersResponse = await window.fetch(
    `https://api.github.com/users?per_page=${PAGE_SIZE}&since=${since}`,
  );

  if (!usersResponse.ok) {
    return {
      isOk: false,
    };
  }

  const users: User[] = await usersResponse.json();

  const linkHeader = usersResponse.headers.get('link');

  const newSinceMatchResult = linkHeader?.match(/(?<=since=)\d+/)?.[0];
  const newSince = Number(newSinceMatchResult);

  return {
    isOk: true,
    users,
    since: Number.isNaN(newSince) ? null : newSince,
  };
};

function* fetchPerson() {
  const prevSince: number = yield select(selectSince);

  try {
    const { isOk, users, since } = yield call(readUsers, prevSince);

    if (!isOk) {
      const failureAction = actions.failure(new Error('Something went wrong'));
      yield put(failureAction);
    }

    const successAction = actions.success(users, since);

    yield put(successAction);
  } catch (error) {
    const failureAction = actions.failure(
      error instanceof Error ? error : new Error('Something went wrong'),
    );
    yield put(failureAction);
  }
}

export function* rootSaga() {
  yield takeLatest(actions.fetchUsers.type, fetchPerson);
}
