export const PROCESS = {
  IDLE: 'IDLE',
  LOADING: 'LOADING',
  SUCCESS: 'SUCCESS',
  FAILURE: 'FAILURE',
} as const;

export type TProcess = (typeof PROCESS)[keyof typeof PROCESS];
