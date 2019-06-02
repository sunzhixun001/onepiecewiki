import { getDatabase } from './common';
import { BANNERS } from './collectionNames';

const db = getDatabase();
const collection = db.collection(BANNERS);
export const get = ({ id, success}) => {
  collection
    .doc(id)
    .get()
    .then(res => { success && success(res);})
    .catch();
};
export const getList = ({ success }) => {
  collection
    .get()
    .then(res => {
      success && success(res);
    })
    .catch()
};