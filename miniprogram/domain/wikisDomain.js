import regeneratorRuntime from '../common/regeneratorRuntime';
import {
  getCount,
  getList,
  getDoc,
  getRegexp
} from '../database/wikisRepository';
// 获取列表
const getWikiList = async ({ pageindex = 1, pagesize = 20 }) => {
  let countPromise = getCount();
  let listPromise = getList({
    limit: pagesize,
    skip: (pageindex - 1) * pagesize
  });
  let countResult = await countPromise;
  let dataResult = await listPromise;
  return {
    total: countResult.total, 
    data: dataResult.data
  };
};
// 获取单个
const getOneWiki = async ({ id }) => {
  let response = await getDoc({ id});
  const { errMsg, data } = response;
  if (errMsg === "document.get:ok") {
    return data;
  }
};
// 模糊搜索
const searchWikiList = async ({ keyword }) => {
  const result = await getRegexp({ keyword });
  return result.data;
}
// 获取总记录数
const getTotal = async () => {
  let response = await getCount();
  let total = response.total;
  return total;
}
// 获取wiki的相关人物
const getWikiCharacters = async ({ id}) => {
  const response = await getDoc({ id});
  const { errMsg, data } = response;
  if (errMsg === "document.get:ok") {
    const { characters } = data
    return characters;
  }
};
export {
  getWikiList,
  getOneWiki,
  searchWikiList,
  getTotal,
  getWikiCharacters
}