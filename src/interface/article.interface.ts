import { User } from "./user.interface";

export interface Article {
  readonly _id: string;
  readonly title: string;
  readonly context: string;
  readonly type: string;
  readonly createTime: string;
  readonly author: User;
}
