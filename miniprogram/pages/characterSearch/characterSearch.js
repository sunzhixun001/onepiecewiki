import { fetchRegexp } from '../../domain/characterDomain';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    characters: [],
    statusBarHeight: 0,
    searchInputHeight: 88,
    keyword: '',
    nochara: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      keyword: options.keyword,
      statusBarHeight: getApp().globalData.statusBarHeight
    });
    this.getCharacters({ keyword: options.keyword });
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
  bindKeyWord: function(e) {
    this.setData({ keyword: e.detail.value});
  },
  bindSearch: function(e) {
    this.getCharacters({ keyword: this.data.keyword});
  },
  getCharacters: function ({ keyword}) {
    fetchRegexp({
      keyword: keyword || '路飞'
    }).then(res => {
      this.setData({
        characters: res,
        nochara: res.length === 0
      });
    });
  }
})