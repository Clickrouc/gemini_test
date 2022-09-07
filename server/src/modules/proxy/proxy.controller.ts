import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../utils/catchAsync';
import * as proxyService from './proxy.service';
import pick from '../utils/pick';
import { IOptions } from '../paginate/paginate';

export const createProxy = catchAsync(async (req: Request, res: Response) => {
  const proxy = await proxyService.createProxy(req.body);
  res.status(httpStatus.CREATED).send(proxy);
});

export const getProxies = catchAsync(async (req: Request, res: Response) => {
  const filter = pick(req.query, ['username']);
  const options: IOptions = pick(req.query, ['sortBy', 'limit', 'page', 'projectBy']);
  const result = await proxyService.queryProxies(filter, options);
  res.send(result);
});
