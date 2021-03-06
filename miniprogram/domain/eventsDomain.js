import {
  getList
} from '../database/eventsRepository';
const getEventList = ({ lt, gte, pageSize = 20, pageIndex = 0, field, success, tag }) => {
  let promise = getList({ 
    lt, 
    gte, 
    limit: pageSize, 
    skip: (pageIndex - 1) * pageSize, 
    field,
    tag 
  });
  promise
  .then(res => {
    const { data, errMsg} = res;
    if (errMsg === "collection.get:ok"){
      success(data);
    }
  });
};
export {
  getEventList
};