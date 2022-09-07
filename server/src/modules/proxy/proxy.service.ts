import { IProxy, IProxyDoc } from './proxy.interfaces';
import Proxy from './proxy.model';
import { IOptions, QueryResult } from '../paginate/paginate';

/**
 * Create an account
 * @param {IProxy} proxyBody
 * @returns {Promise<IAccountDoc>}
 */
export const createProxy = async (proxyBody: IProxy): Promise<IProxyDoc> => {
  return Proxy.create(proxyBody);
};

/**
 * Query for proxies
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @returns {Promise<QueryResult>}
 */
export const queryProxies = async (filter: Record<string, any>, options: IOptions): Promise<QueryResult> => {
  const proxies = await Proxy.paginate(filter, options);
  return proxies;
};
