import regeneratorRuntime from '../common/regeneratorRuntime';
import {
  getCount,
  getList,
  getOne,
  getRegexp
} from '../database/wikisRepository';
// 获取列表
const getWikiList = async ({ pageindex = 1, pageSize = 20 }) => {
  let response = await getList({
    limit: pageSize,
    skip: (pageindex - 1) * pageSize
  });
  let data = response.data;
  return data;
  // promise.then(res => {
  //   const { errMsg, data } = res;
  //   if (errMsg === "collection.get:ok") {
  //     success(data);
  //   }
  // });
};
// 获取单个
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
// 获取总记录数
const getTotal = async () => {
  let response = await getCount();
  let total = response.total;
  return total;
}
export {
  getWikiList,
  getOneWiki,
  getRegexpWikiList,
  getTotal
}