import httpStatus from 'http-status';
import { Request, Response } from 'express';
import mongoose from 'mongoose';
import catchAsync from '../utils/catchAsync';
import { IOptions } from '../paginate/paginate';
import pick from '../utils/pick';
import * as accountsService from './account.service';

export const updateAccount = catchAsync(async (req: Request, res: Response) => {
  let account;
  if (req.body.id) {
    const request = { ...req.body };
    delete request.id;
    account = await accountsService.updateAccount(req.body.id, request);
  } else {
    account = await accountsService.createAccount(req.body);
  }

  res.status(httpStatus.CREATED).send(account);
});

export const getAccounts = catchAsync(async (req: Request, res: Response) => {
  const filter = pick(req.query, ['username']);
  const options: IOptions = pick(req.query, ['sortBy', 'limit', 'page', 'projectBy']);
  const result = await accountsService.queryAccounts(filter, options);
  res.send(result);
});

export const deleteAccount = catchAsync(async (req: Request, res: Response) => {
  if (typeof req.body.accountId === 'string') {
    await accountsService.deleteAccountById(new mongoose.Types.ObjectId(req.body.accountId));
    res.status(httpStatus.NO_CONTENT).send();
  }
});
