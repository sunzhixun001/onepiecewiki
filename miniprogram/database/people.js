import { getDatabase } from './common';

const collection = getDatabase().collection('biologicals');
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
export const update = ({ id, data, success}) => {
	collection.doc(id).update({
		data
	})
		.then(res => { success && success(res)})
		.catch(console.error);
}