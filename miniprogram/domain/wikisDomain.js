import {
  getList,
  getOne,
  getRegexp
} from '../database/wikisRepository';
const getWikiList = ({ pageIndex, pageSize, success }) => {
  let promise = getList({
    limit: pageSize,
    skip: (pageIndex - 1) * pageSize
  });
  promise
  .then(res => {
    const { errMsg, data} = res;
    if (errMsg === "collection.get:ok"){
      success(data);
    }
  });
};
const getOneWiki = ({ id, success}) => {
  let promise = getOne({ id});
  promise.then(res => {
    const { errMsg, data } = res;
    if (errMsg === "document.get:ok") {
      success(data);
    }
  });
};
// 模糊搜索
const getRegexpWikiList = ({ keyword, success }) => {
  let promise = getRegexp({ keyword });
  promise.then(res => {
    const { errMsg, data } = res;
    if (errMsg === "collection.get:ok") {
      success(data);
    }
  });
}
export {
  getWikiList,
  getOneWiki,
  getRegexpWikiList
}