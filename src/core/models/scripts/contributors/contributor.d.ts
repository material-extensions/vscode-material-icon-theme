import type { Endpoints } from '@octokit/types';

export type Contributor = Partial<
  Omit<
    Endpoints['GET /repos/{owner}/{repo}/contributors']['response']['data'][number],
    'avatar_url'
  > & {
    login: string;
    // biome-ignore lint/style/useNamingConvention: <explanation>
    avatar_url: string;
  }
>;
