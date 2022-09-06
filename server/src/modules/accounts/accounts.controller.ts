import httpStatus from 'http-status';
import { Request, Response } from 'express';
import catchAsync from '../utils/catchAsync';
import { IOptions } from '../paginate/paginate';
import pick from '../utils/pick';
import * as accountsService from './accounts.service';

export const createAccount = catchAsync(async (req: Request, res: Response) => {
  console.log(req.body);
  const account = await accountsService.createAccount(req.body);
  res.status(httpStatus.CREATED).send(account);
});

export const getAccounts = catchAsync(async (req: Request, res: Response) => {
  const filter = pick(req.query, ['username']);
  const options: IOptions = pick(req.query, ['sortBy', 'limit', 'page', 'projectBy']);
  const result = await accountsService.queryAccounts(filter, options);
  res.send(result);
});
