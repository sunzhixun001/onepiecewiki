import {
  getCollection,
  getCount
} from '../database/eventsRepository';
import regeneratorRuntime from '../common/regeneratorRuntime';
const getEventList = async ({ lt, gte, pagesize = 20, pageindex = 1, field, tags }) => {
  const list_result = await getCollection({ 
    lt, 
    gte, 
    limit: pagesize, 
    skip: (pageindex - 1) * pagesize, 
    field,
    tags: tags ? [tags]:null
  });
  const count_result = await getCount({ lt, gte, tags: tags ? [tags] : null });
  return {
    data: list_result.data.map(current => {
      return {
        characters: [
          {
            avator: 'cloud://develop-6e54e7.6465-develop-6e54e7/characters/luffy.jpg',
            id: '6cd397ca5ce40fcb030b0406069e00b8'
          }
        ],
        ...current
      }
    }), 
    total: count_result.total
  };
};
export {
  getEventList
};