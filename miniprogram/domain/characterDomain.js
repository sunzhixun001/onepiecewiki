import {
  create,
  getDoc,
  getCollection,
  getCount,
  getListHasDevilfruit,
  getRegexp,
  pushFavorite,
  getListInGroup,
  getListByCondition,
  getCountByCondition,
  _c
} from '../database/characterRepository';
import regeneratorRuntime from '../common/regeneratorRuntime';
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
const getList = async ({ pageindex = 1, pagesize = 20, orderby}) => {
  const list_result = await getCollection({ 
    limit: pagesize,
    skip: (pageindex - 1) * pagesize, 
    orderby
  });
  const count_result = await getCount();
  return {
    data: list_result.data.map(c => {
      return {
        id: c._id,
        avator: c.avator,
        fullname: c.name,
        comment: c.fullname
      }
    }),
    total: count_result.total
  };
}
// 获取草帽团成员
const getStrawCharactersList = async () => {
  const characters = await fetchListInPriateReg({ priateRegimentName: '草帽海贼团'});
  return characters;
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
// 获取海贼
const getPirates = async ({ pageindex = 1, pagesize = 20, orderbys}) => {
  const condition = {
    role: 1
  };
  const list_result = await getListByCondition({ 
    limit: pagesize,
    skip: (pageindex - 1) * pagesize,
    condition,
    orderbys,
    field: {
      avator: true,
      fullname: true,
      bounty: true,
      priateRegimentName: true,
      job: true
    }
   });
  const count_result = await getCountByCondition({
    condition
  });
  return {
    data: list_result.data.map(c => {
      return {
        id: c._id,
        avator: c.avator,
        fullname: c.fullname,
        comment: `${c.priateRegimentName} ${c.job}`,
        sub: convertBounty({ bounty: c.bounty})
      }
    }),
    total: count_result.total
  };
};
// 获取海军
const getMarines = async ({ pageindex = 1, pagesize = 20, orderbys}) => {
  const condition = {
    role: 2
  };
  const list_result = await getListByCondition({
    condition,
    orderbys,
    limit: pagesize,
    skip: (pageindex - 1) * pagesize,
    field: {
      avator: true,
      fullname: true,
      levelName: true
    }
  });
  const count_result = await getCountByCondition({
    condition
  });
  return {
    data: list_result.data.map(c => {
      return {
        id: c._id,
        avator: c.avator,
        fullname: c.fullname,
        comment: c.levelName
      }
    }),
    total: count_result.total
  };
};
// 获取革命军
const getAntagonists = async ({ pageindex = 1, pagesize = 20, orderbys }) => {
  const condition = {
    role: 3
  };
  const list_result = await getListByCondition({
    condition,
    orderbys,
    limit: pagesize,
    skip: (pageindex - 1) * pagesize,
    field: {
      avator: true,
      fullname: true,
      position: true
    }
  });
  const count_result = await getCountByCondition({
    condition
  });
  return {
    data: list_result.data.map(c => {
      return {
        id: c._id,
        avator: c.avator,
        fullname: c.fullname,
        comment: c.position
      }
    }),
    total: count_result.total
  };
};
// 获取某一海贼团的全部成员
const fetchListInPriateReg = async ({ priateRegimentName}) => {
  const condition = { priateRegimentName };
  const list_result = await getListByCondition({
    condition, 
    orderbys: ['role', 'asc'],
    field: {
      avator: true,
      fullname: true,
      job: true
  }});
  const count_result = await getCountByCondition({ condition});
  return {
    data: list_result.data.map(c => {
      return {
        id: c._id,
        avator: c.avator,
        fullname: c.fullname,
        comment: c.job
      };
    }),
    total: count_result.total
  }
};
// 模糊搜索角色
const getSearch = async ({ keyword, field = {}}) => {
  const response = await getRegexp({ keyword, field});
  const { errMsg, data} = response;
  if (errMsg === "collection.get:ok") {
    return data;
  }
};
// 获取单个人物
const getCharacter = async ({ id}) => {
  const result = await getDoc({ id});
  return result.data;
};
const fetchListInGroup = ({ groupName, success, field = { avator: true} }) => {
  const promise = getListInGroup({ groupName, field});
  promise
  .then(res => {
    const { errMsg, data } = res;
    if (errMsg === "collection.get:ok"){
      success && success(data);
    }
  })
};
// 新增一个人物
const createCharacter = ({ biological, success}) => {
  const promise 
    = create({ biological})
    .then(res => {
      const { _id, errMsg } = res;
      success && success(errMsg === "collection.add:ok" && _id);
    });
};
export {
  createCharacter,
  getCharacter,
  getList,
  fetchListInGroup,
  getStrawCharactersList,
  fetchListInPriateReg,
  fetchListHasDevilfruit,
  getPirates,
  getMarines,
  getAntagonists,
  getSearch
};