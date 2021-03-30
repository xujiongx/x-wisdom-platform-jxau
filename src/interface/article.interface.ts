import { User } from "./user.interface";

export interface Review {
  readonly author: User;
  readonly createTime: string;
  readonly context: string;
}

export interface Article {
  readonly _id: string;
  readonly title: string;
  readonly context: string;
  readonly type: string;
  readonly createTime: string;
  readonly author: User;
  readonly love?: string;
  readonly review: Review[];
}
