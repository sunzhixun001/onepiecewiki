// 字典
import { db } from './common';
import regeneratorRuntime from '../common/regeneratorRuntime';

export const _c = db.command;

const collection = db.collection('dictionary');

export const getDoc = async key => {
  const response = await collection.where({
    key: key
  }).get();
  return Promise.resolve(response.data);
};