import { db } from './common';
const collection = db.collection('wikis');
// 获取单个详情
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
        title: db.RegExp({
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
// 获取总数
const getCount = () => {
  const promise = 
    collection.count();
  return promise;
}
export {
  getCount,
  getList,
  getOne,
  getRegexp
};