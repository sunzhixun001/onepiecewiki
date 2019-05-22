// 事件
import { getDatabase } from './common';

const collection = getDatabase().collection('events');
// 获取全部事件列表
export const getList = ({ success}) => {
	collection.get()
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