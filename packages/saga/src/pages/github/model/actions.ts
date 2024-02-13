import { ACTION_TYPE } from './action-types';
import { TRequestAction } from './types';

export const fetchUsers = (): TRequestAction => ({
  type: ACTION_TYPE.REQUEST,
});
