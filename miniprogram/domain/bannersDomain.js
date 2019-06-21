import {
  getList
} from '../database/bannersRepository.js';
const getBannerList = ({ success}) => {
  let promise = getList();
  promise
  .then(res => {
    const { errMsg, data} = res;
    if (errMsg === "collection.get:ok")
      success(data);
  })
};
export { 
  getBannerList
};