import { db } from './common';
import regeneratorRuntime from '../common/regeneratorRuntime';

const collection = db.collection('wikis');
// 获取单个详情
const getDoc = ({id}) => {
  let promise =
    collection
      .doc(id)
      .get();
  return promise;
};
const getList = async ({limit, skip}) => {
  let result = 
  await collection
  .skip(skip)
  .limit(limit)
  .field({title: true, cover: true})
  .get();
  return result;
};
// 模糊搜索
const getRegexp = async ({ keyword }) => {
  const result =
  await collection
      .where({
        title: db.RegExp({
          regexp: `.*${keyword}.*`,
          options: 'i'
        })
      })
      .field({
        cover: true,
        title: true,
        summary: true
      })
      .get();
  return result;
};
// 获取总数
const getCount = async () => {
  const result = await collection.count();
  return result;
}
export {
  getCount,
  getList,
  getDoc,
  getRegexp
};