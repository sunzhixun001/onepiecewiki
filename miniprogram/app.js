import { phonePx} from './common/implement';
App({
  onLaunch: function () {
    
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        traceUser: true,
      })
    }
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
        // this.globalData = { statusBarHeight: phonePx({ px: statusBarHeight + 44, width: screenWidth})};
        this.globalData = { statusBarHeight: statusBarHeight + 44 };
      }
    });
  }
})
