export interface Rule {
  _id?: string;
  name: string;
  match: string;
  pre: string;
  post: string;
  enabled: boolean;
  priority: number;
  createdAt?: Date;
}
