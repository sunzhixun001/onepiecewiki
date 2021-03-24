import { phonePx, px2rpx} from './common/implement';
import { getOpenId, getUserId } from './common/auth';
import regeneratorRuntime from './common/regeneratorRuntime';
import {
  setStorage,
  getStorage
} from './common/storage.js';
App({
  _favorites: {},
  globalData: {
    showImage: false
  },
  onLaunch: function (options) {
    let globalDataObj = this.globalData;
    Object.defineProperty(globalDataObj, 'favorites', {
      set: value => {
        this._favorites = value;
        this.watchBallBack["favorites"] && this.watchBallBack["favorites"](value);
      },
      get: () => {
        return this._favorites;
      }
    });
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        traceUser: true,
      })
    }
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          this.globalData.scopeUserInfo = true;
        } else {
          this.globalData.scopeUserInfo = false;
        }
      },
      fail: err => {
        this.globalData.scopeUserInfo = false;
      }
    });
    wx.getSystemInfo({
      success: res => {
        console.log('systemInfo: ', res);
        const {
          screenHeight,
          screenWidth,
          windowHeight,
          windowWidth,
          statusBarHeight
        } = res;
        // this.globalData.statusBarHeight = px2rpx({ px: statusBarHeight, screenWidth}) + 88;
        this.globalData.statusBarHeight = statusBarHeight + 44;
        this.globalData.screenHeight = screenHeight;
        this.globalData.screenWidth = screenWidth;
        this.globalData.windowHeight = windowHeight;
      }
    });
    wx.getNetworkType({
      success: (result) => {
        wx.showToast({
          title: result.networkType,
        })
      },
    })
    getOpenId({
      gotCallback: value => {
        this.globalData.openid = value;
      }
    });
    getUserId({
      gotCallback: value => {
        this.globalData.userid = value;
      }
    });
    
    this.globalData.share = (options.scene === 1007 || options.scene === 1008);
    // getAdvertisements();
  },
  onShow: function (options){
    this.globalData.share = (options.scene === 1007 || options.scene === 1008);
  },
  $watch({ method}) {

  },
  watchBallBack: {},
  setStorage: setStorage,
  getStorage: getStorage
})
