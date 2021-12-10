// 字典
import { database, request } from '../utils/request'
import '../common/regeneratorRuntime'

const collection = database.collection('dictionary')

const getStorys = () => {
  return request(collection.where({
    key: 'chapter'
  }))
}

export default {
  getStorys
}
