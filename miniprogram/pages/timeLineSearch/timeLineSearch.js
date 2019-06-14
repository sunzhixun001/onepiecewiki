import { getRegexp } from '../../database/events';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    events: [],
    pageIndex: 0,
    pageSize: 20,
    allData: false,
    keyword: '',
    statusBarHeight: 0,
    searchInputHeight: 88,
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
    this.getEventsList({keyword: options.keyword});
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
  bindSearch: function(e) {
    this.getEventsList({keyword: this.data.keyword});
  },
  bindKeyWord: function(e) {
    this.setData({ keyword: e.detail.value});
  },
  getEventsList({ keyword}) {
    getRegexp({
      keyword: keyword,
      limit: 20, 
      skip: 0, 
      success: res => {
        let _data = {
          events: res.data,
          nochara: false
        };
        if (res.data.length === 0){
          _data.nochara = true
        }
        this.setData(_data);
        // if (res.data.length < this.data.pageSize) {
        //   this.setData({ allData: true });
        // }
        // console.log(res);
      }
    });
  }
})