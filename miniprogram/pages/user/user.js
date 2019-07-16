import { getOpenId } from '../../cloud/userCloud';
import regeneratorRuntime from '../../common/regeneratorRuntime';
import { 
  fetchUserWithOpenId, 
  createUser, 
  existOpenid, 
  fetchFavorites,
  getUserPermissions
} from '../../domain/userDomain';
import {
  create,
  getWithOpenId
} from '../../database/userRepository';
import { setStorage, getStorage} from '../../common/storage';
const { scopeUserInfo, statusBarHeight, openid, userid } = getApp().globalData;
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
    scopeUserInfo: scopeUserInfo || false,
    statusBarHeight: statusBarHeight,
    openid: openid,
    favorites: [],
    messages: [],
    favoriteSwiperItemHeight: 0,
    swiperCurrent: 0,
    permissions: [],
    userid: userid || ''
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
    if (userid){
      this.fetchGetFavorites({ userid});
      this.fetchPermissions({ userid });
    }
	},

	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	onReady: function () {

	},

	/**
	 * 生命周期函数--监听页面显示
	 */
	onShow: function () {

	},

	/**
	 * 生命周期函数--监听页面卸载
	 */
	onUnload: function () {

	},

	/**
	 * 页面相关事件处理函数--监听用户下拉动作
	 */
	onPullDownRefresh: function () {
    if (this.data.userid) {
      this.fetchGetFavorites({ userid: this.data.userid });
    }
	},
  // 点击登录
  bindGetUserInfo: function(e) {
    
    // encryptedData: ""
    // errMsg: "getUserInfo:ok"
    // iv: "Xj4r/v35O4tMJdfNarUUGw=="
    // rawData: ""
    // signature: "8e8358cb9db7925e6000e7e12d27a8d115afe927"
    const { encryptedData, errMsg, iv, rawData, signature, userInfo} = e.detail;
    // const { avatarUrl, city, country, gender, language, nickName, province } = userInfo || {};
    if (errMsg === "getUserInfo:ok"){
      this.setData({ scopeUserInfo: true });
      getApp().globalData.scopeUserInfo = true;
      const it = this.getUserInfoGen({ openid: getApp().globalData.openid});
      const user = it.next();
      user.value.then(res => {
        const userData = it.next(res);
        if (userData.value){
          const { _id, favorites } = userData.value;
          setStorage({ key: 'userid', data: _id });
          getApp().globalData.userid = _id;
          getApp().globalData.favorites = favorites;
          this.setData({ userid: _id });
          this.setDataFavorites({ favorites: favorites });
        } else{
          const createUserPromise = it.next(userInfo);
          createUserPromise.value.then(createRes => {
            if (createRes.errMsg === "collection.add:ok" && createRes._id){
              this.setData({ userid: createRes._id });
              it.next(createRes._id);
            }
          });
        }
      });
    }

  },
  getUserInfoGen: function* ({ openid}){
    const getWithOpenIdRes = yield getWithOpenId({ openid})
    const userinfo = yield (
      getWithOpenIdRes.errMsg === "collection.get:ok" 
      && getWithOpenIdRes.data.length > 0 
      && getWithOpenIdRes.data[0]) || false;
    const userid = yield create({ user: userinfo});
    setStorage({ key: 'userid', data: userid });
    
  },
  // 把用户信息写入缓存
  setUserInfoStorage: function({userinfo}) {
    setStorage({
      key: "userinfo",
      data: userinfo
    });
  },
  // 从小程序API开放接口获取用户信息
  getUserInfoOpenApi: function ({ openid }) {
    this.getSetting({
      yes: res => {
        const { userInfo} = res;
        const { nickName, avatarUrl, gender, province, city, country } = userInfo;
        this.createUser({user: {
          nickName, avatarUrl, gender, province, city, country
        }});
      }, 
      no: () => {
        console.log('需要授权用户信息');
      }});
  },
  // 判断是否已获得用户信息权限
  getSetting: function ({yes, no}) {
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          this.setData({ scopeUserInfo: true });
          yes && yes(res);
        }else{
          no && no();
        }
      },
      fail: err => {
        no && no();
      }
    });
  },
  // 创建数据库用户信息
  fetchCreateUser: function({user}) {
    createUser({ 
      user,
      success: res => {
        const { errMsg, _id} = res;
        if (errMsg === "collection.add:ok" && _id){
          this.setData({ userid: _id});
          setStorage({ key: 'userid', data: _id});
        }
      }
    });
  },
  // 用openid从数据库获取用户信息
  fetchGetUserWithOpenId: function ({ openid}) {
    fetchUserWithOpenId({
      openid, success: res => {
        const { data, errMsg } = res;
        if (errMsg === 'collection.get:ok') {
          if (data && data.length > 0) {
            const _user = data[0];
            this.setData({ scopeUserInfo: true });
            this.setUserInfoStorage({ userinfo: _user });
          } else {
            //没有记录
          }
        }
      }, fail: err => {
        console.err(res);
      }
    });
  },
  fetchGetFavorites: function ({ userid}) {
    fetchFavorites({
      userid,
      success: res => {
        this.setDataFavorites({ favorites: res});
      }
    });
  },
  fetchPermissions: function ({ userid }) {
    getUserPermissions({ userid, success: data => {
      const { permissions} = data;
      this.setData({ permissions});
    }});
  },
  setDataFavorites: function ({ favorites}) {
    let _favorites = [];
    for (let k in favorites) {
      _favorites.push({
        id: k,
        avator: favorites[k]
      });
    }
    this.setData({
      favorites: _favorites,
      favoriteSwiperItemHeight: Math.ceil(_favorites.length / 3) * 190
    }, () => {
      wx.stopPullDownRefresh();
    });
  },
  bindSwiperChange: function(e) {
    const { current, source } = e.detail;
    this.setData({swiperCurrent: current});
  },
  bindSwiperTabTap: function(e) {
    const { index} = e.currentTarget.dataset;
    this.setData({ swiperCurrent: index});
  }
})