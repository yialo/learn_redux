import { createReducer } from '@reduxjs/toolkit';
import { PROCESS } from '@/shared/config';
import * as actions from './actions';
import { TGithubState } from './types';

const INITIAL_STATE: TGithubState = {
  process: PROCESS.IDLE,
  error: null,
  users: [],
  since: 0,
};

export const reducer = createReducer(INITIAL_STATE, (builder) => {
  builder.addCase(actions.fetchUsers, (state) => {
    if (state.process !== PROCESS.LOADING) {
      state.process = PROCESS.LOADING;
    }
  });

  builder.addCase(actions.success, (state, { payload }) => {
    if (state.process === PROCESS.LOADING) {
      state.process = PROCESS.SUCCESS;
      state.users.push(...payload.users);
      state.since = payload.since ?? state.since;
    }
  });

  builder.addCase(actions.failure, (state, { payload }) => {
    if (state.process === PROCESS.LOADING) {
      state.process = PROCESS.FAILURE;
      state.error = payload;
    }
  });

  builder.addCase(actions.reset, () => INITIAL_STATE);
});
