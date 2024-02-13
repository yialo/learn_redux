import { createAction } from '@reduxjs/toolkit';
import { User } from '../config';
import { ACTION_TYPE } from './action-types';
import { SuccessPayload } from './types';

export const fetchUsers = createAction(ACTION_TYPE.REQUEST);

export const success = createAction(
  ACTION_TYPE.SUCCESS,
  (users: User[], since: number | null) => ({
    payload: { since, users } satisfies SuccessPayload,
  }),
);

export const failure = createAction(ACTION_TYPE.FAILURE, (error: Error) => ({
  payload: error,
}));

export const reset = createAction(ACTION_TYPE.RESET);
