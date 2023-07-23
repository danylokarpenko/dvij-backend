import { ILike } from 'typeorm';

export function queryToFindOperators(query) {
  return Object.entries(query).reduce((acc, [key, value]) => {
    if (value === 'false' || value === 'true') {
      return { ...acc, [key]: value };
    }
    if (!isNaN(Number(value))) {
      return { ...acc, [key]: Number(value) };
    }
    if (typeof value === 'string') {
      return { ...acc, [key]: ILike(`%${value}%`) };
    }
    return { ...acc, [key]: value };
  }, {});
}
