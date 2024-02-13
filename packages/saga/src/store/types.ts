import { Action } from "redux";

import { TGithubState } from "../features/github/ducks/types";

export type TAction<T, P = undefined> = P extends undefined
  ? Action<T>
  : Action<T> & {
      payload: P;
    };

export type TState = {
  github: TGithubState;
};
