import { getDatabase } from './common';

const collection = getDatabase().collection('biologicals');
export const create = ({ biological, success}) => {
  collection.add({
    data: biological
  })
  .then(res => {
		success && success(res);
  })
  .catch(err => {
    console.error(err);
  })
}
// 获取全部人物
export const getList = ({success}) => {
  collection.get()
  .then(res => {
    success && success(res);
  })
  .catch(err => {

  });
}