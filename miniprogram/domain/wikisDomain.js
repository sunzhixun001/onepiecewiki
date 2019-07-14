import regeneratorRuntime from '../common/regeneratorRuntime';
import {
  getList,
  getOne,
  getRegexp
} from '../database/wikisRepository';
const g = function* (p, success) {
  try {
    const res = yield p;
    // res: { data: Array(20), errMsg: "collection.get:ok"}
    success(res.data);
  } catch (e) {
    console.log(e);
  }
};
function run(generator, p, success) {
  const it = generator(p, success);
  function go(result) {
    // result:
    // 第一次 value: Promise, done: false
    // 第二次 value: undefined, done: true
    if (result.done) return result.value;
    return result.value.then(function (value) {
      return go(it.next(value));
    });
  };
  // return Promise
  // [[PromiseStatus]]: "resolved"
  // [[PromiseValue]]: undefined
  go(it.next());
}
const getWikiList = ({ pageIndex, pageSize, success }) => {
  let promise = getList({
    limit: pageSize,
    skip: (pageIndex - 1) * pageSize
  });
  // return undefined
  run(g, promise, success);
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