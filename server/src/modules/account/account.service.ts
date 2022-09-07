import mongoose from 'mongoose';
import httpStatus from 'http-status';
import { IOptions, QueryResult } from '../paginate/paginate';
import Account from './account.model';
import { IAccount, IAccountDoc } from './account.interfaces';
import ApiError from '../errors/ApiError';

/**
 * Create an account
 * @param {IAccount} accountBody
 * @returns {Promise<IAccountDoc>}
 */
export const createAccount = async (accountBody: IAccount): Promise<IAccountDoc> => {
  return Account.create(accountBody);
};

/**
 * Get an account by id
 * @param {mongoose.Types.ObjectId} id
 * @returns {Promise<IAccountDoc>}
 */
export const getAccountById = async (id: mongoose.Types.ObjectId): Promise<IAccountDoc | null> => Account.findById(id);

/**
 * Update an account
 * @param {mongoose.Types.ObjectId} accountId
 * @param {IAccount} updateBody
 * @returns {Promise<IAccountDoc>}
 */
export const updateAccount = async (accountId: mongoose.Types.ObjectId, updateBody: IAccount): Promise<IAccountDoc> => {
  const account = await getAccountById(accountId);
  if (!account) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Account not found');
  }
  Object.assign(account, updateBody);
  await account.save();
  return account;
};

/**
 * Query for accounts
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @returns {Promise<QueryResult>}
 */
export const queryAccounts = async (filter: Record<string, any>, options: IOptions): Promise<QueryResult> => {
  const accounts = await Account.paginate(filter, options);
  return accounts;
};

/**
 * Delete account by id
 * @param {mongoose.Types.ObjectId} accountId
 * @returns {Promise<IAccountDoc | null>}
 */
export const deleteAccountById = async (accountId: mongoose.Types.ObjectId): Promise<IAccountDoc | null> => {
  const account = await getAccountById(accountId);
  if (!account) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Account not found');
  }
  await account.remove();
  return account;
};
