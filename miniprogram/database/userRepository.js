import { getDatabase } from './common';
const db = getDatabase();
const collection = db.collection('user');

const getWithOpenId = ({openid}) => {
  const promise = 
    collection
    .where({ openid})
    .get();
  return promise;
};
const create = ({user}) => {
  const promise = 
  collection.add({
    data: user
  });
  return promise;
};
export { getWithOpenId, create};