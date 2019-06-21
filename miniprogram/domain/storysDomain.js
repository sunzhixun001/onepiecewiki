import {
  getList
} from '../database/storysRepository';
const getStoryList = ({ pageIndex, pageSize, success}) => {
  let promise = getList({
    limit: pageSize, 
    skip: (pageIndex - 1) * pageSize
  });
  promise
  .then(res => {
    const { errMsg, data } = res;
    if (errMsg === "collection.get:ok"){
      let _data = data.map(d => {
        d.height = 150 + Math.round(Math.random() * (250 - 150));
        return d;
      });
      success && success(_data);
    }
  })
};
export {
  getStoryList
};