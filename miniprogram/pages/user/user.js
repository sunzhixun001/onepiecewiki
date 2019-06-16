import { getOpenId} from '../../cloud/userCloud';
import { fetchUserWithOpenId, createUser, existOpenid, fetchFavorites } from '../../domain/userDomain';
import { setStorage, getStorage} from '../../common/storage';

Page({

	/**
	 * 页面的初始数据
	 */
	data: {
    scopeUserInfo: false,
    statusBarHeight: 0,
    openid: '',
    favorites: [],
    messages: [],
    favoriteSwiperItemHeight: 0,
    swiperCurrent: 0
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
    const { scopeUserInfo, statusBarHeight, openid, userid } = getApp().globalData;
    this.setData({
      scopeUserInfo: scopeUserInfo || false,
      statusBarHeight: statusBarHeight,
      openid,
      userid: userid || ''
    });
    if(userid){
      this.fetchGetFavorites({userid});
    }
    // this.getOpenIdStorage();
    
    // this.getSetting();
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
	 * 生命周期函数--监听页面隐藏
	 */
	onHide: function () {

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

	/**
	 * 页面上拉触底事件的处理函数
	 */
	onReachBottom: function () {

	},

	/**
	 * 用户点击右上角分享
	 */
	onShareAppMessage: function () {

	},
  authUserInfo: function() {

  },
  // 点击登录
  bindGetUserInfo: function(e) {
    // encryptedData: ""
    // errMsg: "getUserInfo:ok"
    // iv: "Xj4r/v35O4tMJdfNarUUGw=="
    // rawData: ""
    // signature: "8e8358cb9db7925e6000e7e12d27a8d115afe927"
    const { encryptedData, errMsg, iv, rawData, signature, userInfo} = e.detail;
    const { avatarUrl, city, country, gender, language, nickName, province } = userInfo || {};
    if (errMsg === "getUserInfo:ok"){
      const _userinfo = { avatarUrl, city, country, gender, language, nickName, province, openid: getApp().globalData.openid };
      this.setData({ scopeUserInfo: true });
      getApp().globalData.scopeUserInfo = true;
      existOpenid({ 
        openid: getApp().globalData.openid,
        success: result => {
          if (result){
            getApp().globalData.userid = result.userid;
            setStorage({ key: 'userid', data: result.userid });
            this.setData({ userid: result.userid });
            getApp().globalData.favorites = result.favorites;
            this.setDataFavorites({ favorites: result.favorites});
          }else{
            this.fetchCreateUser({ user: _userinfo });
          }
        }
      });
    }

  },
  // 从云函数获取openid
  fetchOpenIdCloud: function() {
    getOpenId({
      success: result => {
        const { openid} = result;
        setStorage({ key: 'openid', data: openid});
        this.fetchGetUserWithOpenId({ openid});
      },
      fail: err => {

      }
    });
  },
  // 从缓存获取openid
  getOpenIdStorage: function() {
    getStorage({
      key: 'openid',
      successCallback: value => {
        this.setData({ openid: value});
        this.getUserInfoStorage({ openid: value});
      },
      failCallback: err => {
        this.fetchOpenIdCloud();
      }
    });
  },
  // 从缓存获得用户信息
  getUserInfoStorage: function ({ openid}) {
    getStorage({
      key: 'userinfo',
      successCallback: res => {
        this.setData({
          scopeUserInfo: true
        });
      },
      failCallback: err => {
        // 缓存中没有用户信息
        this.getUserInfoOpenApi({ openid });
      }
    });
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