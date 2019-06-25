import { getBannerList} from '../../domain/bannersDomain';
import { getStoryList } from '../../domain/storysDomain';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    statusBarHeight: 0,
    banners: [],
    storys: [],
    pageIndex: 1,
    pageSize: 20
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({ statusBarHeight: getApp().globalData.statusBarHeight });
    this.fetchBannerList();
    this.fetchStoryList({pageIndex: this.data.pageIndex, pageSize: this.data.pageSize});
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
  fetchBannerList: function() {
    getBannerList({
      success: data => {
        this.setData({
          banners: data
        });
      }
    });
  },
  fetchStoryList: function ({ pageIndex, pageSize}) {
    getStoryList({
      pageIndex,
      pageSize,
      success: data => {
        this.setData({
          storys: data
        });
      }
    });
  },
  switchTimelineTab: function() {
    getApp().globalData.timeLineIndex = 2;
    wx.switchTab({
      url: '/pages/timeLine/timeLine',
    })
  }
})