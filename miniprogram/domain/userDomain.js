import {
  getWithOpenId,
  create,
  countOpenId,
  updateFavorite,
  getFavorites,
  getPermissions
} from '../database/userRepository';
// 用openid查找一个用户
const fetchUserWithOpenId = ({ openid, success, fail}) => {
  const promise = getWithOpenId({ openid});
  promise
    .then(res => {
      success && success(res);
    })
    .catch(err => {
      fail && fail(err);
    });
};
const createUser = ({user, success}) => {
  const promise = create({ user});
  promise
    .then(res => {
      success && success(res);
    })
};
// 指定openid的用户在数据库是否存在
const existOpenid = ({ openid, success}) => {
  const promise = getWithOpenId({ openid});
  promise
  .then(res => {
    const { errMsg, data} = res;
    if (errMsg === "collection.get:ok" && data.length > 0){
      success({
        userid: data[0]._id,
        favorites: data[0].favorites
      });
    }else{
      success(false);
    }
  })
  .catch();
};
// 更新收藏
const fetchUpdateFavorite = ({ userid, favorites, success }) => {
  const promise = updateFavorite({ userid, favorites });
  promise
    .then(res => {
      const { errMsg, stats } = res;
      success && success(errMsg === "document.update:ok" && stats.updated);
    })
    .catch(err => {
      console.log('更新失败: ', err);
    });
};
// 用一个人物id查看是否收藏了这个人物
const checkHadFavoriteCharaId = () => {

};
// 获取用户的全部收藏
const fetchFavorites = ({ userid, success, fail }) => {
  const promise = getFavorites({ userid});
  promise
    .then(res => {
      const { favorites} = res.data;
      success(favorites || {});
    })
    .catch(err => {
      // errCode: -1
      // errMsg "document.get:fail Error: cannot find document with _id 123, please make sure that the document exists and you have the corresponding access permission; at document.get api; "
      const { errCode, errMsg} = err;
      fail && fail(errCode);
    });
};
// 获取用户的管理权限
const getUserPermissions = ({ userid, success}) => {
  let promise = getPermissions({ userid});
  promise
  .then(res => {
    const { data, errMsg } = res;
    if (errMsg === "document.get:ok"){
      success(data);
    }
  });
};
export {
  fetchUserWithOpenId, 
  createUser, 
  existOpenid,
  fetchUpdateFavorite,
  fetchFavorites,
  getUserPermissions
};