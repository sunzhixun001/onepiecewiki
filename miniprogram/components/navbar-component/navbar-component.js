// components/navbar/navbar.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    showCapsule: Boolean,
    title: String
  },

  /**
   * 组件的初始数据
   */
  data: {
    statusBarHeight: 0,
    share: false
  },
  attached: function() {
    this.setData({ 
      statusBarHeight: getApp().globalData.statusBarHeight,
      share: getApp().globalData.share 
    });
  },
  /**
   * 组件的方法列表
   */
  methods: {
    bindBackTap: function(e){
      wx.navigateBack({
        
      });
    }
  }
})
