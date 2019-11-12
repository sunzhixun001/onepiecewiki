import regeneratorRuntime from '../common/regeneratorRuntime';
import { db } from './common';
const collection = db.collection('biologicals');
export const _c = db.command;
// 新增一个人物
export const create = ({ biological, success}) => {
  const promise = 
  collection.add({
    data: biological
  });
  return promise;
};
// 获取全部人物
export const getList = ({ limit = 20, skip = 0, orderby = ['pinyinName', 'asc']}) => {
  let promise = 
  collection
    .orderBy(...orderby)
    .limit(limit)
    .skip(skip)
    .field({name: true, fullname: true, avator: true})
    .get();
  return promise;
};
// 获取全部人物需要的字段
export const getListField = ({ fields, success }) => {
  collection
    .field(fields)
    .get()
    .then(res => {
      success && success(res);
    })
    .catch(err => {

    });
};
// 使用ID获取一个人物
export const getCharacter = ({id}) => {
  const promise = 
  collection
    .doc(id)
    .get();
  return promise;
};
// 修改一个人
export const update = ({ id, biological, success}) => {
	collection
    .doc(id)
    .update({data:biological})
		.then(res => { success && success(res)})
		.catch(console.error);
};
// 获取有恶魔果实的人物
export const getListHasDevilfruit = ({ limit = 20, skip = 0}) => {
  const promise =  
  collection
    .where({ devilfruitName: db.command.neq("").and(db.command.neq(null)) })
    .limit(limit)
    .skip(skip)
    .field({
      avator: true,
      fullname: true,
      devilfruitName: true,
      devilfruitType: true
    })
    .get();
  return promise;
};
// 按悬赏金降序排列索取所有人物 
export const getListOrderByBountyDesc = ({ limit = 20, skip = 0}) => {
  const promise = 
  collection
    .where({ bounty: db.command.neq(null).and(db.command.gt(0)) })
    .orderBy('bounty', 'desc')
    .limit(limit)
    .skip(skip)
    .field({
      avator: true,
      fullname: true,
      bounty: true
    })
    .get();
  return promise;
};
// 获取某一团体下的所有成员
export const getListInGroup = ({ groupName, field}) => {
  const promise =
  collection
    .where(db.command.or([{ 
        group: db.RegExp({
          regexp: `.*${groupName}.*`,
          options: 'i'
        })
      },{
        fullname: db.RegExp({
          regexp: `.*${groupName}.*`,
          options: 'i'
        })
      }
    ]))
    .field(field)
    .get();
  return promise;
};
// 模糊搜索角色
export const getRegexp = ({ keyword}) => {
  const promise = collection.where(db.command.or(
    [{
      fullname: db.RegExp({
        regexp: `.*${keyword}.*`,
        options: 'i'
      })
    }, {
        group: db.RegExp({
          regexp: `.*${keyword}.*`,
          options: 'i'
        })
    }]
  ))
    .field({
      avator: true,
      fullname: true,
      priateRegimentName: true
    })
    .get();
  return promise;
};
// 按条件查询列表
export const getListByCondition = async ({ condition, field, limit = 20, skip = 0}) => {
  const result =
    await collection
      .where({ ...condition })
      .skip(skip)
      .limit(limit)
      .field({ ...field })
      .get();
  return result;
}
// 按条件查询数量
export const getCountByCondition = async({ condition}) => {
  const result =
    await collection
      .where({ ...condition })
      .count();
  return result;
};