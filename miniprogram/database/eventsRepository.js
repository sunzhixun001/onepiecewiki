// 事件
import { db } from './common';
const collection = db.collection('events');
// 获取一个事件
export const get = ({ id, success}) => {
  collection
    .where({
      _id: id
    })
    .get()
    .then(res => {
      success && success(res);
    })
    .catch()
};
// 获取全部事件列表
export const getList = ({ lt, gte, limit = 20, skip = 0, field}) => {
  let _collection = 
    collection
      .where({
        age: db.command.lt(lt).and(db.command.gte(gte))
      })
      .orderBy('age', 'asc')
      .limit(limit)
      .skip(skip);
  if (field){
    _collection = _collection.field(field)
  } 
  let promise = _collection.get();
  return promise;
};
// 新增一个事件
export const create = ({ event, success}) => {
  collection.add({
    data: event
  })
    .then(res => {
      success && success(res);
    })
    .catch(err => {
      console.error(err);
    });
};
// 修改一个事件
export const update = ({ id, event, success }) => {
  collection
    .doc(id)
    .update({ data: event })
    .then(res => { success && success(res) })
    .catch(console.error);
}
// 模糊查询事件
export const getRegexp = ({ keyword, limit = 20, skip = 0, success}) => {
  collection
    .where({
      title: db.RegExp({
        regexp: `.*${keyword}.*`,
        options: 'i'
      })
    })
    .orderBy('age', 'asc')
    .limit(limit)
    .skip(skip)
    .get()
    .then(res => {
      success && success(res);
    })
    .catch(err => {

    });
};