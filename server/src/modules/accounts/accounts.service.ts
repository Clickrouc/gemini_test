import { IOptions, QueryResult } from '../paginate/paginate';
import Account from './accounts.model';
import { IAccount, IAccountDoc } from './accounts.interfaces';

/**
 * Create an account
 * @param {IAccount} accountBody
 * @returns {Promise<IAccountDoc>}
 */
export const createAccount = async (accountBody: IAccount): Promise<IAccountDoc> => {
  return Account.create(accountBody);
};

/**
 * Query for accounts
 * @returns {Promise<QueryResult>}
 */
export const queryAccounts = async (filter: Record<string, any>, options: IOptions): Promise<QueryResult> => {
  const accounts = await Account.paginate(filter, options);
  return accounts;
};
