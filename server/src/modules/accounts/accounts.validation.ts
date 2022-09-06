import Joi from 'joi';

export const createUser = {
  body: Joi.object().keys({
    disabled: Joi.boolean().required(),
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
    userAgent: Joi.string(),
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
