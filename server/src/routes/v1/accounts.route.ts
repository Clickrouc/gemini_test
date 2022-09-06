import express, { Router } from 'express';
import { validate } from '../../modules/validate';
import { auth } from '../../modules/auth';
import { accountsController, accountsValidation } from '../../modules/accounts';

const router: Router = express.Router();

router
  .route('/')
  .post(auth(), validate(accountsValidation.createUser), accountsController.createAccount)
  .get(auth(), validate(accountsValidation.getAccounts), accountsController.getAccounts);

export default router;
