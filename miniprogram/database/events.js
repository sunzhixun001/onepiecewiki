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