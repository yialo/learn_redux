import type { GithubState } from '../config';

export const users = (state: GithubState) => state.users;
export const process = (state: GithubState) => state.process;
export const error = (state: GithubState) => state.error;
export const since = (state: GithubState) => state.since;
