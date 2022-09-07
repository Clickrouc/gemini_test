import * as _ from 'lodash';

export const convertError = (error: any): string => error?.data?.message || error?.error;

export const cookieConverter = (
  object: { [key: string]: any },
  toDot?: boolean,
): { [key: string]: any } => {
  const obj = { ...object };
  _.forOwn(obj, (value: any, key: string) => {
    if (_.includes(key, toDot ? '[dot]' : '.')) {
      const cleanKey = _.replace(
        key,
        toDot ? /\[dot]/g : /\./g,
        toDot ? '.' : '[dot]',
      );
      obj[cleanKey] = value;
      delete obj[key];
    }

    if (_.isObject(value)) {
      return cookieConverter(value);
    }
    return null;
  });
  return obj;
};
