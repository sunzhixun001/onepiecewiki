import { getDatabase } from './common';

const db = getDatabase();
const collection = db.collection('biologicals');
// 新增一个人物
export const create = ({ biological, success}) => {
  collection.add({
    data: biological
  })
  .then(res => {
		success && success(res);
  })
  .catch(err => {
    console.error(err);
  });
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
// 使用ID获取一个人物
export const get = ({id, success}) => {
	collection.where({
		_id: id
	}).get()
		.then(res => {
			success && success(res);
		})
		.catch()
}
// 修改一个人
export const update = ({ id, biological, success}) => {
	collection.doc(id)
    .update({data:biological})
		.then(res => { success && success(res)})
		.catch(console.error);
}
// 获取某一海贼团的全部人物
export const getListInPriateReg = ({ priateRegimentName, success}) => {
  collection
    .where({ priateRegimentName})
    .get()
    .then(res => {
      success && success(res);
    })
    .catch(err => {

    });
}
// 获取有恶魔果实的人物
export const getListHasDevilfruit = ({ success}) => {
  collection
    .where({ devilfruitName: db.command.neq("").and(db.command.neq(null)) })
    .get()
    .then(res => {
      success && success(res);
    })
    .catch(err => {

    });
}
// 按悬赏金降序排列索取所有人物 
export const getListOrderByBountyDesc = ({ success}) => {
  collection
    .where({ bounty: db.command.neq(null).and(db.command.gt(0)) })
    .orderBy('bounty', 'desc')
    .get()
    .then(res => {
      success && success(res);
    })
    .catch(err => {

    });
}