import { getDatabase } from './common';

const collection = getDatabase().collection('biologicals');
export const create = ({ biological}) => {
  collection.add({
    data: biological
  })
  .then(res => {
    console.log(res);
  })
  .catch(err => {
    console.error(err);
  })
}
export const getList = ({success}) => {
  collection.get()
  .then(res => {
    success && success(res);
  })
  .catch(err => {

  })
}