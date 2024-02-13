import { TState } from '../../../app/store';

export const selectUsers = (state: TState) => state.github.users;
export const selectProcess = (state: TState) => state.github.process;
export const selectError = (state: TState) => state.github.error;
export const selectSince = (state: TState) => state.github.since;
