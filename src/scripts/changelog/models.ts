export interface Commit {
  date: string;
  hash: string;
  author: string;
  subject: string;
}

export interface TagGroup {
  commits: Commit[];
  previousTag: string;
  tag: string;
  date: Date;
}
