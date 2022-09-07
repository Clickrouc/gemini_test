import express, { Router } from 'express';
import { validate } from '../../modules/validate';
import { auth } from '../../modules/auth';
import { proxyController, proxyValidation } from '../../modules/proxy';

const router: Router = express.Router();

router
  .route('/')
  .post(auth(), validate(proxyValidation.createProxy), proxyController.createProxy)
  .get(auth(), validate(proxyValidation.getProxies), proxyController.getProxies);

export default router;
