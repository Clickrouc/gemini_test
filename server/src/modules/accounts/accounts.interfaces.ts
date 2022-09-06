import { Model, Document } from 'mongoose';
import { QueryResult } from '../paginate/paginate';

export interface ICookie {
  name: string;
  value: string;
  path?: string;
  expires?: string;
  secure: boolean;
}

export interface ICookieDoc extends ICookie, Document {}

export interface ICookieModel extends Model<IAccountDoc> {}

export interface IAccount {
  disabled: boolean;
  password: string;
  proxies?: string[];
  cookies?: {
    [key: string]: ICookie[];
  };
  userAgent?: string;
  username: string;
}

export interface IAccountDoc extends IAccount, Document {}

export interface IAccountModel extends Model<IAccountDoc> {
  paginate(filter: Record<string, any>, options: Record<string, any>): Promise<QueryResult>;
}
