import { db } from './common';
const collection = db.collection('storys');
const getList = ({ limit, skip}) => {
  const promise = 
    collection
      .skip(skip)
      .limit(limit)
      .get();
  return promise;
};
export {
  getList
};