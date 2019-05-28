// 事件
import { getDatabase } from './common';

const collection = getDatabase().collection('events');
// 获取全部事件列表
export const getList = ({ limit = 20, skip = 0, success}) => {
	collection
		.orderBy('age', 'asc')
    .limit(limit)
    .skip(skip)
		.get()
		.then(res => {
			success && success(res);
		})
		.catch(err => {

		});
}
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
}