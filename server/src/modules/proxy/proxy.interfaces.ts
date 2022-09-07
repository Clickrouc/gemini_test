import { Model } from 'mongoose';
import { QueryResult } from '../paginate/paginate';

export interface IProxy {
  name: string;
}

export interface IProxyDoc extends IProxy, Document {}

export interface IProxyModel extends Model<IProxyDoc> {
  paginate(filter: Record<string, any>, options: Record<string, any>): Promise<QueryResult>;
}
