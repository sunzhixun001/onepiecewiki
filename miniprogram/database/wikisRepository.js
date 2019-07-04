import { getDatabase } from './common';
const db = getDatabase();
const collection = db.collection('wikis');
const getOne = ({id}) => {
  let promise =
    collection
      .doc(id)
      .get();
  return promise;
};
const getList = ({limit, skip}) => {
  let promise = 
    collection
    .skip(skip)
    .limit(limit)
    .field({title: true, cover: true})
    .get();
  return promise;
};
// 模糊搜索
const getRegexp = ({ keyword }) => {
  const promise =
    collection
      .where({
        fullname: db.RegExp({
          regexp: `.*${keyword}.*`,
          options: 'i'
        })
      })
      .field({
        cover: true,
        title: true
      })
      .get();
  return promise;
};
export {
  getList,
  getOne,
  getRegexp
};