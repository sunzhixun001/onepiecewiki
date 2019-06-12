import {
  getList,
  getListInPriateReg,
  getListHasDevilfruit,
  getListOrderByBountyDesc,
  getRegexp,
  pushFavorite
} from '../database/characterRepository';
const convertBounty = ({ bounty }) => {
  let result = "";
  if (bounty < 10000) {
    result = `${bounty}贝利`;
  } else if (10000 <= bounty && bounty < 100000000) {
    result = `${bounty / 10000}万贝利`;
  } else {
    const billion = parseInt(bounty / 100000000);
    let tenthousand = 0;
    const remainder = bounty % 100000000;
    if (remainder > 0) {
      tenthousand = remainder / 10000;
    }
    result = `${billion > 0 ? billion + '亿' : ''}${tenthousand > 0 ? tenthousand + '万' : ''}贝利`;
  }
  return result;
}
const fetchList = ({ limit, skip, orderby, success}) => {
  const promise = getList({ limit, skip, orderby});
  promise
    .then(res => {
      success && success(res.data);
    })
    .catch();
}
// 获取草帽团成员
const fetchStrawCharactersList = ({ success, faild}) => {
  fetchListInPriateReg({ priateRegimentName: '草帽海贼团', success, faild });
};
// 获取有恶魔果实的人物
const fetchListHasDevilfruit = ({ limit = 20, skip = 0, success }) => {
  const promise = getListHasDevilfruit({ limit, skip });
  promise
    .then(res => {
      const data = res.data.map(c => {
        return {
          id: c._id,
          avator: c.avator,
          fullname: c.fullname,
          devilfruit: c.devilfruitType + ' ' + c.devilfruitName
        };
      });
      success && success(data);
    })
    .catch();
};
// 获取有赏金的人物
const fetchListOrderByBountyDesc = ({ limit = 20, skip = 0, success}) => {
  const promise = getListOrderByBountyDesc({ limit, skip });
  promise
    .then(res => {
      const data = res.data.map(c => {
        return {
          id: c._id,
          avator: c.avator,
          fullname: c.fullname,
          bounty: convertBounty({bounty: c.bounty})
        };
      });
      success && success(data);
    })
    .catch();
}
// 获取某一海贼团的全部成员
const fetchListInPriateReg = ({ priateRegimentName, success}) => {
  const promise = getListInPriateReg({ priateRegimentName });
  promise
    .then(res => {
      const data = res.data.map(c => {
        return {
          id: c._id,
          avator: c.avator,
          fullname: c.fullname,
          job: c.job
        };
      });
      success && success(data);
    })
    .catch();
};
// 模糊搜索角色
const fetchRegexp = ({ keyword, success}) => {
  const promise = getRegexp({ keyword});
  promise
    .then(res => {
      success && success(res.data);
    })
    .catch()
};
const fetchPushFavorite = ({id, charaid, avator, success}) => {
  let _obj = {};
  _obj[charaid] = avator;
  const values = [_obj];
  const promise = pushFavorite({ id, values});
  promise
    .then(res => {
      success && success(res);
    })
    .catch(err => {

    });
};
export {
  fetchList,
  fetchStrawCharactersList,
  fetchListInPriateReg,
  fetchListHasDevilfruit,
  fetchListOrderByBountyDesc,
  fetchRegexp,
  fetchPushFavorite
};