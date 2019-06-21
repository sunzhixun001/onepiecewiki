import { getDatabase } from './common';
const collection = getDatabase().collection('storys');
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