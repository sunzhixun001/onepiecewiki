import regeneratorRuntime from '../common/regeneratorRuntime';
import {
  getList,
  getOne,
  getRegexp
} from '../database/wikisRepository';
const g = function* (promise) {
  try {
    promise.then(function(res){
      yield res;
    });
    // res: { data: Array(20), errMsg: "collection.get:ok"}
    return res.data;
  } catch (e) {
    console.log(e);
  }
};
function run(generator, promise) {
  const it = generator(promise);
  function go(promise) {
    // result:
    // 第一次 value: Promise, done: false
    // 第二次 value: undefined, done: true
    if (promise.done) return promise.value;
    return promise.value.then(function (value) {
      console.log("value", value);
      console.log("it.next(value)", it.next(value));
    });
  };
  // return Promise
  // [[PromiseStatus]]: "resolved"
  // [[PromiseValue]]: undefined
  let res = go(it.next());
  console.log("res", res);
}
// 获取列表
const getWikiList = ({ pageIndex, pageSize, success }) => {
  let promise = getList({
    limit: pageSize,
    skip: (pageIndex - 1) * pageSize
  });
  const it = generator(promise);
  console.log("1:", it.next());
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
export {
  getWikiList,
  getOneWiki,
  getRegexpWikiList
}