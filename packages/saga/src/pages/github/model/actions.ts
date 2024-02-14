import { createAction } from '@reduxjs/toolkit';
import { User } from '../config';

type SuccessPayload = {
  users: User[];
  since: number | null;
};

const ACTION_TYPE = {
  REQUEST: 'REQUEST',
  SUCCESS: 'SUCCESS',
  FAILURE: 'FAILURE',
  RESET: 'RESET',
} as const;

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
