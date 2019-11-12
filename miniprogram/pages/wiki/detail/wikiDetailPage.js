import { getOneWiki } from '../../../domain/wikisDomain';
const { statusBarHeight, screenWidth} = getApp().globalData;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    barHeight: statusBarHeight,
    title: '',
    summary: [],
    album: [],
    albumHeight: screenWidth * 0.625,
    characters: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.fetchWiki({ id: options.id });
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
  fetchWiki: function ({ id}){
    getOneWiki({
      id
    }).then(data => {
      const { summary, album, title, characters } = data;
      this.setData({
        summary: summary || [],
        album: album || [],
        title,
        characters: characters || []
      });
    });
  }
})