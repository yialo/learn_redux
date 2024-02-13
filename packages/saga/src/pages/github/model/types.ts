import { TProcess } from '@/shared/config';
import { User } from '../config';

export type SuccessPayload = {
  users: User[];
  since: number | null;
};

export type TGithubState = {
  process: TProcess;
  error: Error | null;
  users: User[];
  since: number;
};
