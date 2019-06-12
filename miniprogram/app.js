import { phonePx} from './common/implement';
App({
  onLaunch: function () {
    this.globalData = {};
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
        this.globalData.statusBarHeight = statusBarHeight + 44;
      }
    });
  }
})
