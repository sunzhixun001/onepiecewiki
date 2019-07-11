import { db } from './common';

const collection = db.collection('priateRegiments');
// 新增一个海盗团
export const create = ({ regiments, success }) => {
	collection.add({
		data: regiments
	})
		.then(res => {
			success && success(res);
		})
		.catch(err => {
			console.error(err);
		});
}
// 获取海贼团列表
export const getList = ({ success}) => {
	collection
		.orderBy('name', 'asc')
		.get()
		.then(res => {
			success && success(res);
		})
		.catch(err => {

		});
}