// 团体
import { getDatabase } from './common';
const collection = getDatabase().collection('groups');
// 获取全部团体列表
export const getList = ({ success }) => {
  collection
    .get()
    .then(res => {
      success && success(res);
    })
    .catch(err => {

    });
}

