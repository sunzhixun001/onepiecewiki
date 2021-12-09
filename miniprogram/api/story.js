// 字典
import { request } from '../utils/request';
import '../common/regeneratorRuntime';

const collection = request.collection('dictionary');

const getStorys = () => {
  return collection.where({
    key: 'chapter'
  }).get()
}

export default {
  getStorys
}
