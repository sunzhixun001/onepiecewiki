import { db } from './common';
import { BANNERS } from './collectionNames';
const collection = db.collection(BANNERS);
export const get = ({ id, success}) => {
  collection
    .doc(id)
    .get()
    .then(res => { success && success(res);})
    .catch();
};
export const getList = () => {
  const promise = 
  collection
    .get();
  return promise;
};