import {
  getWithOpenId,
  create,
  countOpenId,
  updateFavorite,
  getFavorites
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
const fetchFavorites = ({ userid, success }) => {
  const promise = getFavorites({ userid});
  promise
    .then(res => {
      const { favorites} = res.data;
      success(favorites || {});
    });
}
export {
  fetchUserWithOpenId, 
  createUser, 
  existOpenid,
  fetchUpdateFavorite,
  fetchFavorites
};