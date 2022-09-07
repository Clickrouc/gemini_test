import Joi from 'joi';

export const createProxy = {
  body: Joi.object().keys({
    name: Joi.string().required(),
  }),
};

export const getProxies = {
  query: Joi.object().keys({
    name: Joi.string(),
    sortBy: Joi.string(),
    projectBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};
