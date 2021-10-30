import { Reducer } from "redux";

import { TProcess } from "../../../enums";
import { TAction } from "../../../store/types";
import { TUser } from "../types";
import { ACTION_TYPE } from "./action-types";

type TSuccessPayload = {
  users: TUser[];
  since: number | null;
};

export type TRequestAction = TAction<typeof ACTION_TYPE.REQUEST>;
export type TSuccessAction = TAction<
  typeof ACTION_TYPE.SUCCESS,
  TSuccessPayload
>;
export type TFailureAction = TAction<typeof ACTION_TYPE.FAILURE, Error>;
export type TResetAction = TAction<typeof ACTION_TYPE.RESET>;

type TGithubAction =
  | TRequestAction
  | TSuccessAction
  | TFailureAction
  | TResetAction;

export type TGithubState = {
  process: TProcess;
  error: Error | null;
  users: TUser[];
  since: number;
};

export type TReducer = Reducer<TGithubState, TGithubAction>;
