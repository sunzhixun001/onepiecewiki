// 广告
import { db } from './common';
import regeneratorRuntime from '../common/regeneratorRuntime';

export const _c = db.command;

const collection = db.collection('advertisement');

export const getList = async () => {
   const response = await collection.where({
     display: true
   }).get();
   return Promise.resolve(response.data);
  //  console.log('response', response);
};