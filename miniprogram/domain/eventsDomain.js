import {
  getList
} from '../database/eventsRepository';
const getEventList = ({ lt, gte, limit = 20, skip = 0, field, success }) => {
  let promise = getList({ lt, gte, limit, skip, field });
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