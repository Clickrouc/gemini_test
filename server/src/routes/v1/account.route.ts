import express, { Router } from 'express';
import { validate } from '../../modules/validate';
import { auth } from '../../modules/auth';
import { accountController, accountValidation } from '../../modules/account';

const router: Router = express.Router();

router
  .route('/')
  .post(auth(), validate(accountValidation.updateAccount), accountController.updateAccount)
  .get(auth(), validate(accountValidation.getAccounts), accountController.getAccounts)
  .delete(auth(), validate(accountValidation.deleteAccount), accountController.deleteAccount);

export default router;
