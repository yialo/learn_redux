import { TProcess } from '@/shared/config';

export type User = {
  id: number;
  login: string;
  avatar_url: string;
};

export type GithubState = {
  process: TProcess;
  error: Error | null;
  users: User[];
  since: number;
};
