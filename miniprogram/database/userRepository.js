import { db } from './common';
const collection = db.collection('user');

// 用openid查找一个用户
const getWithOpenId = ({ openid}) => {
  const promise = 
    collection
      .where({ _openid: openid})
    .get();
  return promise;
};
const create = ({ user}) => {
  const promise = 
  collection.add({
      data: user
  });
  return promise;
};
// 查询一个openid的数量
const countOpenId = ({openid}) => {
  const promise = 
  collection
      .where({ _openid: openid})
    .count();
  return promise;
}
// 更新收藏
const updateFavorite = ({ userid, favorites }) => {
  const promise =
    collection
      .doc(userid)
      .update({
        data: {
          favorites: db.command.set(favorites)
        }
      });
  return promise;
};
// 用一个人物id查看是否收藏了这个人物
const getFavoriteWithCharaId = () => {

};
// 获取用户的全部收藏
const getFavorites = ({ userid}) => {
  const promise = 
  collection
    .doc(userid)
    .field({favorites: true})
    .get();
  return promise;
};
// 获取用户的管理权限
const getPermissions = ({ userid }) => {
  const promise =
    collection
      .doc(userid)
      .field({ permissions: true })
      .get();
  return promise;
};
export { 
  getWithOpenId, 
  create, 
  countOpenId, 
  updateFavorite,
  getFavoriteWithCharaId,
  getFavorites,
  getPermissions
};