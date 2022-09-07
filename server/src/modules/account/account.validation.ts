import Joi from 'joi';
import { objectId } from '../validate';

export const updateAccount = {
  body: Joi.object().keys({
    id: Joi.string(),
    disabled: Joi.boolean().default(false),
    password: Joi.string().required(),
    proxies: Joi.array().items(Joi.string()),
    cookies: Joi.object({
      a: Joi.array().items(
        Joi.object().keys({
          name: Joi.string().required(),
          value: Joi.string().required(),
          path: Joi.string(),
          expires: Joi.string(),
          secure: Joi.boolean().required(),
        })
      ),
    }).unknown(),
    userAgent: Joi.string().allow(''),
    username: Joi.string().required(),
  }),
};

export const getAccounts = {
  query: Joi.object().keys({
    username: Joi.string(),
    sortBy: Joi.string(),
    projectBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

export const deleteAccount = {
  query: Joi.object().keys({
    accountId: Joi.string().custom(objectId),
  }),
};
