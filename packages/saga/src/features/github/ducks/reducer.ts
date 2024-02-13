import { PROCESS } from "../../../enums";
import { ACTION_TYPE } from "./action-types";
import { TGithubState, TReducer } from "./types";

const INITIAL_STATE: TGithubState = {
  process: PROCESS.IDLE,
  error: null,
  users: [],
  since: 0
};

export const githubReducer: TReducer = (prevState, action) => {
  const state = prevState ?? INITIAL_STATE;

  switch (action.type) {
    case ACTION_TYPE.REQUEST: {
      if (state.process === PROCESS.LOADING) {
        return state;
      }

      return {
        ...state,
        process: PROCESS.LOADING
      };
    }

    case ACTION_TYPE.SUCCESS: {
      if (state.process !== PROCESS.LOADING) {
        return state;
      }

      const { users, since } = action.payload;

      return {
        ...state,
        process: PROCESS.SUCCESS,
        users: [...state.users, ...users],
        since: since ?? state.since
      };
    }

    case ACTION_TYPE.FAILURE: {
      if (state.process !== PROCESS.LOADING) {
        return state;
      }

      return {
        ...state,
        process: PROCESS.FAILURE,
        error: action.payload
      };
    }

    case ACTION_TYPE.RESET:
      return INITIAL_STATE;

    default:
      return state;
  }
};
