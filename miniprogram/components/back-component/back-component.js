// components/back-component/back-component.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    share: getApp().globalData.share
  },
  attached: function() {
    this.setData({
      share: getApp().globalData.share
    });
  },
  /**
   * 组件的方法列表
   */
  methods: {
    bindBackTap: function (e) {
      if(this.data.share){
        wx.switchTab({
          url: "/pages/home/homePage",
        })
      }else{
        wx.navigateBack({

        });
      }
    }
  }
})
